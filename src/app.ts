import bodyParser from "body-parser";
import config from "config";
import express from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger.json";
import desializeUser from "./middleware/deserializeUser";
import { connect } from "./utils/connect";
import { log } from "./utils/logger";
import { routes } from "./utils/routes";

const port = process.env.PORT || config.get<number>("port");
const app = express();
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
const swaggerDocs = swaggerJSDoc(swaggerOptions);

app.use(express.json());
app.use(desializeUser);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(
  "/swagger",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, {
    explorer: true,
  })
);

app.listen(port, () => {
  log.info(`app running in http://localhost:${port}`);
  connect();
  routes(app);
});
