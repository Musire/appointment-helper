import { SecureActionConfig, User } from "../types";

export async function createSecureAction<Input, Output>(
  user: User,
  input: Input,
  config: SecureActionConfig<Input>,
  handler: () => Promise<Output>
): Promise<Output> {
  // Role authorization
  if (
    config.allowedRoles &&
    !config.allowedRoles.includes(user.role)
  ) {
    throw new Error("Forbidden");
  }

  // Ownership authorization
  if (config.ownerRoles?.roles.includes(user.role)) {
    const isOwner = await config.ownerRoles.check(user, input);

    if (!isOwner) {
      throw new Error("Forbidden");
    }
  }

  // Authorized
  return handler();
}