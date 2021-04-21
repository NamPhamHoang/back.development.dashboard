import { createProxyMiddleware } from "http-proxy-middleware";
import log from "~@/utils/logger";
import express from "express";
import request from "request";
import cors from "cors";
import bodyParser from "body-parser";
import { listen } from "~@/boot/services/socket";
import {
  chatThread
} from "~@/routes/api"
import qs from "qs";
import moment from "moment";
import http from "~@/modules/http.module";
import multer from "multer";

import { fetchFullProjectInformation } from "~@/utils/freelancer";
import { sendEmail } from "~@/modules/email.module";

import gqlClient from "~@/modules/hasura.module";
import { getSuggestion } from "~@/utils/functions/fl_bid_job";
import biddingProject from "~@/utils/functions/fl_bid_job";
import { FETCH_PROJECT_BY_ID } from "~@/graphql/query";
import { INSERT_CHAT_GROUP_LOG } from "~@/graphql/mutation";
import {
  fetchProjectById,
  fetchProjectByIdVariables
} from "~@/graphql/generated/fetchProjectById"; 
import {
  insertChatGrLog,
  insertChatGrLogVariables
} from "~@/graphql/generated/insertChatGrLog";
import {
  fetchRequireBidData
} from "~@/utils/functions/index";
import path from "path";
import { Chat_gr_log_constraint } from "~@/graphql/generated/globalTypes";
import { reverse } from "lodash";
const app = express();
const tempUpload = multer({
  storage: multer.memoryStorage()
});

const groupStore = multer.diskStorage({
  destination: "./src/uploads/",
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const spaceUpload = multer({
  storage: groupStore
})

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
app.use("/uploads", express.static('./src/uploads'));

app.use((err, req, res, next) => {
  console.log(err);
  return res.status(err.status || 500).json({
    isError: true,
    payload: err.toString(),
  });
});

app.post(
  "/message-attachment/:thread_id",
  tempUpload.single("file"), async (req, res) => {
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

app.get("/hint/:pid", async (req, res) => {
  const projectID = req.params.pid;
  if (!projectID) {
    return res.status(403).json({
      error: true,
      message: "Please specific project id"
    });
  }

  const {
    data: { projects }
  } = await gqlClient.query<
    fetchProjectById,
    fetchProjectByIdVariables
  >({
    query: FETCH_PROJECT_BY_ID,
    variables: {
      projectId: Number(projectID)
    }
  });

  if (projects.length <= 0) {
    return res.status(404).json({
      error: true,
      message: "Project Not found"
    });
  }
  const project = projects[0];
  
  // @ts-ignore
  const suggestion = await getSuggestion(project);
  return res.json({
    eror: false,
    message: suggestion
  });
});


app.post("/bid/:pid", async (req,res) => {
  const projectID = req.params.pid;
  if (!projectID) {
    return res.status(403).json({
      error: true,
      message: "Please specific project id"
    });
  }
  const {
    our_cost,
    our_cover_letter
  } = req.body
  const {
    data: { projects }
  } = await gqlClient.query<
    fetchProjectById,
    fetchProjectByIdVariables
  >({
    query: FETCH_PROJECT_BY_ID,
    variables: {
      projectId: Number(projectID)
    }
  });

  if (projects.length <= 0) {
    return res.status(404).json({
      error: true,
      message: "Project Not found"
    });
  }
  const serializeProjects = await fetchRequireBidData(projects);
  const project = serializeProjects.projects[0]
  // @ts-ignore
  biddingProject(project, our_cover_letter, our_cost)
  .then(data => {
    return res.status(200).json({
      error: false,
      message: data
    })
  })
  .catch(err => {
    return res.status(500).json({
      error: true,
      message: err
    })
  })
  ;
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

//group message
app.post("/space-message/:thread_id", async (req, res) => {
  const threadID = req.params.thread_id;
  const userID = req.body.userID;
  const _data = req.body.message;
  try {
    const {
      data
    } = await gqlClient.mutate<
      insertChatGrLog,
      insertChatGrLogVariables
    >({
      mutation: INSERT_CHAT_GROUP_LOG,
      variables: {
        data: {
          _data,
          thread_id: threadID,
          user_id: userID,
        },
        on_conflict: {
          constraint: Chat_gr_log_constraint.Chat_gr_log_pkey,
          update_columns: []
        }
      }
    });
    if(data) {
      return res.json({
        isError: false,
        message: "Success",
        client_message_id: moment.utc().format("X")
      });
    }
  } catch (err) {
    res.status(500).send({
      isError: true,
      message: err.toString()
    });
  }
});

app.post("/space-attachment/:thread_id/:user_id", spaceUpload.single("file"), async (req, res) => {
  const threadID = req.params.thread_id;
  const userID = req.params.user_id;
 
  const message = (req as any).file.filename;
  try {
    // insert into database
    const {
      data
    } = await gqlClient.mutate<
      insertChatGrLog,
      insertChatGrLogVariables
    >({
      mutation: INSERT_CHAT_GROUP_LOG,
      variables: {
        data: {
          _data: message,
          thread_id: threadID,
          user_id: Number(userID),
          isAttachment: true
        },
        on_conflict: {
          constraint: Chat_gr_log_constraint.Chat_gr_log_pkey,
          update_columns: []
        }
      }
    });
    if(data) {
      return res.status(200).json({
        isError: false,
        message: "Success upload",
        client_message_id: moment.utc().format("X")
      });
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
