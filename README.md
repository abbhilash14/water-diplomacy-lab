# Water Diplomacy Lab

A dependency-free working browser prototype of a facilitated negotiation workshop, using the fictional Sahari Basin and Koral Dam case developed in the project discussion.

## Run locally

Use Node.js 20 or later:

```sh
node server.mjs
```

Open http://127.0.0.1:4173. Run the logic check with `node --test tests/model.test.mjs`.

## Try a full exercise

1. Start as **Facilitator**. Start the exercise, open Crisis inbox, review and release the Koral Dam failure.
2. Choose **Beloria** in View as. Read its role brief, open the inbox, try the guided advisor and submit a proposal with an owner and timing.
3. Switch to Ardania, Cordinia and Demeria. Each role records support on the Agreement page.
4. Return to Facilitator. Record the measure as agreed. Up to five measures can be adopted.
5. Pause/resume as needed, release more events, then end the exercise on Session review. Save debrief notes and export the summary.
6. Reload to see browser persistence, or create a new workshop without losing the previous one.

## What works

Named workshops, browser storage and same-origin tab updates, role-specific views, a persistent timer, pause/resume, reviewed event release, audience-filtered inboxes, per-role guided advice, saved proposal drafts, country endorsements, facilitator adoption, an actual activity history, shared notes and a Markdown export that excludes private event details and advisor conversations.

## Deliberate prototype limits

- All application data lives in localStorage in the current browser, under `water-diplomacy-lab-v1`. It is not synchronized across devices. Data is lost if browser storage is cleared. Export important summaries.
- Role switching is a demonstration tool, not authentication. Role briefs and scenario data are shipped to the browser. Do not use real confidential data. The visibility rules are presentation behavior, not a security boundary.
- The advisor is deterministic guidance using the selected role and released updates. It is clearly labelled and makes no live model/API calls. It does not provide real legal or engineering advice.
- This is an independent project example; it does not imply institutional endorsement. Scenario figures are fictional training assumptions.
- Fonts load from Google Fonts when available, with system fallbacks. No analytics or external application services are used.

## Before a real multi-user pilot

Add server-side sessions, authentication and authorization; store shared state in a database; isolate confidential role and advisor context before model requests; choose an approved AI provider; agree retention, support and operating ownership; and review content with SIWI subject-matter experts. Keep the manual workshop fallback.

## Files

- `dist/index.html`, `styles.css`: responsive interface.
- `dist/model.js`: workshop behavior and fictional scenario content.
- `dist/app.js`: rendering, browser storage and actions.
- `server.mjs`: local static preview server.
- `tests/model.test.mjs`: one end-to-end logic check.
