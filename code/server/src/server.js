import app from "./app.js";
import logger from "./utils/logger.js";
import prisma from "./utils/prisma.js";

const port = process.env.PORT || 4000;
const signals = ["SIGINT", "SIGTERM"];

const server = () =>
  app.listen(port, () => {
    logger.info(`App listening on port ${port}`);
  });

const shutdown = (signal) => {
  server.close(async () => {
    await prisma.$disconnect();
    logger.info(`App terminated by ${signal}`);
    process.exit(0);
  });
};

signals.forEach((signal) => {
  process.on(signal, () => shutdown(signal));
});

export default server;
