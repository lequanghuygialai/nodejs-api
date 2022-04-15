"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const product_controller_1 = require("../controller/product.controller");
const session_controller_1 = require("../controller/session.controller");
const user_controller_1 = require("../controller/user.controller");
const requireUser_1 = __importDefault(require("../middleware/requireUser"));
const validateResource_1 = __importDefault(require("../middleware/validateResource"));
const session_schema_1 = require("../schema/session.schema");
const product_schema_1 = require("../schema/product.schema");
const user_schema_1 = require("../schema/user.schema");
function routes(app) {
    app.get("/heathcheck", (req, res) => {
        res.sendStatus(200);
        return res;
    });
    app.post("/api/user", (0, validateResource_1.default)(user_schema_1.createUserSchema), user_controller_1.createUserHandler);
    app.post("/api/session", (0, validateResource_1.default)(session_schema_1.createSessionSchema), session_controller_1.createUserSessionHandler);
    app.get("/api/session", requireUser_1.default, session_controller_1.getUserSessionsHandler);
    app.delete("/api/session", requireUser_1.default, session_controller_1.deleteSessionHandler);
    app.get("/api/products", [requireUser_1.default], product_controller_1.findProductsHandler);
    app.post("/api/product", [requireUser_1.default, (0, validateResource_1.default)(product_schema_1.createProductSchema)], product_controller_1.createProductHandler);
    app.put("/api/product/:productId", [requireUser_1.default, (0, validateResource_1.default)(product_schema_1.updateProductSchema)], product_controller_1.updateProductHandler);
    app.get("/api/product/:productId", [requireUser_1.default, (0, validateResource_1.default)(product_schema_1.findProductSchema)], product_controller_1.findProductByIdHandler);
    app.delete("/api/product/:productId", [requireUser_1.default, (0, validateResource_1.default)(product_schema_1.deleteProductSchema)], product_controller_1.deleteProductHandler);
}
exports.routes = routes;
