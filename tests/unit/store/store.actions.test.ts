
import { beforeEach, describe, expect, it, vi } from "vitest";

import {
    validateFormData,
} from "@/domains/auth/util/safeAction";
import { getCurrentUserFull } from "@/domains/auth/util/session";
import { createStore } from "@/domains/store/store.actions";
import {
    createStoreService,
} from "@/domains/store/store.services";
import { StoreCreationSchema } from "@/domains/store/store.validations";
import { revalidatePath } from "next/cache";

vi.mock("@/domains/auth/util/session", () => ({
  getCurrentUserFull: vi.fn(),
}));

vi.mock("@/domains/auth/util/requireRole", () => ({
  requireRole: vi.fn(),
}));

vi.mock("@/domains/store/store.services", () => ({
  createStoreService: vi.fn(),
  saveBusinessHoursService: vi.fn(),
  updateStoreHoursService: vi.fn(),
  updateStoreService: vi.fn(),
}));

vi.mock("next/cache", () => ({
  revalidatePath: vi.fn(),
}));

vi.mock("@/domains/auth/util/safeAction", async (importOriginal) => {
  const actual =
    await importOriginal<
      typeof import("@/domains/auth/util/safeAction")
    >();

  return {
    ...actual,
    validateFormData: vi.fn(),
  };
});

describe("createStore action", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("creates a store for an authorized admin", async () => {
    // Arrange: simulate an authenticated admin.
    vi.mocked(getCurrentUserFull).mockResolvedValue({
      user_metadata: { role: "admin" },
    } as unknown as Awaited<ReturnType<typeof getCurrentUserFull>>);

    const formData = new FormData();
    formData.set("name", "Test Store");

    const validatedData = {
      name: "Test Store",
    };

    const serviceResult: Awaited<ReturnType<typeof createStoreService>> = {
        id: "store-123",
        name: "Test Store",
        address: "123 Test Street",
        createdAt: new Date("2026-01-01T12:00:00Z"),
        status: "ACTIVE",
        createdById: "user-123",
    };

    vi.mocked(validateFormData).mockReturnValue(
      validatedData as ReturnType<typeof validateFormData>
    );

    vi.mocked(createStoreService).mockResolvedValue(serviceResult);

    // Act: execute the real action.
    const result = await createStore(undefined, formData);

    // Assert: validation was requested with the correct schema and input.
    expect(validateFormData).toHaveBeenCalledWith(
      StoreCreationSchema,
      formData
    );

    // Assert: the service received validated data and default hours.
    expect(createStoreService).toHaveBeenCalledWith({
      data: validatedData,
      defaultHours: [
        {
          label: "Lun - Vier",
          isActive: false,
          start: "09:00 AM",
          end: "05:00 PM",
        },
        {
          label: "Sábado",
          isActive: false,
          start: "09:00 AM",
          end: "02:00 PM",
        },
        {
          label: "Domingo",
          isActive: false,
          start: "09:00 AM",
          end: "02:00 PM",
        },
      ],
    });

    expect(revalidatePath).toHaveBeenCalledWith("/dashboard");
    expect(result).toEqual({
      success: true,
      data: serviceResult,
      error: undefined,
    });
  });
});
