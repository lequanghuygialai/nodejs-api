import ProductModel, { ProductDocument } from "../models/product.model";
import {
  DocumentDefinition,
  FilterQuery,
  UpdateQuery,
  QueryOptions,
} from "mongoose";

export async function createProduct(
  input: DocumentDefinition<Omit<ProductDocument, "createdAt" | "updatedAt">>
) {
  return ProductModel.create(input);
}

export async function findProduct(
  filterQuery: FilterQuery<ProductDocument>,
  options: QueryOptions = { lean: true }
) {
  return ProductModel.findOne(filterQuery, {}, options).lean();
}

export async function findProducts(
  filterQuery: FilterQuery<ProductDocument>,
  options: QueryOptions = { lean: true }
) {
  return await ProductModel.find(filterQuery, {}, options).lean();
}

export async function updateProduct(
  filterQuery: FilterQuery<ProductDocument>,
  updateQuery: UpdateQuery<ProductDocument>,
  options: QueryOptions
) {
  return ProductModel.findOneAndUpdate(filterQuery, updateQuery, options);
}

export async function deleteProduct(filterQuery: FilterQuery<ProductDocument>) {
  return ProductModel.deleteOne(filterQuery);
}
