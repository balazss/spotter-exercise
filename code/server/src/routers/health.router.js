import { Router } from "express";

import { get } from "../controllers/health.controller.js";

const healthRouter = new Router();

healthRouter.route("/health").get(get);

export default healthRouter;
