import cors from "cors";
import express from "express";
import winstonMiddleware from "express-winston";
import helmet from "helmet";

import {
  allowedContentType,
  allowedHttpMethods,
} from "./middlewares/app.middlewares.js";
import healthRouter from "./routers/health.router.js";
import productRouter from "./routers/product.router.js";
import { swaggerRouter } from "./swagger/swagger.js";
import logger from "./utils/logger.js";

const app = express();

app.use("/api", swaggerRouter);

app.use(cors());
app.use(allowedHttpMethods);
app.use(allowedContentType);

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        "frame-ancestors": "none",
      },
    },
    hsts: {
      maxAge: 31536000,
      includeSubDomains: true,
      preload: true,
    },
    noSniff: true,
    frameguard: {
      action: "deny",
    },
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  winstonMiddleware.logger({
    winstonInstance: logger,
    level: (req, res) => {
      let level = "info";
      if (res.statusCode >= 500) {
        level = "error";
      } else if (res.statusCode >= 300) {
        level = "warn";
      }
      return level;
    },
  })
);

app.use("/api", productRouter);
app.use("/api", healthRouter);

export default app;
