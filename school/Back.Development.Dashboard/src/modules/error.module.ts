import errorParser from "error-stack-parser";
import logger from "./log.module";

const parserError = (err: Error) => {
    const errors = errorParser.parse(err);
    const firstStack = errors[0];
    return {
        message: err.message,
        errorAt: `${firstStack.fileName}:${firstStack.lineNumber}:${firstStack.columnNumber}`
    };
}
const listen = () => {
    process.on("unhandledRejection", async (err:Error) => {
        const error = parserError(err);
        logger.error(
            "UN_HANDLE_ERROR: message: %s, Error At %s \n",
            error.message,
            error.errorAt
        )
        if(process.env.mode === "production") {
            process.exit(1);
        } else {
            return;
        }
    });
    process.on("uncaughtException", async err => {
        const error = parserError(err);
        logger.error(
            "UN_CAUGHT_ERROR: message: %s, Error At: %s",
            error.message,
            error.errorAt
        )
        if(process.env.mode === "production") {
            process.exit(1);
        } else {
            return;
        }
    });
};

export default {
    listen
}

