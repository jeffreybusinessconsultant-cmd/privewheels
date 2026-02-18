# PRIVE WHEELS - Fractional Supercar Ownership Platform

## Overview

PRIVE WHEELS is a fractional supercar ownership platform focused on the Indian market. Users can browse a fleet of luxury/exotic cars, purchase shares in vehicles, and book time slots to drive them. The app features a dark premium theme with gold/metallic accents.

Key features:
- **Fleet browsing**: View available cars with details like share price, location, and specs
- **Car details**: Individual car pages with full specifications and booking calendar
- **Booking system**: Calendar-based availability checking and reservation creation
- **User dashboard**: View upcoming and past bookings, cancel reservations
- **Fractional ownership model**: Cars are divided into shares (typically 12), priced in INR

Currently uses a mock user (ID=1) since authentication is not fully implemented.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend (client/)
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight alternative to React Router)
- **State/Data fetching**: TanStack React Query for server state management
- **UI Components**: shadcn/ui (new-york style) built on Radix UI primitives
- **Styling**: Tailwind CSS with CSS variables for theming, dark mode by default
- **Animations**: Framer Motion for page transitions and micro-interactions
- **Calendar**: react-day-picker for the booking calendar
- **Build tool**: Vite with React plugin
- **Path aliases**: `@/` maps to `client/src/`, `@shared/` maps to `shared/`

### Backend (server/)
- **Framework**: Express 5 on Node.js
- **Language**: TypeScript, run with tsx
- **API pattern**: RESTful JSON API under `/api/` prefix
- **Route definitions**: Shared API contract in `shared/routes.ts` using Zod schemas, referenced by both client and server
- **Development**: Vite dev server middleware for HMR, served through Express
- **Production**: Static file serving from `dist/public`

### Shared Code (shared/)
- **Schema**: Drizzle ORM table definitions with Zod validation schemas via `drizzle-zod`
- **Routes**: API contract object defining paths, methods, input/output schemas — used by both frontend hooks and backend route handlers
- **Types**: Inferred TypeScript types from Drizzle schemas (User, Car, Booking, InsertUser, InsertCar, InsertBooking)

### Database
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Database**: PostgreSQL via `pg` (node-postgres) Pool
- **Schema management**: `drizzle-kit push` for schema sync (no migration files needed for dev)
- **Tables**: `users`, `cars`, `bookings` with relations defined in Drizzle
- **Connection**: `DATABASE_URL` environment variable required

### Data Model
- **users**: id, username, fullName, email, avatarUrl, isAdmin, createdAt
- **cars**: id, make, model, year, color, imageUrl, price, shares, sharePrice, description, specs (JSON string), location, contactNumber, status
- **bookings**: id, carId, userId, startDate, endDate, status, createdAt
- Relations: cars have many bookings, users have many bookings

### Build Process
- Client: Vite builds to `dist/public`
- Server: esbuild bundles server to `dist/index.cjs`, with select dependencies bundled and others externalized
- Scripts: `npm run dev` (development), `npm run build` (production build), `npm start` (run production), `npm run db:push` (sync schema)

### Storage Layer
- `IStorage` interface defines all data operations
- `DatabaseStorage` class implements it with Drizzle queries
- Availability checking prevents double-booking via date overlap queries

## External Dependencies

### Required Services
- **PostgreSQL Database**: Connected via `DATABASE_URL` environment variable. Used for all persistent data (users, cars, bookings).

### Key npm Packages
- **drizzle-orm** + **drizzle-kit**: ORM and schema management for PostgreSQL
- **express**: HTTP server framework (v5)
- **@tanstack/react-query**: Server state management on the client
- **zod** + **drizzle-zod**: Schema validation shared between client and server
- **framer-motion**: Animation library for the frontend
- **react-day-picker**: Calendar widget for booking dates
- **date-fns**: Date utility functions
- **wouter**: Lightweight client-side routing
- **connect-pg-simple**: PostgreSQL session store (available but sessions not actively used yet)

### External Assets
- **Google Fonts**: Montserrat (display), Inter (body), DM Sans, Fira Code, Geist Mono, Architects Daughter
- **Unsplash**: Car placeholder images loaded from `images.unsplash.com`

### Replit-specific
- **@replit/vite-plugin-runtime-error-modal**: Error overlay in development
- **@replit/vite-plugin-cartographer**: Dev tooling (dev only)
- **@replit/vite-plugin-dev-banner**: Dev banner (dev only)