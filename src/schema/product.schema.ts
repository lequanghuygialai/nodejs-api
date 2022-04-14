import { number, object, string, TypeOf } from "zod";

const payload = {
  body: object({
    title: string({
      required_error: "title is required",
    }),
    description: string(),
    price: number({
      required_error: "price is required",
    }),
    image: string(),
  }),
};

const params = {
  params: object({
    productId: string({
      required_error: "productId is required",
    }),
  }),
};

export const createProductSchema = object({
  ...payload,
});

export const updateProductSchema = object({
  ...params,
  ...payload,
});

export const findProductSchema = object({
  ...params,
});

export const deleteProductSchema = object({
  ...params,
});

export type CreateProductInput = TypeOf<typeof createProductSchema>;
export type UpdateProductInput = TypeOf<typeof updateProductSchema>;
export type FindProductInput = TypeOf<typeof findProductSchema>;
export type DeleteProductInput = TypeOf<typeof deleteProductSchema>;
