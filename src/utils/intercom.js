export {
  callIntercom,
  onInitIntercom,
  onBootIntercom,
  onShutdownIntercom,
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

function onBootIntercom (vm, options) {
  vm.isBooted = true;
  callIntercom('boot', options);
}

function onShutdownIntercom (vm) {
  vm.isBooted = false;
  callIntercom('shutdown');
}
