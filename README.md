# Appointment Helper

### Purpose
The purpose of this system is to allow clients to book appointments with staff members online, manage appointments, streamline check-in through QR codes, and provide real-time scheduling updates across the business.

### Issues
1. Clients must call or message the business to schedule appointments.
2. Staff availability is difficult to track.
3. Schedule changes are not communicated immediately.
4. Client appointment history is difficult to access.

### Goals
1. Allow clients to self-book appointments.
2. Reduce administrative scheduling work.
3. Provide a fast check-in experience.
4. Keep schedules synchronized in real time.
5. Maintain complete appointment history.


## ✨ Key Features
* **Authentication**: 
    - Create Account
    - Log In
    - Log Out
    - Accept Staff Invitation
    - Activate Staff Account
* **Profile Management**: 
    - Manage Contact Information
    - Manage Staff Profile
    - Manage Staff Specialties
* **Discovery**: 
    - View Stores
    - View Staff Profiles
    - View Services
    - View Available Time Slots
* **Booking**: 
    - Book Appointment
    - Receive Booking Confirmation
    - Receive Appointment QR Code
* **Appointment Management**: 
    - View Upcoming Appointments
    - Reschedule Appointment
    - Cancel Appointment
* **Availability Management**: 
    - Configure Working Hours
    - Configure Available Time Slots
    - Create Time Off
* **Client Management**: 
    - Search Clients
    - View Client Profile
    - View Client Appointment History
* **Check-In**: 
    - QR Code Check-In
    - Manual Check-In
* **Service Management**: 
    - Start Service
    - Complete Service
    - Mark No Show
* **History**: 
    - View Appointment History
* **Notifications**: 
    - Appointment Scheduled Notification
    - Appointment Cancelled Notification
    - Appointment Rescheduled Notification
* **Realtime Updates**: 
    - Live Appointment Updates
    - Live Check-In Updates
    - Live Schedule Updates

## 🛠️ Built With
* **Frontend**: Next.js, React, TypeScript, TailwindCSS, Radix UI (Shadcn)
* **Backend**: Next.js (App Router / Server Actions)
* **Database & ORM**: PostgreSQL (Neon/pg), Prisma ORM
* **Authentication & Backend-as-a-Service**: Supabase


## 🚀 Quick Start

### Prerequisites
* Node.js v20+ (Targeted by `@types/node`)
* Supabase Account & Database (Neon/PostgreSQL)

### Installation
```bash
# Clone the repository
git clone https://github.com/Musire/appointment-helper

# Move into the directory
cd appointment-helper

# Install dependencies
npm install

# Sync your Prisma schema with your database
npx prisma db push

# Generate the Prisma Client
npx prisma generate

# Start local development server
npm run dev
```

## 📖 Technical Documentation

For deep dives into the underlying system design, architecture, and business rules, see our comprehensive engineering guides:

* 🧠 [Domain Model & Business Rules](docs/domain-logic.md) — Explains core domain contexts and system validation logic.
* 🔄 [System Processes & State Machines](docs/architecture-flows.md) — Outlines background processing pipelines and state flows.
* 📊 [Data Model & Schema](docs/data-model.md) — Entity-relationship diagrams and database table breakdowns.
* 🏗️ [Architectural Decisions](docs/architecture.md) — Structural choices, actors, and full infrastructure maps.
