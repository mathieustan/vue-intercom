// Utilities
import { reactive, inject } from 'vue';
import Intercom from '@mathieustan/intercom';

// Types
import type { InjectionKey } from 'vue';
import type { IntercomInstance, IntercomOptions } from '@mathieustan/intercom';

export const IntercomSymbol: InjectionKey<IntercomInstance> = Symbol.for('vue-intercom');

export function initIntercom (options: IntercomOptions = {}): IntercomInstance | undefined {
  const { appId } = options;

  const intercom = reactive(new Intercom({ appId }));

  // CF => https://developers.intercom.com/installing-intercom/docs/basic-javascript
  if (typeof window.Intercom === 'function') {
    intercom.init();
    intercom.callIntercom('reattach_activator');
    intercom.update();
  } else {
    const placeholder = (...args) => placeholder.c(args);
    placeholder.q = [];
    placeholder.c = args => placeholder.q.push(args);
    window.Intercom = placeholder;
  }

  return intercom;
}

export function useIntercom () {
  const intercom = inject(IntercomSymbol);

  if (!intercom) throw new Error('[VueIntercom] Could not find intercom injection');

  return intercom;
}
