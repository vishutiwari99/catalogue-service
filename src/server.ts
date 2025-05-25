import app from "./app";
import config from "config";
import logger from "./config/logger";
import { initDb } from "./config/db";
const startServer = async () => {
  const PORT: number = config.get("server.port") || 5502;
  try {
    logger.info("Starting server...");
    await initDb();
    logger.info("Database connected successfully");

    // eslint-disable-next-line no-console
    app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));
  } catch (error) {
    // eslint-disable-next-line no-console
    logger.error(error);
  }
};
void startServer();
