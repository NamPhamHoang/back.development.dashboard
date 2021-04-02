import { createProxyMiddleware } from "http-proxy-middleware";
import log from "~@/utils/logger";
import express from "express";
import request from "request";
import cors from "cors";
import bodyParser, { raw } from "body-parser";
import { listen } from "~@/boot/services/socket";
import {
  chatThread
} from "~@/routes/api"
import qs from "qs";
import moment from "moment";
import http from "~@/modules/http.module";
import multer from "multer";
import fs from "fs";
import { fetchFullProjectInformation } from "~@/utils/freelancer";
import { sendEmail } from "~@/modules/email.module";
import axios from "axios";
const app = express();
const tempUpload = multer({
  storage: multer.memoryStorage()
});
if (process.env.IS_LISTEN_WS === "1") {
  listen()
}
app.use(
  //@TODO: add to env
  cors({
    origin: "*",
  })
);

app.use(
  "/hasura",
  createProxyMiddleware({
    target: `${process.env.HASURA_ENDPOINT}`,
    logLevel: "error",
    pathRewrite: (path) => {
      const pathSlashArr = path.split("/").filter((str) => str.length > 0);
      if (pathSlashArr.length <= 1) return "/";
      pathSlashArr.shift();
      return "/" + pathSlashArr.join("/");
    },

    ws: true,
    followRedirects: true,
  })
);

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);


app.use((err, req, res, next) => {
  console.log(err);
  return res.status(err.status || 500).json({
    isError: true,
    payload: err.toString(),
  });
});

app.post(
  "/message-attachment/:thread_id",
  tempUpload.single("file"),

  async (req, res) => {
    const threadID = req.params.thread_id;
    try {
      request.post(
        `https://www.freelancer.com/api/messages/0.1/threads/${threadID}/messages/?compact=true&new_errors=true`,
        {
          formData: {
            "files[]": {
              value: (req as any).file.buffer,
              options: {
                filename: (req as any).file.originalname,
                contentType: (req as any).file.mimetype
              }
            }
          },
          headers: http.getHeaders()
        },
        (err, response) => {
          if (err) {
            return res.status(500).json({
              isError: true,
              message: err.toString()
            });
          } else {
            return res.json({
              isError: false,
              message: response.body,
              client_message_id: moment.utc().format("X")
            });
          }
        }
      );
    } catch (err) {
      console.log(err);
      res.status(500).send({
        isError: true,
        message: err.toString()
      });
    }
  }
);
app.get("/chat_thread/:id", chatThread);
app.post("/message/:thread_id", async (req, res) => {
  const threadID = req.params.thread_id;
  const message = req.body.message;
  console.log(message, threadID);
  try {
    const { data } = await http.axios.post(
      `https://www.freelancer.com/api/messages/0.1/threads/${threadID}/messages/?compact=true&new_errors=true`,
      qs.stringify({
        message,
        source: "chat_box"
      }),
      {
        headers: {
          "content-type": "application/x-www-form-urlencoded;charset=UTF-8"
        }
      }
    );
    return res.json({
      isError: false,
      message: data,
      client_message_id: moment.utc().format("X")
    });
  } catch (err) {
    res.status(500).send({
      isError: true,
      message: err.toString()
    });
  }
});

app.get("/full_project/:project_id", async (req, res) => {
  try {
    const data = await fetchFullProjectInformation(req.params.project_id);
    const parseData = {
      id: data.id,
      title: data.title,
      text: data.description,
      minbudget: data.budget.minimum,
      maxbudget: data.budget.maximum,
      linkUrl: data.seo_url,
      appended_descr: data.preview_description,
      status: data.status,
      created_at: data.submitdate,
      currency: data.currency.code,
      jobs: data.jobs
    };
    return res.json({
      isError: false,
      message: parseData
    })
  } catch (err) {
    res.status(500).json({
      isError: false,
      message: err.toString()
    })
  };
});

app.get("/attachment/:message_id/:file", async (req, res) => {
  const messageId = req.params.message_id;
  const file = req.params.file;
  try {
    const { data } = await http.axios.get(
      `https://www.freelancer.com/api/messages/0.1/messages/${messageId}/${file}`,
      {
        responseType: "arraybuffer"
      }
    );
    return res.end(data);
  } catch (err) {
    res.status(500).send({
      isError: true,
      message: err.toString()
    });
  }
});

app.get("/attachment/", async (req, res) => {
  const { url } = req.query;
  try {
    const { data } = await http.axios.get(("http://" + url) as string, {
      responseType: "arraybuffer"
    });
    return res.end(data);
  } catch (err) {
    res.status(500).send({
      isError: false,
      message: err.toString()
    })
  }
});

app.post("/create-thread", async (req, res) => {
  const {
    userId,
    projectId,
    ownerId,
  } = req.body
  try {
    const {
      // @ts-ignore
      thread: { context: {id} }
    } = await http.axios.post(`https://www.freelancer.com/api/messages/0.1/threads/?members[]=${ownerId}&members[]=${userId}&context_type=project&context=${projectId}`)
    console.log(id)
    // http.axios.post(`/message/${id}`, qs.stringify({
    //   message: "Hey, I'm interested in your project. Please send me a message so that we can discuss more."
    // }))
  }
  catch (err) {
    res.status(500).send({
      isError: false,
      message: err.toString()
    })
  }
});

app.post("/send-email" , async (req, res) => {
  try {
    const {
      email, title, project_name, task_id, task_name, member_name, finish_time, deadline
    } = req.body
    console.log(req.body)
      sendEmail(email,title,project_name, task_id, task_name, member_name, finish_time, deadline);
      return res.json({
        isError: false,
        payload: "SendEmail Successful"
      });
    
  } catch (err) {
    return res.status(400).json({
      isError: true,
      payload: "Cannot send email"
    })
  }
  
});

//bidding project
app.post("/bidding-project", async (req, res) => {
  const {
    project_id,
    bidder_id,
    amount,
    period,
    milestone_percentage
  } = req.body
  try {
    const {
      status,
      data
    } = await http.axios.post(
      `https://www.freelancer.com/api/projects/0.1/bids/`,
      {
        project_id,
        bidder_id,
        amount,
        period,
        milestone_percentage
      })
  } catch (err) {
    res.status(500).send({
      isError: true,
      message: err.toString()
    });
  }
 
})

app.post("/message-attachment/:thread_id", tempUpload.single("file"), async (req, res) => {
  const threadID = req.params.thread_id;
  try {
    request.post(`https://www.freelancer.com/api/messages/0.1/threads/${threadID}/messages/?compact=true&new_errors=true`, {
      formData: {
        "files[]": {
          value: (req as any).file.buffer,
          options: {
            filename: (req as any).file.originalname,
            contentType: (req as any).file.mimetype
          }
        }
      },
      headers: http.getHeaders()
    });
    (err, response) => {
      if (err) {
        return res.status(500).json({
          isError: true,
          message: err.toString()
        });
      } else {
        return res.json({
          isError: false,
          message: response.body,
          client_message_id: moment.utc().format("X")
        });
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({
      isError: true,
      message: err.toString()
    });
  }
});
(async () => {
  app.listen(process.env.PORT, () => {
    log.info(`> web application is runnning on PORT: ${process.env.PORT}`, {
      port: process.env.PORT,
    });
  });
})();
