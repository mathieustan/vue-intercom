import { EventEmitter } from 'events';

// Helpers
import { loadAsyncScript } from '../utils/file';
import { isValidType } from '../utils';

export default class Intercom extends EventEmitter {
  constructor ({ appId } = {}) {
    super();

    this.appId = appId;
    this.defaultOptions = { app_id: appId };
    this.ready = false;
    this.isBooted = false;
    this.visible = false;
    this.unreadCount = 0;

    this._call = this.callIntercom;
    this._load = this.load;
    this._init = this.init;
    this._ready = new Promise(resolve => this.once('ready', resolve));
  }

  // Load intercom script with defer
  async load (appId) {
    if (!window || !document) return;

    const load = () => loadAsyncScript(appId, this);

    if (document.readyState === 'complete') loadAsyncScript(appId, this);
    else if (window.attachEvent) window.attachEvent('onload', load);
    else window.addEventListener('load', load, false);

    return this._ready;
  }

  // Init Intercom service
  init () {
    this.ready = true;
    this._call('onHide', () => (this.visible = false));
    this._call('onShow', () => (this.visible = true));
    this._call('onUnreadCountChange', unreadCount => (this.unreadCount = unreadCount));

    this.emit('ready');
  }

  // Boot Intercom service with user
  boot (options) {
    this.isBooted = true;
    this._call('boot', Object.assign({}, this.defaultOptions, options));
  }

  callIntercom (...args) {
    if (!window.Intercom) return;
    return window.Intercom(...args);
  }

  shutdown () {
    this.isBooted = false;
    this._call('shutdown');
  }

  update (...options) { this._call('update', ...options); }

  show () { this._call('show'); }

  hide () { this._call('hide'); }

  showMessages () { this._call('showMessages'); }

  showNewMessage (content) {
    this._call('showNewMessage', ...(isValidType(String, content) ? [content] : []));
  }

  trackEvent (name, ...metadata) { this._call('trackEvent', ...[name, ...metadata]); }

  startTour (id, ...metadata) { this._call('startTour', ...[id, ...metadata]); }

  getVisitorId () { this._call('getVisitorId'); }
}
