// Composables
import { initIntercom, IntercomSymbol } from '@/composables';

// Types
import type { App } from 'vue';
import type { IntercomOptions } from '@mathieustan/intercom';

export * from './composables';

export function createIntercom (options: IntercomOptions) {
  const intercom = initIntercom(options ?? {});

  const install = (app: App) => {
    app.provide(IntercomSymbol, intercom);
    app.config.globalProperties.$intercom = intercom;

    app.mixin({
      computed: {
        $intercom () {
          return intercom;
        },
      },
    });
  };

  return {
    install,
    intercom,
  };
}

export const version = __VERSION__;
createIntercom.version = version;
