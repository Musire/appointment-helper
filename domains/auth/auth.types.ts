export type RoleType = "SUPERADMIN" | "ADMIN" | "STAFF" | "USER";



export type SecureActionConfig = {
  allowedRoles?: string[];
  ownerRoles?: Array<{
    role: string; // Changed from roles: string[] to a single role string
    check: () => Promise<boolean> | boolean;
  }>;
};


// Define the unified result type
export type ActionResult<T> = 
  | { success: true; data: T; error?: string }
  | { success: false; data: null; error: string }
  | { success: false; data: null; error: null};


  export type ActionResponse<T> = 
  | { success: true; data: T; error?: undefined }   
  | { success: false; data?: null; error: string }  
  | { success: false; data?: null; error?: undefined }
