# Inferno - Vite + React + TypeScript

Landing site for Inferno IT Solutions.

## Tech Stack
- Vite
- React 18
- TypeScript
- EmailJS (`@emailjs/browser`)

## Local Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a local env file:
   ```bash
   cp .env.example .env.local
   ```
3. Fill these values in `.env.local`:
   - `VITE_EMAILJS_SERVICE_ID`
   - `VITE_EMAILJS_TEMPLATE_ID`
   - `VITE_EMAILJS_PUBLIC_KEY`
4. Start dev server:
   ```bash
   npm run dev
   ```

## Build
```bash
npm run build
```

## Deployment Notes (Vercel/Render)
- Do not commit `.env` or `.env.local`.
- Add the same `VITE_EMAILJS_*` variables in your hosting dashboard environment settings.
- Build command: `npm run build`
- Output directory: `dist`

## Important
- `node_modules/` and `dist/` must stay untracked via `.gitignore`.
