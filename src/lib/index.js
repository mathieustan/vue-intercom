import { EventEmitter } from 'events';

// Helpers
import { loadAsyncScript } from '../utils/file';
import { isValidString } from '../utils';

export default class Intercom extends EventEmitter {
  constructor ({ appId } = {}) {
    super();

    if (!isValidString(String, appId)) return;

    this.appId = appId;
    this.defaultOptions = { app_id: appId };
    this.ready = false;
    this.isBooted = false;
    this.visible = false;
    this.unreadCount = 0;

    this.load();
  }

  // Load intercom script with defer
  load () {
    if (!window || !document) return;

    const load = () => loadAsyncScript(this.appId, () => this.init());

    if (document.readyState === 'complete') loadAsyncScript(this.appId, () => this.init());
    else if (window.attachEvent) window.attachEvent('onload', load);
    else window.addEventListener('load', load, false);
  }

  // Init Intercom service
  init () {
    this.ready = true;
    this.callIntercom('onHide', () => (this.visible = false));
    this.callIntercom('onShow', () => (this.visible = true));
    this.callIntercom('onUnreadCountChange', unreadCount => (this.unreadCount = unreadCount));

    this.emit('ready');
  }

  // Boot Intercom service with user
  boot (options) {
    this.callIntercom('boot', Object.assign({}, this.defaultOptions, options));
    this.isBooted = true;
  }

  callIntercom (...args) {
    if (!window.Intercom) return;
    return window.Intercom(...args);
  }

  shutdown () {
    this.isBooted = false;
    this.callIntercom('shutdown');
  }

  update (...options) { this.callIntercom('update', ...options); }

  show () { this.callIntercom('show'); }

  hide () { this.callIntercom('hide'); }

  showMessages () { this.callIntercom('showMessages'); }

  showNewMessage (content) {
    this.callIntercom('showNewMessage', ...(isValidString(String, content) ? [content] : []));
  }

  trackEvent (name, ...metadata) { this.callIntercom('trackEvent', ...[name, ...metadata]); }

  startTour (id, ...metadata) { this.callIntercom('startTour', ...[id, ...metadata]); }

  getVisitorId () { this.callIntercom('getVisitorId'); }
}
