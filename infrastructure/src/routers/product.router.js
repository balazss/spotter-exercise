import { Router } from "express";

import { get } from "../controllers/product.controller.js";

const productRouter = new Router();

/* GET products listing. */
productRouter.route("/products").get(get);

export default productRouter;
