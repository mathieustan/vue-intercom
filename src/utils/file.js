export {
  loadAsyncScript,
};

function loadAsyncScript (appId, instance) {
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.async = true;
  script.src = `https://widget.intercom.io/widget/${appId}`;
  script.onload = () => instance.emit('ready');

  const firstScript = document.getElementsByTagName('script')[0];
  firstScript.parentNode.insertBefore(script, firstScript);

}
