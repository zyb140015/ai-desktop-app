# Northstar Desk

Northstar Desk is an Electron + React + TypeScript + Vite desktop shell for AI-assisted product work. The current build focuses on a clean layered foundation so later features can extend the app without breaking Electron boundaries.

## Stack

- Electron main process for window lifecycle, IPC handlers, and persisted settings
- Preload bridge for the typed `window.desktop` API
- React + React Router renderer for the desktop shell UI
- TanStack Query for async desktop data flows
- React Hook Form + Zod for typed settings forms
- Tailwind CSS for renderer styling

## Project structure

- `src/main` - Electron entry point and privileged services
- `src/preload` - typed bridge exposed to the renderer
- `src/renderer` - routes, components, hooks, and UI state
- `src/shared` - IPC contracts, schemas, and shared types

## Scripts

- `npm run dev` - start the Vite renderer dev server with Electron integration
- `npm run build` - run TypeScript builds and bundle the renderer/main process
- `npm run lint` - run ESLint across renderer, main, preload, and shared code
- `npm run test` - run Vitest in jsdom

## AI workflow rules

Future AI contributors should read `AGENTS.md` in this project root before making changes. That file mirrors the project rules for:

- layer ownership across `main`, `preload`, `renderer`, and `shared`
- Electron security boundaries and IPC validation
- state management choices for Zustand and TanStack Query
- settings, forms, tests, and delivery expectations

## Current routes

- `/` - architecture overview and delivery surface
- `/projects` - AI playbook for future extension work
- `/settings` - persisted desktop preference form through IPC
