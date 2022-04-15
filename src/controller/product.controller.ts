import { Request, Response } from "express";
import { get } from "lodash";
import {
  CreateProductInput,
  DeleteProductInput,
  FindProductInput,
  UpdateProductInput
} from "../schema/product.schema";
import {
  createProduct,
  deleteProduct,
  findProduct,
  findProducts,
  updateProduct
} from "../service/product.service";
import { log } from "../utils/logger";

export async function createProductHandler(
  req: Request<{}, {}, CreateProductInput["body"]>,
  res: Response
) {
  try {
    const user = res.locals.user;
    const product = await createProduct({
      ...req.body,
      user: user._id,
    });
    return res.send(product);
  } catch (e: any) {
    log.error(e);
    return res.status(409).send(e.message);
  }
}

export async function updateProductHandler(
  req: Request<UpdateProductInput["params"], {}, CreateProductInput["body"]>,
  res: Response
) {
  try {
    const productId = get(req, "params.productId");
    const product = await findProduct({ productId });
    if (!product) {
      return res.sendStatus(404);
    }

    const productAfterUpdate = await updateProduct(
      { productId: productId },
      req.body,
      {
        new: true,
      }
    );
    return res.send(productAfterUpdate);
  } catch (e: any) {
    log.error(e);
    return res.status(409).send(e.message);
  }
}

export async function findProductByIdHandler(
  req: Request<FindProductInput["params"], {}, {}>,
  res: Response
) {
  try {
    const productId = get(req, "params.productId");

    const product = await findProduct({ productId });
    if (!product) {
      return res.sendStatus(404);
    }

    return res.send(product);
  } catch (e: any) {
    log.error(e);
    return res.status(409).send(e.message);
  }
}

export async function findProductsHandler(req: Request, res: Response) {
  try {
    const user = res.locals.user;
    const products = await findProducts({ user: { $eq: user._id } });
    if (!products) {
      return res.sendStatus(404);
    }

    return res.send(products);
  } catch (e: any) {
    log.error(e);
    return res.status(409).send(e.message);
  }
}

export async function deleteProductHandler(
  req: Request<DeleteProductInput["params"], {}, {}>,
  res: Response
) {
  try {
    const productId = get(req, "params.productId");
    const product = await findProduct({ productId: productId });
    if (!product) {
      return res.sendStatus(404);
    }

    await deleteProduct({ productId: productId });
    return res.sendStatus(200);
  } catch (e: any) {
    log.error(e);
    return res.status(409).send(e.message);
  }
}
