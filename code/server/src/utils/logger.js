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
        winston.format.splat(),

        // Colorize if the env is not production
        process.env.NODE_ENV !== "development"
          ? winston.format.colorize()
          : winston.format.printf(
              (info) =>
                `${
                  info.timestamp
                } - ${info.level.toUpperCase()}: ${JSON.stringify(
                  info.message
                )}`
            )
      ),
    }),
  ],
};

const logger = winston.createLogger(options);

export default logger;
