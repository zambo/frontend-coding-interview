# Docs

Quick notes on approach + decisions. Git tracks changes so I can reference later & Clever team can review.

## Skills to showcase

Based on the [job description](https://clever-real-estate.breezy.hr/p/1a27837eff8e-frontend-software-engineer), here are the main stack/things to showcase:

- React + TypeScript (core requirement)
- NextJS/Gatsby + React Native experience
- TDD/BDD approach with proper testing
- Design patterns (when/when not to use)
- Git workflow + collaboration
- Problem breakdown + tradeoffs discussion
- TailwindCSS styling
- AWS/Vercel deployment
- Clear documentation + communication

## Drafting TODOs

Drafting some things... The goal it to have the figma mockup working, but... if time allows...

- [] monorepo setup to share utils/components/styles/linting/code-quality between web (gatsby), mobile (RN), and core app components.
- [] husky + lint-staged for pre-commit hooks
- [] TypeScript strict mode for type safety and catching issues early
- [x] TailwindCSS for consistent styling (already scaffolded by create-next-app)
- [ ] unit tests with jest + react-testing-library
- [ ] e2e with selenium
- [ ] ci/cd, something simple for now, like making sure tests pass before deploying to vercel
- [ ] storybook for component library
- [ ] a11y rules + testing
- [ ] state management with zustand (probably overkill, but zustand is the most lightweight and reduces boilerplate)
- [ ] form validation with react-hook-form and zod
- [ ] protected routes, let's try to keep it simple before using something like next-auth or better-auth

---

## BDD

Just doing a rough translation of the requirements into user stories for BDD approach:

### Auth

- given a user visits the sign-in page
- when they enter the (spoofed) credentials
- then they should be redirected to the photos page
- and their auth state should persist (localStosage for now)
- and they should see the photos list

- given the user it not authenticated
- when they try to access the photos page directly
- then they should be redirected to the sign-in page
- and see the sign-in form

...and loading state (not required, but good practice)
...and 10 nature photos
...and responsive/mobile friendly
...and error handling (eg. if API fails, show a message)

## Architecture

### Code Quality

### Testing

### Design patterns

### State Management
