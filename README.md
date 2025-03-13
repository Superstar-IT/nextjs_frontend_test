# Test Assessment (Next.js + TypeScript + Shadcn UI)


## Context

Create an application with Next.js 14 + React 18 + TypeScript that consumes data from JSONPlaceholder. It’s recommended to use the `/users`, `/posts`, and `/comments` endpoints to display relationships and functionalities like listings, details, and comments. The use of TanStack Query for request management and Next.js 14 Server Components is valued, as long as they are used appropriately.


## Features 

- [x] TypeScript, React 18, Next.js 14
- [x] Tailwind CSS & Shadcn UI for Styling
- [x] React Query for Data Fetching
- [x] Use the JSONPlaceholder API
- [x] Allow filtering the list by name or username
- [x] Allow sorting posts by title and/or filtering by partial text in the title
- [x] Paginate the list
- [x] Implement a simple form to add a comment
- [x] ESLint for Code Quality
- [x] Prettier for Code Formatting
- [x] React Hook Form for Forms
- [x] Tanstack Tables for Data Display
- [x] Zod for Schema Validation

## Getting Started

To set up and run this app locally, follow these steps:


1. ```git clone https://github.com/Superstar-IT/nextjs_frontend_test.git```
2. ```npm install```
3. ```npm run dev```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Architectural decisions

- [x] Why you used Server Components.

✅ Default behavior in Next.js App Router (app/ directory)
✅ Static or Dynamic (can use fetch(), but no client-side interactivity)
✅ Faster page loads (smaller JavaScript bundle sent to the client)
✅ Optimized for performance

- [x] How you organized your `/app` folder. 

✅ Supports Built-in Layouts, Nested Routing, Streaming, and Suspense
✅ Uses Server Actions for form handling

- [x] How you structured logic with React Query.
✅ Just used React Query to fetch data