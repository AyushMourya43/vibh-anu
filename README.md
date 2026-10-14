# Vibh-Anu CRM

A five-department lead workflow (Marketing → Communication → Vigilance → Support → Sales) with role-based access, a private audio bucket and a verified claim step for Sales.

## Stack

TanStack Start · React · TypeScript · Tailwind CSS · Supabase (auth, Postgres, storage)

## Run locally

```sh
npm install
npm run dev
```

## Environment variables

Set these in `.env` locally and in your hosting settings:

```
VITE_SUPABASE_URL=
VITE_SUPABASE_PUBLISHABLE_KEY=
VITE_SUPABASE_PROJECT_ID=
SUPABASE_URL=
SUPABASE_PUBLISHABLE_KEY=
SUPABASE_PROJECT_ID=
```

The `VITE_*` values are baked in at build time, so set them before deploying.

## Deploy (Vercel)

Import the repo, keep the preset as **Other**, add the environment variables and deploy.

## Tests

```sh
npm test
```