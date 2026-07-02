import { SecureActionConfig, User } from "../types";

export async function createSecureAction<Input, Output>(
  user: User,
  input: Input,
  config: SecureActionConfig<Input>,
  handler: () => Promise<Output>
): Promise<Output> {
  // 1. Core Role authorization
  if (config.allowedRoles && !config.allowedRoles.includes(user.role)) {
    throw new Error("Forbidden");
  }

  // 2. Granular Ownership authorization
  if (config.ownerRoles) {
    // Find the specific rule that matches the current user's role
    const specificRule = config.ownerRoles.find(rule => rule.role === user.role);

    if (specificRule) {
      const isOwner = await specificRule.check(user, input);
      if (!isOwner) {
        throw new Error("Forbidden");
      }
    }
  }

  return handler();
}