import { loadIntercomScript } from '../utils/script';

// https://developers.intercom.com/installing-intercom/docs/basic-javascript
export default function loadIntercom (appId, done) {
  if (!window || !document) return;

  const load = () => loadIntercomScript(appId, done);

  if (document.readyState === 'complete') loadIntercomScript(appId, done);
  else if (window.attachEvent) window.attachEvent('onload', load);
  else window.addEventListener('load', load, false);
}

