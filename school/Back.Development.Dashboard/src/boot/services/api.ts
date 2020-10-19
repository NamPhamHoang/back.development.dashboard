import { createProxyMiddleware } from "http-proxy-middleware";
import log from "~@/utils/logger";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
app.use(
    //@TODO: add to env
    cors({
        origin: "*",
    })
);

// app.use(
//     "/hasura",
//     createProxyMiddleware({
//         target: `${process.env.HASURA_ENDPOINT}`,
//         logLevel: "error",
//         pathRewrite: (path) => {
//             const pathSlashArr = path.split("/").filter((str) => str.length > 0);
//             if (pathSlashArr.length <= 1) return "/";
//             pathSlashArr.shift();
//             return "/" + pathSlashArr.join("/");
//         },

//         ws: true,
//         followRedirects: true,
//     })
// );


// app.use(
//     "/_next",
//     createProxyMiddleware({
//         target: `${process.env.WEB_ADMIN_ENDPOINT}/_next`,
//         logLevel: "error",
//         pathRewrite: (path) => {
//             const pathSlashArr = path.split("/").filter((str) => str.length > 0);
//             if (pathSlashArr.length <= 1) return "/";
//             pathSlashArr.shift();
//             return "/" + pathSlashArr.join("/");
//         },

//         ws: true,
//         followRedirects: true,
//     })
// );

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

app.get("/api/me", (req,res) => {
    return res.json("abc")
});

(async () => {
    app.listen(process.env.PORT, () => {
        log.info(`> web application is runnning on PORT: ${process.env.PORT}`, {
            port: process.env.PORT,
        });
    });
})();
