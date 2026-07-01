export type RoleType = "SUPERADMIN" | "ADMIN" | "STAFF" | "USER";

export type User = {
  id: string;
  role: string;
};

export type SecureActionConfig<Input> = {
  allowedRoles?: string[];
  ownerRoles?: {
    roles: string[];
    check: (user: User, data: Input) => Promise<boolean> | boolean;
  };
};