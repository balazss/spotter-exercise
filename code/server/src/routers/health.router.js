import { Router } from "express";

import { get } from "../controllers/health.controller.js";

const healthRouter = new Router();

/**
 * @swagger
 *  /health:
 *   get:
 *     description: Dummy endpoint used as an API health check
 *     tags:
 *       - Health
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Retrieves a string with a health status
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                  type: string
 *                  example: "OK"
 */

healthRouter.route("/health").get(get);

export default healthRouter;
