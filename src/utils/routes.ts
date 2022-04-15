import { Express } from "express";
import {
  createProductHandler,
  deleteProductHandler,
  findProductByIdHandler,
  findProductsHandler,
  updateProductHandler,
} from "../controller/product.controller";
import {
  createUserSessionHandler,
  deleteSessionHandler,
  getUserSessionsHandler,
} from "../controller/session.controller";
import { createUserHandler } from "../controller/user.controller";
import requireUser from "../middleware/requireUser";
import validateResource from "../middleware/validateResource";
import { createSessionSchema } from "../schema/session.schema";
import {
  createProductSchema,
  deleteProductSchema,
  findProductSchema,
  updateProductSchema,
} from "../schema/product.schema";
import { createUserSchema } from "../schema/user.schema";

export function routes(app: Express) {
  app.get("/heathcheck", (req, res) => {
    res.sendStatus(200);
    return res;
  });

  app.post("/api/user", validateResource(createUserSchema), createUserHandler);
  app.post(
    "/api/session",
    validateResource(createSessionSchema),
    createUserSessionHandler
  );
  app.get("/api/session", requireUser, getUserSessionsHandler);
  app.delete("/api/session", requireUser, deleteSessionHandler);

  app.get("/api/products", [requireUser], findProductsHandler);
  app.post(
    "/api/product",
    [requireUser, validateResource(createProductSchema)],
    createProductHandler
  );
  app.put(
    "/api/product/:productId",
    [requireUser, validateResource(updateProductSchema)],
    updateProductHandler
  );
  app.get(
    "/api/product/:productId",
    [requireUser, validateResource(findProductSchema)],
    findProductByIdHandler
  );
  app.delete(
    "/api/product/:productId",
    [requireUser, validateResource(deleteProductSchema)],
    deleteProductHandler
  );
}
