"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connect = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("config"));
const logger_1 = require("./logger");
function connect() {
    const dbUrl = config_1.default.get("dbUri");
    return mongoose_1.default
        .connect(dbUrl)
        .then(() => {
        logger_1.log.info("Connected to db at " + dbUrl);
    })
        .catch((e) => {
        logger_1.log.error("Error connect to db  " + e.message);
        process.exit(1);
    });
}
exports.connect = connect;
