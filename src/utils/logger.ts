import { createLogger, TransportType } from "devergroup-error";

const getTransports = () => {
  if (process.env.NODE_ENV === "production") {
    return [TransportType.CONSOLE];
  } else {
    return [TransportType.CONSOLE];
  }
};

const logger = createLogger({
  transports: getTransports(),
});
export default logger;