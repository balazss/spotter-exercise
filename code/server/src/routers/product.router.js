import { Router } from "express";

import { get } from "../controllers/product.controller.js";

const productRouter = new Router();

/**
 * @swagger
 *  /products?{limit}&{offset}&{query}:
 *   get:
 *     description: Retrieves all products available in the database
 *     parameters:
 *     - in: query
 *       name: limit
 *       schema:
 *         type: integer
 *         minimum: 1
 *       required: true
 *       description: The number of products to return
 *     - in: query
 *       name: offset
 *       schema:
 *         type: integer
 *         minimum: 1
 *       required: true
 *       description: The number of products to skip
 *     - in: query
 *       name: query
 *       schema:
 *         type: string
 *       required: false
 *       description: The search query
 *     tags:
 *       - Products
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Retrieves a list of products
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "SUCCESS"
 *                 data:
 *                   type: object
 *                   properties:
 *                     products:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             format: uuid
 *                             example: "d290f1ee-6c54-4b01-90e6-d701748f0851"
 *                           createdAt:
 *                             type: string
 *                             format: date-time
 *                             example: "2021-03-01T00:00:00.000Z"
 *                           updatedAt:
 *                             type: datetime
 *                             example: "2021-03-01T00:00:00.000Z"
 *                           vendor:
 *                             type: string
 *                             example: "Apple"
 *                           title:
 *                             type: string
 *                             example: "Apple iMac MF883LL/A 21.5-Inch 500GB Desktop (Renewed)"
 *                           price:
 *                             type: number
 *                             example: 499.99
 *                           strikedPrice:
 *                             type: number
 *                             example: 599.99
 *                           image:
 *                             type: string
 *                             example: "https://m.media-amazon.com/images/I/71mwhddX4mS._AC_UY218_.jpg"
 */

productRouter.route("/products").get(get);

export default productRouter;
