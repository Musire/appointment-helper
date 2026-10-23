BH-01 |
Valid time block: 09:00–17:00 | Expected: Accepted | P0
BH-02 |
Start time equals end time | Expected: Rejected | P0
BH-03 |
Start time is after end time | Expected: Rejected or handled as an overnight interval, according to your rules | P0
BH-04 |
Two blocks overlap | Expected: Rejected | P0
BH-05 |
Blocks are adjacent: 09:00–12:00 and 12:00–17:00 | Expected: Accepted if adjacency is permitted | P1
BH-06 |
Inactive day has configured hours | Expected: No availability that day | P0
BH-07 |
Malformed time or missing required field | Expected: Validation fails safely | P1

Booking correctness and availability

- Store hours, closures, and staff working hours
- Service duration and buffer time
- Existing appointments and overlapping slots
- Two clients attempting to book the same slot
- Timezone and date-boundary handling

P0
Security and data integrity

- Unauthenticated requests are rejected
- Role permissions are enforced on the server
- Users cannot access another tenant's data
- Invalid appointment status transitions are rejected
- Failed operations don't leave partial database changes

P1
Core management workflows

- Configure business hours
- Create and update services
- Manage staff schedules
- Confirm, cancel, reschedule, and complete appointments

P2
User experience and secondary features

- Form validation and error messages
- Dashboard metrics
- Empty states and loading states
- Styling and responsive layouts
