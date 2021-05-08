import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import RSentry  from './RSentry'
RSentry.initself()
console.log(' RSentry is ', RSentry)
window.RSentry = RSentry
console.log(' window.RSentry is ', window.RSentry)
Sentry.init({
  dsn: "https://2e863aaa12c24e5fa284cd9b0acd820a@o290113.ingest.sentry.io/5735747",
  integrations: [new Integrations.BrowserTracing()],
  release: "react@4.0.2",
  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});
window.Sentry = Sentry
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
