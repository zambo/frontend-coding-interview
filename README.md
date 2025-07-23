# Clever Frontend Interview

Sign-in/photos app using Pexels API. Two pages, protected routes, mock auth.

## Setup

```bash
npm install
npm run dev
```

Uses Pexels API key from TODO.md, configured in `.env.local`.

## Tech Stack

- Next.js 15 App Router
- TypeScript strict mode
- Server Actions for forms
- React Hook Form + Zod validation
- HTTP-only cookies for auth
- Jest + Testing Library

## Architecture

**Server Actions**: Forms work without JavaScript. Security over convenience.

**Authentication**: Any email/password accepted → 24h session cookie → middleware validation.

**Photos**: Suspense + skeleton loading. Error boundaries. Cached fetch with Next.js revalidation.

**Components**: shadcn/ui base, custom blocks. Minimal prop-drilling.

## Structure

```
src/
  app/               # Next.js pages
  components/ui/
    base/           # shadcn/ui (and some others) primitives
    blocks/         # app-specific components
  lib/              # utils, actions, auth
```

## Testing

```bash
npm test          # Jest
npm run typecheck # TypeScript
npm run lint      # ESLint
```

Covers components, form validation, photo rendering. Mocks server actions properly.

## Production TODOs

- Real backend auth
- Form loading states
- Rate limiting
- E2E tests
- Error monitoring
- Performance tracking
- Session handling
- Offline support

Mock auth works for demo. API integration functional. Tests pass.
