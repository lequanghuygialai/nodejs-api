import { DocumentDefinition } from "mongoose";
import UserModel, { UserDocument } from "../models/user.model";
import { log } from "../utils/logger";
import { omit } from "lodash";

export async function createUser(
  input: DocumentDefinition<
    Omit<UserDocument, "createdAt" | "updatedAt" | "comparePassword">
  >
) {
  try {
    const user = await UserModel.create(input);
    return omit(user.toJSON(), "password");
  } catch (error) {
    log.error(error);
    throw error;
  }
}

export async function validatePassword({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const user = await UserModel.findOne({ email });

  if (!user) {
    log.debug(`User ${email} not found`);
    return false;
  }

  const isValid = await user.comparePassword(password);
  if (!isValid) {
    log.debug(`Invalid password`);
    return false;
  }

  return omit(user.toJSON(), "password");
}
