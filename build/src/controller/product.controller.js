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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProductHandler = exports.findProductsHandler = exports.findProductByIdHandler = exports.updateProductHandler = exports.createProductHandler = void 0;
const lodash_1 = require("lodash");
const product_service_1 = require("../service/product.service");
const logger_1 = require("../utils/logger");
function createProductHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = res.locals.user;
            const product = yield (0, product_service_1.createProduct)(Object.assign(Object.assign({}, req.body), { user: user._id }));
            return res.send(product);
        }
        catch (e) {
            logger_1.log.error(e);
            return res.status(409).send(e.message);
        }
    });
}
exports.createProductHandler = createProductHandler;
function updateProductHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const productId = (0, lodash_1.get)(req, "params.productId");
            const product = yield (0, product_service_1.findProduct)({ productId });
            if (!product) {
                return res.sendStatus(404);
            }
            const productAfterUpdate = yield (0, product_service_1.updateProduct)({ productId: productId }, req.body, {
                new: true,
            });
            return res.send(productAfterUpdate);
        }
        catch (e) {
            logger_1.log.error(e);
            return res.status(409).send(e.message);
        }
    });
}
exports.updateProductHandler = updateProductHandler;
function findProductByIdHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const productId = (0, lodash_1.get)(req, "params.productId");
            const product = yield (0, product_service_1.findProduct)({ productId });
            if (!product) {
                return res.sendStatus(404);
            }
            return res.send(product);
        }
        catch (e) {
            logger_1.log.error(e);
            return res.status(409).send(e.message);
        }
    });
}
exports.findProductByIdHandler = findProductByIdHandler;
function findProductsHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = res.locals.user;
            const products = yield (0, product_service_1.findProducts)({ user: { $eq: user._id } });
            if (!products) {
                return res.sendStatus(404);
            }
            return res.send(products);
        }
        catch (e) {
            logger_1.log.error(e);
            return res.status(409).send(e.message);
        }
    });
}
exports.findProductsHandler = findProductsHandler;
function deleteProductHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const productId = (0, lodash_1.get)(req, "params.productId");
            const product = yield (0, product_service_1.findProduct)({ productId: productId });
            if (!product) {
                return res.sendStatus(404);
            }
            yield (0, product_service_1.deleteProduct)({ productId: productId });
            return res.sendStatus(200);
        }
        catch (e) {
            logger_1.log.error(e);
            return res.status(409).send(e.message);
        }
    });
}
exports.deleteProductHandler = deleteProductHandler;
