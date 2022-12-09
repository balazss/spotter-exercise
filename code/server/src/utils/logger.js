import winston from "winston";

let level = "info";
if (process.env.NODE_ENV === "production") {
  level = "debug";
}

const options = {
  silent: false,
  level: level,
  exitOnError: false,
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.prettyPrint(),
        // Colorize if the env is not production
        process.env.NODE_ENV !== "production"
          ? winston.format.colorize()
          : winston.format.uncolorize(),
        winston.format.printf(
          (info) =>
            `${info.timestamp} ${info.level}: ${JSON.stringify(info.message)}`
        )
      ),
    }),
  ],
};

const logger = winston.createLogger(options);

export default logger;
