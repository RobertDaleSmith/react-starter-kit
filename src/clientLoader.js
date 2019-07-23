const readyStates = new Set(['complete', 'loaded', 'interactive']);

function loadMainClient() {
  const main = require('./client').default; // eslint-disable-line global-require
  main();
}

function run() {
  // Run the application when both DOM is ready and page content is loaded
  if (readyStates.has(document.readyState) && document.body) {
    loadMainClient();
  } else {
    document.addEventListener('DOMContentLoaded', loadMainClient, false);
  }
}

run();
