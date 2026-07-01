// src/lib/route-map.ts

export const ROUTE_TITLES: Record<string, string> = {
  // Admin Routes
  "/admin/dashboard": "Admin Dashboard",
  "/admin/store/new": "Create New Store",
  "/admin/store/:slug": "Store Overview",
  "/admin/store/:slug/hours": "Business Hours",
  "/admin/store/:slug/services": "Services",
  "/admin/store/:slug/services/new/category": "New Category",
  "/admin/store/:slug/services/new/service": "New Service",
  "/admin/store/:slug/staff": "Staff Management",
  "/admin/store/:slug/staff/invite": "Invite Staff",
  "/admin/store/edit/:slug": "Edit Store Details",
  "/admin/welcome": "Welcome",

  // Staff Routes
  "/staff/dashboard": "",
  "/staff/dashboard/history/:appointmentId": "Appointment Details",
  "/staff/dashboard/profile": "",
  "/staff/dashboard/stores": "",
  "/staff/dashboard/stores/:storeId": "Availability",
  "/staff/dashboard/upcoming": "",

  // User Routes
  "/user/dashboard": "",
  "/user/dashboard/history": "",
  "/user/dashboard/profile": "",
  "/user/dashboard/profile/edit": "Edit Profile",
  "/user/booking": "Start Booking",
  "/user/booking/service": "Select Service",
  "/user/booking/staff": "Choose Staff",
  "/user/booking/dateTime": "Pick Date & Time",
  "/user/booking/review": "Review Booking",

  // Superadmin & Misc
  "/superadmin/dashboard": "System Control",
  "/dashboard": "Dashboard",
  "/tinker": "Playground",
  "/unauthorized": "Access Denied",
  
  // Explicitly empty for specific pages
  "/login": "",
  "/signup": "",
};
