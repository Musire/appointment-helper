Booking integrity
[ ] Prevent double booking under concurrent requests
[ ] Validate availability again when confirming a booking
[ ] Make retries safe against duplicate submissions
[ ] Handle cancellations and rescheduling consistently

User experience
[ ] Loading, empty, success, and error states for every main screen
[ ] Validation errors that explain how to recover
[ ] Accessible controls and mobile-friendly forms
[ ] Clear feedback after every appointment status change

Operations and security
[ ] Audit important administrative and appointment changes
[ ] Consistent server-side authorization and input validation
[ ] Reliable handling of email or notification failures
[ ] Logging and error monitoring for production

Testing
[ ] Unit tests for scheduling and state-transition rules
[ ] Integration tests for repositories and database constraints
[ ] Authorization tests for each role and store boundary
[ ] End-to-end tests for booking, check-in, cancellation, and rebooking
