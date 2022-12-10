import server from "./src/server.js";
import logger from "./src/utils/logger.js";

const main = async () => {
  logger.info("Starting server...");
  server();
};

main();
