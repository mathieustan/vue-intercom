export { loadIntercomScript };

function loadIntercomScript (appId, done) {
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.async = true;
  script.src = `https://widget.intercom.io/widget/${appId}`;

  const firstScript = document.getElementsByTagName('script')[0];
  firstScript.parentNode.insertBefore(script, firstScript);
  script.onload = done;
}
