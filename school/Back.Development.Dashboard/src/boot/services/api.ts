import { createProxyMiddleware } from "http-proxy-middleware";
import log from "~@/utils/logger";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { listen } from "~@/boot/services/socket";
import {
    TakeProject,
    chatThread
} from "~@/routes/api"
import takeProjects from "~@/routes/api/takeProjects";
import qs from "qs";
import moment from "moment";
import http from "~@/modules/http.module";
const app = express();

if(process.env.IS_LISTEN_WS === "1") {
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

app.get("/chat_thread/:id",chatThread);
app.get("/projects", takeProjects);
app.post("/message/:thread_id", async (req,res) => {
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

(async () => {
    app.listen(process.env.PORT, () => {
        log.info(`> web application is runnning on PORT: ${process.env.PORT}`, {
            port: process.env.PORT,
        });
    });
})();
