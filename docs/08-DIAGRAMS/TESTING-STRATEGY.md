# Barber Booking App - Testing Strategy & Feature Audit

Comprehensive quality assurance strategy, unit test requirements, and end-to-end (E2E) testing specifications for the multi-tenant Barber Booking Application.

---

## 1. Architecture Strategy: Co-located Testing

To maintain domain proximity and accelerate developer feedback loops, all unit and integration tests are co-located alongside their respective source files.

### Repository Layout

```text
src/
├── actions/
│   ├── booking.ts
│   ├── booking.test.ts
│   ├── super-admin.ts
│   ├── super-admin.test.ts
│   ├── admin.ts
│   ├── admin.test.ts
│   ├── staff.ts
│   └── staff.test.ts
├── utils/
│   ├── availability.ts
│   └── availability.test.ts
└── components/
    ├── BookingWizard.tsx
    └── BookingWizard.test.tsx
```

---

## 2. Role-Based Feature Matrix & Test Requirements

### A. Super Admin Role

#### Feature Coverage

- **Multi-Tenant Management:** Create, suspend, or update organizations (`Organization` model).
- **Global Analytics:** Aggregated booking metrics, revenue stats, and active tenant count.
- **RBAC Enforcement:** Verify Super Admin can access all tenant spaces while isolating tenants from each other.

#### Unit & Integration Tests (`src/actions/super-admin.test.ts`)

- Verify tenant creation sets default currency, locale, and theme tokens correctly.
- Verify unauthorized users (Admin, Staff, Client) are rejected with a `403 Forbidden` status code.

| Test Case ID | Target Function / Action | Scenario Description                          | Expected Outcome                                                                                                   |
| :----------- | :----------------------- | :-------------------------------------------- | :----------------------------------------------------------------------------------------------------------------- |
| **SA-UT-01** | `createOrganization()`   | Initialize new tenant with minimal parameters | Organization record created with correct default currency (USD), default locale (en-US), and initial theme tokens. |
| **SA-UT-02** | `getGlobalMetrics()`     | Non-Super Admin attempts execution            | Action rejects invocation and returns `403 Forbidden` error.                                                       |
| **SA-UT-03** | `toggleTenantStatus()`   | Suspend an active tenant account              | Tenant status transitions to _Suspended_; active bookings retained but new bookings disabled.                      |

---

### B. Admin / Business Owner Role

#### Feature Coverage

- **Staff Management:** Add/remove staff members, assign roles, and set individual working schedules.
- **Service Catalog Management:** Create, update, or soft-delete services (duration, pricing, descriptions).
- **Business Availability & Overrides:** Configure global shop opening hours, break times, and holiday closures.
- **Dashboard Overview:** View daily/weekly revenue, appointment lists, and staff utilization rates.

#### Unit & Action Tests (`src/actions/admin.test.ts`)

- Verify non-owner staff cannot alter business settings or pricing.
- Verify schedule updates propagate correctly without deleting existing confirmed bookings.

| Test Case ID | Target Function / Action | Scenario Description                                             | Expected Outcome                                                                                          |
| :----------- | :----------------------- | :--------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------- |
| **AD-UT-01** | `updateServiceCatalog()` | Non-owner staff user attempts price modification                 | Request fails with authorization error; service record remains unchanged.                                 |
| **AD-UT-02** | `updateBusinessHours()`  | Shift store opening hour forward on a day with existing bookings | Shop hours update successfully; existing confirmed bookings outside new hours trigger admin warning flag. |
| **AD-UT-03** | `softDeleteService()`    | Archive an active service                                        | Service marked as archived; hidden from client wizard but intact in past booking logs.                    |

---

### C. Staff Role

#### Feature Coverage

- **Personal Schedule & Breaks:** Toggle custom working slots, set break intervals, and mark sick days.
- **Calendar Management:** View personal appointments, mark status as _Completed_, _No-Show_, or _Cancelled_.
- **Manual Booking Entry:** Walk-in appointment creation on behalf of clients.

#### Unit Tests (`src/actions/staff.test.ts`)

- Verify staff cannot modify other staff members' schedules or view cross-staff revenue unless granted explicit permission.
- Test time slot collision logic when manually logging a walk-in.

| Test Case ID | Target Function / Action    | Scenario Description                                      | Expected Outcome                                                 |
| :----------- | :-------------------------- | :-------------------------------------------------------- | :--------------------------------------------------------------- |
| **ST-UT-01** | `updateStaffSchedule()`     | Staff user attempts to modify peer staff schedule         | Action blocks execution with `403 Forbidden` error.              |
| **ST-UT-02** | `createWalkInBooking()`     | Log walk-in during an already booked slot for same barber | System rejects entry with conflict error `SLOT_UNAVAILABLE`.     |
| **ST-UT-03** | `updateAppointmentStatus()` | Transition appointment status to _Completed_              | Status updates in database; triggers automated receipt workflow. |

---

### D. End-User / Client Role

#### Feature Coverage

- **Multi-Step Booking Wizard:** Select service $
ightarrow$ Select staff $
ightarrow$ Pick available time slot $
ightarrow$ Enter client details & confirm.
- **Availability Computation:** Dynamically filter open time slots based on service duration, buffer time, staff availability, and existing bookings.
- **Appointment Management:** View upcoming/past bookings, reschedule, or cancel within allowed cancellation windows.

#### Unit & Component Tests (`src/utils/availability.test.ts`, `src/components/BookingWizard.test.tsx`)

- Test `calculateOpenSlots()` with overlapping appointments, boundary times, and custom buffer durations.
- Test form step validation (prevent proceeding without selecting service or time slot).

| Test Case ID | Target File         | Scenario Description                                                             | Expected Outcome                                                               |
| :----------- | :------------------ | :------------------------------------------------------------------------------- | :----------------------------------------------------------------------------- |
| **CL-UT-01** | `availability.ts`   | Compute open slots for 45-min service with 15-min buffer around 10:00 AM booking | Correct open slots generated with required buffer gap enforcement.             |
| **CL-UT-02** | `availability.ts`   | Compute open slots on full day holiday override                                  | Returns empty array `[]` for available slots.                                  |
| **CL-CT-01** | `BookingWizard.tsx` | Click "Next" on Step 1 without selecting a service                               | Form validation triggers; user remains on Step 1 with error state displayed.   |
| **CL-CT-02** | `BookingWizard.tsx` | Complete all steps and submit valid payload                                      | Submit handler triggers with compiled form payload and disables submit button. |

---

## 3. End-to-End (E2E) Test Plan (Playwright)

Automated E2E suites ensure critical user paths remain stable across system deployments.

### Flow 1: Client Complete Booking Journey

- **Objective:** Verify end-to-end client booking pipeline from service selection through database persistence.
- **Steps:**
  1. Navigate to store landing page.
  2. Launch booking wizard and select _Haircut & Beard Trim_ (45 mins).
  3. Select preferred barber or _Any Available Staff_.
  4. Pick tomorrow's 10:00 AM time slot.
  5. Fill in client metadata (Name, contact phone, email).
  6. Confirm booking submission.
- **Assertions:**
  - Confirmation screen displays a unique booking code.
  - Database query confirms new appointment record is in a `PENDING` or `CONFIRMED` state.
  - Assigned staff calendar reflects the new booking block.

### Flow 2: Staff Schedule Collision

- **Objective:** Ensure concurrency handling and lock mechanisms prevent duplicate bookings for identical time slots.
- **Steps:**
  1. Open two concurrent automated browser sessions (Session A and Session B).
  2. Both sessions select the same barber, same service, and target the identical 2:00 PM time slot.
  3. Session A submits the booking request slightly ahead of Session B ($t_{\Delta} < 200	ext{ms}$).
  4. Session B attempts to submit immediately after.
- **Assertions:**
  - Session A succeeds and displays booking confirmation.
  - Session B fails gracefully, displaying a user notification: _"This slot was just taken. Please select another time."_
  - Only one booking record exists for that staff member at 2:00 PM.

### Flow 3: RBAC Security Checks

- **Objective:** Enforce route-level protection and payload security across unauthenticated and lower-privilege users.
- **Steps:**
  1. Attempt direct URL navigation to `/admin/settings` while unauthenticated.
  2. Log in as a standard Client account and attempt navigation to `/admin/dashboard` and `/staff/schedule`.
  3. Log in as a Staff account and attempt navigation to `/admin/billing`.
- **Assertions:**
  - Unauthenticated requests are redirected to `/login?redirect=...`.
  - Client accounts navigating to restricted admin/staff routes are redirected to `/dashboard` with an unauthorized alert banner.
  - Staff accounts navigating to tenant billing receive a `403 Page Not Found / Unauthorized` view.
