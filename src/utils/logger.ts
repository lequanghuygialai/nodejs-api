import logger from "pino";
import dayjs from "dayjs";

const log = logger({
  prettyPrint: true,
  base: {
    pid: false,
  },
  level: "debug",
  timestamp: () => `,"time":"${dayjs().format()}"`,
});

export default log;
