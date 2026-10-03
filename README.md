# Nexora Academy Student Portal

Student portal frontend built with React, Vite, and React Router.

## Run locally

1. Install Node.js (LTS).
2. From this folder, run `npm install`.
3. Run `npm run dev` and open the local URL shown by Vite.

## Frontend layout

- `src/pages/` contains one component and one matching CSS file per portal page.
- `src/components/` contains shared interface components, each with a matching CSS file.
- `src/App.jsx` defines the routes and shared page frame.
- `src/index.css` contains only global styles and design tokens.

The programme pages currently use sample data. A lecturer supplied attendance status controls the assessment gate: attended students can access the assessment, while absent students must watch the uploaded recording first. The frontend currently stores section completion in browser storage; connect it to authenticated backend data and recording storage for real student use.
