
import { beforeEach, describe, expect, it, vi } from "vitest";

import { createSafeAction } from "@/domains/auth/util/safeAction";
import { getCurrentUserFull } from "@/domains/auth/util/session";

vi.mock("@/domains/auth/util/session", () => ({
  getCurrentUserFull: vi.fn(),
}));

type CurrentUser = NonNullable<
  Awaited<ReturnType<typeof getCurrentUserFull>>
>;

const roles = ["ADMIN", "STAFF", "SUPERADMIN", "USER"] as const;

type TestRole = (typeof roles)[number];

function userWithRole(role: TestRole): CurrentUser {
  return {
    user_metadata: { role },
  } as unknown as CurrentUser;
}

describe("createSafeAction", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  // General case: no authenticated user
  it("rejects an unauthenticated user", async () => {
    vi.mocked(getCurrentUserFull).mockResolvedValue(null);

    const handler = vi.fn().mockResolvedValue("result");
    const action = createSafeAction({}, handler);

    const result = await action();

    expect(result).toEqual({
      success: false,
      data: null,
      error: "user not logged in",
    });

    expect(handler).not.toHaveBeenCalled();
  });

  // General case: authenticated user without a role
  it("rejects a user without a role", async () => {
    vi.mocked(getCurrentUserFull).mockResolvedValue({
      user_metadata: {},
    } as unknown as CurrentUser);

    const handler = vi.fn().mockResolvedValue("result");
    const action = createSafeAction({}, handler);

    const result = await action();

    expect(result).toEqual({
      success: false,
      data: null,
      error: "user not logged in",
    });

    expect(handler).not.toHaveBeenCalled();
  });

  describe.each(roles)("%s role", (role) => {
    it("allows the role when it is explicitly permitted", async () => {
      vi.mocked(getCurrentUserFull).mockResolvedValue(
        userWithRole(role)
      );

      const handler = vi.fn().mockResolvedValue("result");
      const action = createSafeAction(
        { allowedRoles: [role] },
        handler
      );

      const result = await action();

      expect(result).toEqual({
        success: true,
        data: "result",
        error: undefined,
      });

      expect(handler).toHaveBeenCalledOnce();
    });

    it("rejects the role when it is not permitted", async () => {
      vi.mocked(getCurrentUserFull).mockResolvedValue(
        userWithRole(role)
      );

      const otherRole: TestRole =
        role === "ADMIN" ? "STAFF" : "ADMIN";

      const handler = vi.fn().mockResolvedValue("result");
      const action = createSafeAction(
        { allowedRoles: [otherRole] },
        handler
      );

      const result = await action();

      expect(result.success).toBe(false);
      expect(handler).not.toHaveBeenCalled();
    });
  });
});
