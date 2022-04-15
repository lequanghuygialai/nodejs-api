"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const jwt_utils_1 = require("../utils/jwt.utils");
function desializeUser(req, res, next) {
    const accessToken = (0, lodash_1.get)(req, "headers.authorization", "").replace(/^Bearer\s/, "");
    if (!accessToken) {
        return next();
    }
    const { decoded, expired } = (0, jwt_utils_1.verifyToken)(accessToken);
    if (decoded) {
        res.locals.user = decoded;
        return next();
    }
    return next();
}
exports.default = desializeUser;
