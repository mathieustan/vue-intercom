/* eslint-disable no-underscore-dangle */

// Helpers
import {
  callIntercom,
  onBoot,
  onInit,
} from './helpers';
import {
  isValidType,
  mapInstanceToProps,
} from '../utils';

// Thanks to https://github.com/johnnynotsolucky/vue-intercom/blob/master/src/index.js
export default function initIntercom (Vue, { appId }) {
  const vm = new Vue({
    data: () => ({
      ready: false,
      visible: false,
      unreadCount: 0,
    }),
  });

  const intercom = { _vm: vm };

  Object.defineProperties(
    intercom,
    mapInstanceToProps(vm, ['ready', 'visible', 'unreadCount'])
  );

  // Init intercom attributes
  intercom._call = callIntercom;
  intercom._init = () => onInit(vm);
  intercom.boot = (options = {}) => onBoot(options, appId);
  intercom.shutdown = () => callIntercom('shutdown');
  intercom.update = (...options) => callIntercom('update', ...options);
  intercom.show = () => callIntercom('show');
  intercom.hide = () => callIntercom('hide');
  intercom.showMessages = () => callIntercom('showMessages');
  intercom.showNewMessage = content =>
    callIntercom('showNewMessage', ...(isValidType(String, content) ? [content] : []));
  intercom.trackEvent = (name, ...metadata) =>
    callIntercom('trackEvent', ...[name, ...metadata]);
  intercom.startTour = (id, ...metadata) =>
    callIntercom('startTour', ...[id, ...metadata]);
  intercom.getVisitorId = () => callIntercom('getVisitorId');

  return intercom;
}

