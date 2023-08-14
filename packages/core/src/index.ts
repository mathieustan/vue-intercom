import { EventEmitter } from 'events';

// Helpers
import { loadAsyncScript, isValidString } from '@/utils';

// Constants
import { IN_BROWSER } from '@/constants';

// Types
import type { IntercomCommand, IntercomCommandSignature, IntercomSettings, IntercomArgs } from '@/types';

type IntercomAppId = string;
export type IntercomOptions = {
  appId?: IntercomAppId;
}

export default class Intercom extends EventEmitter {
  appId: IntercomAppId;
  defaultOptions: { app_id: IntercomAppId };
  ready: boolean;
  isBooted: boolean;
  visible: boolean;
  unreadCount: number;

  constructor ({ appId }: IntercomOptions = {}) {
    super ();

    if (!isValidString(appId)) {
      throw new Error('[Intercom] You didn\'t specified Intercom appId. Please check your configuration.');
    }

    this.appId = appId!;
    this.defaultOptions = { app_id: appId! };
    this.ready = false;
    this.isBooted = false;
    this.visible = false;
    this.unreadCount = 0;

    this.load();
  }

  // Load intercom script with defer
  load () {
    if (!IN_BROWSER) return;

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
  boot (options: IntercomSettings) {
    this.callIntercom('boot', Object.assign({}, this.defaultOptions, options));
    this.isBooted = true;
  }

  callIntercom<Command extends IntercomCommand> (
    command: Command,
    ...params: Parameters<IntercomCommandSignature[Command]>
  ): ReturnType<IntercomCommandSignature[Command]> | undefined {
    if (!window.Intercom) return;
    return window.Intercom(command, ...params);
  }

  shutdown () {
    this.isBooted = false;
    this.callIntercom('shutdown');
  }

  update (...options: IntercomArgs) { this.callIntercom('update', ...options); }

  show () { this.callIntercom('show'); }

  hide () { this.callIntercom('hide'); }

  showMessages () { this.callIntercom('showMessages'); }

  showNewMessage (content?: string) {
    this.callIntercom('showNewMessage', ...(isValidString(content) ? [content] : []));
  }

  startTour (id: number) { this.callIntercom('startTour', id); }

  showArticle (articleId: number) { this.callIntercom('showArticle', articleId); }

  showNews (newsItemId: number) { this.callIntercom('showNews', newsItemId); }

  getVisitorId () { this.callIntercom('getVisitorId'); }

  trackEvent (tag: string, ...metadata: any) { this.callIntercom('trackEvent', ...[tag, ...metadata]); }
}

export type IntercomInstance = InstanceType<typeof Intercom>;
