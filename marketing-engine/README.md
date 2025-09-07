Arc Marketing Engine — a Next.js web app that aggregates multi‑platform analytics, analyzes ROI and spend, provides AI‑powered spend recommendations, supports creator/industry research, manages brand collaborations, and offers a simple in‑browser media editor.

## Getting Started

First, install dependencies and run the development server:

```bash
npm install
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Key routes:

- `/` — marketing homepage with hero and feature grid
- `/analytics` — unified analytics and ROI chart (sample)
- `/campaigns` — campaign budgets and attribution (stubs)
- `/recommendations` — AI budget suggestions (stubs)
- `/research` — creator/industry research (stubs)
- `/collaborations` — brand collab pipeline (stubs)
- `/editor` — media editor placeholder

Vendor snapshot:

- `public/vendor/gorattle.html` — HTML snapshot of gorattle.com homepage
- `public/vendor/gorattle.json` — extracted metadata (title/meta/styles/nav/headings)
- `npm run extract:rattle` — re‑extract JSON from the HTML snapshot
- API: `GET /api/vendor/rattle` — serves the JSON

Design note: The UI is an original implementation inspired by modern SaaS sites. It does not copy proprietary assets or code from gorattle.com. Replace placeholder text/media with your brand.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font).

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
