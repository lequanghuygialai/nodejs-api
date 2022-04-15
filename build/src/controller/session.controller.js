"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSessionHandler = exports.getUserSessionsHandler = exports.createUserSessionHandler = void 0;
const config_1 = __importDefault(require("config"));
const session_service_1 = require("../service/session.service");
const user_service_1 = require("../service/user.service");
const jwt_utils_1 = require("../utils/jwt.utils");
function createUserSessionHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        //Validate user
        const user = yield (0, user_service_1.validatePassword)(req.body);
        if (!user) {
            return res.status(401).send("Invalid email or password");
        }
        //Create session
        const session = yield (0, session_service_1.createSession)(user._id, req.get("user-agent") || "");
        //Create access token + refresh token
        const accessToken = (0, jwt_utils_1.signJwt)(Object.assign(Object.assign({}, user), { session: session._id }), {
            expiresIn: config_1.default.get("accessTokenTtl"),
        });
        const refeshToken = (0, jwt_utils_1.signJwt)({ _id: user._id, session: session._id }, {
            expiresIn: config_1.default.get("accessTokenTtl"),
        });
        return res.send({ accessToken, refeshToken });
    });
}
exports.createUserSessionHandler = createUserSessionHandler;
function getUserSessionsHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = res.locals.user._id;
        const sessions = yield (0, session_service_1.findSessions)({ user: userId, valid: true });
        return res.send(sessions);
    });
}
exports.getUserSessionsHandler = getUserSessionsHandler;
function deleteSessionHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const sessionId = res.locals.user.session;
        if (!sessionId) {
            yield (0, session_service_1.deleteSession)(sessionId);
        }
        return res.sendStatus(200);
    });
}
exports.deleteSessionHandler = deleteSessionHandler;
