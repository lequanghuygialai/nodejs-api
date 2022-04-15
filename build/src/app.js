"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const config_1 = __importDefault(require("config"));
const express_1 = __importDefault(require("express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_json_1 = __importDefault(require("../swagger.json"));
const deserializeUser_1 = __importDefault(require("./middleware/deserializeUser"));
const connect_1 = require("./utils/connect");
const logger_1 = require("./utils/logger");
const routes_1 = require("./utils/routes");
const port = config_1.default.get("port");
const app = (0, express_1.default)();
// const swaggerAutogen = require("swagger-autogen")();
// const doc = {
//   info: {
//     title: "My API",
//     description: "Description",
//   },
//   host: "localhost:1337",
//   basePath: "/",
//   schemes: ["http"],
//   consumes: ["application/json"],
//   produces: ["application/json"],
// };
// const swaggerDocument = "./swagger.json";
// const endpointsFiles = ["./src/utils/routes.ts"];
// swaggerAutogen(swaggerDocument, endpointsFiles, doc);
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: "Test API",
            version: "1.0.0",
        },
    },
    apis: ["app.ts"],
};
const swaggerDocs = (0, swagger_jsdoc_1.default)(swaggerOptions);
app.use(express_1.default.json());
app.use(deserializeUser_1.default);
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.use("/swagger", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_json_1.default, {
    explorer: true,
}));
app.listen(port, () => {
    logger_1.log.info(`app running in http://localhost:${port}`);
    (0, connect_1.connect)();
    (0, routes_1.routes)(app);
});
