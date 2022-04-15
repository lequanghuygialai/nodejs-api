"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProductSchema = exports.findProductSchema = exports.updateProductSchema = exports.createProductSchema = void 0;
const zod_1 = require("zod");
const payload = {
    body: (0, zod_1.object)({
        title: (0, zod_1.string)({
            required_error: "title is required",
        }),
        description: (0, zod_1.string)(),
        price: (0, zod_1.number)({
            required_error: "price is required",
        }),
        image: (0, zod_1.string)(),
    }),
};
const params = {
    params: (0, zod_1.object)({
        productId: (0, zod_1.string)({
            required_error: "productId is required",
        }),
    }),
};
exports.createProductSchema = (0, zod_1.object)(Object.assign({}, payload));
exports.updateProductSchema = (0, zod_1.object)(Object.assign(Object.assign({}, params), payload));
exports.findProductSchema = (0, zod_1.object)(Object.assign({}, params));
exports.deleteProductSchema = (0, zod_1.object)(Object.assign({}, params));
