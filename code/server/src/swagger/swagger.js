import { Router } from "express";
import swaggerJSDoc from "swagger-jsdoc";
import Validator from "swagger-model-validator";
import swaggerUI from "swagger-ui-express";

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Spotter Exercise",
      version: "1.0.0",
      description:
        "Spotter Exercise API for a full stack application with Amazon ECS, AWS Fargate, and AWS CodePipeline",
    },
    tags: [
      {
        name: "Endpoints",
        description: "Endpoints for the Spotter Exercise API",
      },
    ],
    schemes: ["http"],
    host: "localhost:4000",
    basePath: "/api",
  },
  apis: ["./src/routers/*.router.js"],
};

const swaggerRouter = new Router();

const swaggerSpec = swaggerJSDoc(options);

Validator(swaggerSpec);

swaggerRouter.get("/json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});

swaggerRouter.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

function validaModel(name, model) {
  const responseValidation = swaggerSpec.validateModel(
    name,
    model,
    false,
    true
  );
  if (!responseValidation.valid) {
    console.error(responseValidation.errors);
    throw new Error("Model does not match Swagger contract");
  }
}

export { swaggerRouter, validaModel };
