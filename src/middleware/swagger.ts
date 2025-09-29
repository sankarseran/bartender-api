import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import type { Express } from "express";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Bartender API",
      version: "1.0.0",
      description: "Bartender API",
    },
    components: {
      securitySchemes: {
        basicAuth: {
          type: "http",
          scheme: "basic"
        }
      }
    },
    security: [{ basicAuth: [] }]
  },
  apis: ["./src/routes.ts"],
};

const swaggerSpec = swaggerJsdoc(options);

export function setupSwagger(app: Express): void {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
