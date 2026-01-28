// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://4ecf524673abbe6c7bc4e777fce5e8a0@o4510715695988737.ingest.us.sentry.io/4510750209212416",

  integrations: [
    Sentry.vercelAIIntegration({
      recordInputs: true,
      recordOutputs: true,
    }),
    Sentry.consoleLoggingIntegration({ levels: ["log", "warn", "error"] }),
  ],

  // Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
  tracesSampleRate: 1,

  // Enable logs to be sent to Sentry
  enableLogs: true,

  // Enable sending user PII (Personally Identifiable Information)
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/configuration/options/#sendDefaultPii
  sendDefaultPii: true,
});

// // Import with `import * as Sentry from "@sentry/nextjs"` if you are using ESM
// const Sentry = require("@sentry/nextjs");

// Sentry.init({
//   dsn: "https://ef81b0730f1aefdd7a20da4f2fa6a677@o4510715695988737.ingest.us.sentry.io/4510750196629504",
//   // Tracing must be enabled for agent monitoring to work
//   tracesSampleRate: 1.0,
//   // Add data like inputs and responses to/from LLMs and tools;
//   // see https://docs.sentry.io/platforms/javascript/data-management/data-collected/ for more info
//   sendDefaultPii: true,
// });
