```text


                 ┌────────────────────────┐
                 │   BOOKING REQUEST      │
                 └────────────┬───────────┘
                              │
                              ▼
                 ┌────────────────────────┐
                 │  SELECT STORE, STAFF,  │
                 │  SERVICE & DATE        │
                 └────────────┬───────────┘
                              │
                              ▼
                 ┌────────────────────────┐
                 │   LOAD SCHEDULE DATA   │
                 └────────────┬───────────┘
                              │
              ┌───────────────┼───────────────┐
              ▼               ▼               ▼
     ┌─────────────────┐ ┌────────────────┐ ┌────────────────┐
     │ Store Hours &   │ │ Staff Hours &  │ │ Service        │
     │ Special Closures│ │ Time Off       │ │ Duration       │
     └────────┬────────┘ └────────┬───────┘ └────────┬───────┘
              │                   │                  │
              └───────────────────┼──────────────────┘
                                  ▼
                    ┌────────────────────────┐
                    │  CALCULATE AVAILABLE   │
                    │  TIME WINDOWS          │
                    └────────────┬───────────┘
                                 │
                                 ▼
                    ┌────────────────────────┐
                    │  CHECK EXISTING        │
                    │  APPOINTMENTS & BUFFERS│
                    └────────────┬───────────┘
                                 │
                                 ▼
                    ┌────────────────────────┐
                    │  VALIDATE TIMEZONE &   │
                    │  BOOKING CONSTRAINTS   │
                    └────────────┬───────────┘
                                 │
                                 ▼
                       ┌─────────────────┐
                       │ Slots Available?│
                       └────┬───────┬────┘
                          YES       NO
                           │         │
                           ▼         ▼
                  ┌─────────────┐ ┌────────────────┐
                  │ DISPLAY     │ │ DISPLAY NO     │
                  │ AVAILABLE   │ │ AVAILABILITY & │
                  │ TIME SLOTS  │ │ ALTERNATIVES   │
                  └──────┬──────┘ └────────────────┘
                         │
                         ▼
                  ┌────────────────┐
                  │ USER SELECTS   │
                  │ A TIME SLOT    │
                  └───────┬────────┘
                          │
                          ▼
                  ┌────────────────┐
                  │ REVALIDATE &   │
                  │ RESERVE SLOT   │
                  └───────┬────────┘
                          │
                          ▼
                  ┌────────────────┐
                  │ ATOMIC BOOKING │
                  │ / CONFLICT     │
                  │ PREVENTION     │
                  └───────┬────────┘
                          │
                          ▼
                  ┌────────────────┐
                  │ CONFIRM BOOKING│
                  │ OR RETURN      │
                  │ CONFLICT ERROR │
                  └────────────────┘

```
