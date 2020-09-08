export {
  callIntercom,
  onInitIntercom,
  onBootIntercom,
};

function callIntercom (...args) {
  if (!window.Intercom) return;
  return window.Intercom(...args);
}

function onInitIntercom (vm) {
  vm.ready = true;
  callIntercom('onHide', () => (vm.visible = false));
  callIntercom('onShow', () => (vm.visible = true));
  callIntercom('onUnreadCountChange', unreadCount => (vm.unreadCount = unreadCount));
}

function onBootIntercom (options, appId) {
  if (!options.app_id) options.app_id = appId;
  if (!appId) {
    console.warn('You didn\'t specified Intercom appId. Please check your configuration.');
    return;
  }

  callIntercom('boot', options);
}
