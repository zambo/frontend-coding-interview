# Some notes...

- Add form loading states
- Show error messages when API calls fail
- Test error scenarios (network failures, etc)
- Rate limiting for login attempts

- Add E2E tests for user flows (selenium)
- Set up error monitoring
- Add performance tracking
- Implement proper session handling
- Add offline support

## Current State

Uses Server Actions for forms, skeleton loading for photos, httpOnly cookies for auth. Mock authentication works but needs real backend. Image optimization and caching implemented. Tests cover main components.

## Architecture Notes

Chose Server Actions over client state for security. Forms work without JavaScript. Used Next.js patterns throughout. Trade-off: simplicity over features for interview scope.
