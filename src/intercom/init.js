/* eslint-disable no-underscore-dangle */

// Helpers
import { isValidType, mapInstanceToProps } from '../utils';
import { callIntercom, onInitIntercom, onBootIntercom } from '../utils/intercom';

// Thanks to https://github.com/johnnynotsolucky/vue-intercom/blob/master/src/index.js
export default function initIntercom (Vue, { appId }) {
  const vm = new Vue({
    data: () => ({
      ready: false,
      visible: false,
      unreadCount: 0,
    }),
  });

  const defaultOptions = { app_id: appId };

  const intercom = {
    _vm: vm,
    _call: callIntercom,
    _init: () => onInitIntercom(vm),
    boot: (options = defaultOptions) => onBootIntercom(Object.assign({}, defaultOptions, options)),
    shutdown: () => callIntercom('shutdown'),
    update: (...options) => callIntercom('update', ...options),
    show: () => callIntercom('show'),
    hide: () => callIntercom('hide'),
    showMessages: () => callIntercom('showMessages'),
    showNewMessage: content =>
      callIntercom('showNewMessage', ...(isValidType(String, content) ? [content] : [])),
    trackEvent: (name, ...metadata) =>
      callIntercom('trackEvent', ...[name, ...metadata]),
    startTour: (id, ...metadata) =>
      callIntercom('startTour', ...[id, ...metadata]),
    getVisitorId: () => callIntercom('getVisitorId'),
  };

  Object.defineProperties(
    intercom,
    mapInstanceToProps(vm, ['ready', 'visible', 'unreadCount'])
  );

  return intercom;
}

