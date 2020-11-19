/* eslint-disable no-underscore-dangle */
import OurVue from 'vue';

// Lib
import Intercom from './lib';

// Helpers
import { isValidString } from './utils';
import { consoleWarn, consoleError } from './utils/console';

let intercomInstalled = false;

export function install (Vue, options = {}) {
  if (OurVue !== Vue) consoleError(`Multiple instances of Vue detected.`);

  // ---------------------------
  // Init vueIntercom
  // ---------------------------
  const { appId } = options;

  if (!isValidString(String, appId)) {
    consoleWarn('You didn\'t specified Intercom appId. Please check your configuration.');
    return;
  }

  const intercom = new Intercom({ appId });

  // ---------------------------
  // Load Intercom
  // Instantiate $intercom in vue global wrapper
  // ---------------------------
  Vue.mixin({
    async beforeCreate () {
      if (intercomInstalled) return;

      // CF => https://developers.intercom.com/installing-intercom/docs/basic-javascript
      if (typeof window.Intercom === 'function') {
        this.$intercom.init();
        this.$intercom.callIntercom('reattach_activator');
        this.$intercom.update();
      } else {
        const placeholder = (...args) => placeholder.c(args);
        placeholder.q = [];
        placeholder.c = args => placeholder.q.push(args);
        window.Intercom = placeholder;

        this.$intercom = Vue.observable(intercom);
        Vue.prototype.$intercom = this.$intercom;
      }

      intercomInstalled = true;
    },
  });
}
