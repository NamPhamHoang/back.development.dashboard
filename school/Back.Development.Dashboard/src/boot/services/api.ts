import { createProxyMiddleware } from "http-proxy-middleware";
import log from "~@/utils/logger";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import {
    TakeProject,
    chatThread
} from "~@/routes/api"

const app = express();
app.use(
    //@TODO: add to env
    cors({
        origin: "*",
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

(async () => {
    app.listen(process.env.PORT, () => {
        log.info(`> web application is runnning on PORT: ${process.env.PORT}`, {
            port: process.env.PORT,
        });
    });
})();
