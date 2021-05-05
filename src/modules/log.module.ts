import { createLogger } from "devergroup-error";
const transports = [];

if (process.env.MODE === "production") {
  transports.push("SENTRY");
} else {
  transports.push("CONSOLE");
}

const logger = createLogger({
  transports,
  context: {
    sentryOpts: {
      sentry: {
        dsn:
          "https://6f90674b239842bea1b4d9d5d78985bc@o394239.ingest.sentry.io/5245806"
      },
      level: "error"
    }
  }
});

export default logger;
