```text

                 ┌────────────────────────┐
                 │   BOOKING SUBMITTED    │
                 └────────────┬───────────┘
                              │
                              ▼
                 ┌────────────────────────┐
                 │   VALIDATE BOOKING     │
                 │   & AVAILABILITY       │
                 └────────────┬───────────┘
                              │
                              ▼
                    ┌─────────────────┐
                    │ Booking Valid?   │
                    └────┬────────┬───┘
                        YES       NO
                         │         │
                         ▼         ▼
                ┌────────────┐ ┌────────────┐
                │  PENDING   │ │ REJECTED   │
                └─────┬──────┘ └────────────┘
                      │
                      ▼
             ┌────────────────────┐
             │ Confirmation       │
             │ Required?           │
             └────┬───────────┬───┘
                  │           │
                MANUAL      AUTOMATIC
                  │           │
                  ▼           ▼
           ┌────────────┐ ┌────────────┐
           │  PENDING   │ │ CONFIRMED  │
           │ APPROVAL   │ └─────┬──────┘
           └─────┬──────┘       │
                 │              │
                 ▼              │
           ┌────────────┐        │
           │ CONFIRMED  │        │
           └─────┬──────┘        │
                 └───────┬──────┘
                         │
                         ▼
                ┌────────────────┐
                │ Appointment    │
                │ Time Arrives   │
                └───────┬────────┘
                        │
                        ▼
                ┌────────────────┐
                │   CHECKED_IN   │
                └───────┬────────┘
                        │
                        ▼
                ┌────────────────┐
                │  IN_PROGRESS   │
                └───────┬────────┘
                        │
                        ▼
                ┌────────────────┐
                │   COMPLETED    │
                └────────────────┘


        EXCEPTIONAL TRANSITIONS
        ─────────────────────────────────

        PENDING / CONFIRMED ──► CANCELLED
        PENDING              ──► REJECTED
        CONFIRMED            ──► NO_SHOW
        CONFIRMED            ──► RESCHEDULED

```
