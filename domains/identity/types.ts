export type RoleType = "SUPERADMIN" | "ADMIN" | "STAFF" | "USER";

export type User = {
  id: string;
  role: string;
};

export type SecureActionConfig<Input> = {
  allowedRoles?: string[];
  ownerRoles?: Array<{
    role: string; // Changed from roles: string[] to a single role string
    check: (user: User, data: Input) => Promise<boolean> | boolean;
  }>;
};

// Define the unified result type
export type ActionResult<T> = 
  | { success: true; data: T; error?: string }
  | { success: false; data: null; error: string };
