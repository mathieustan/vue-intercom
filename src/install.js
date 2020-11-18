/* eslint-disable no-underscore-dangle */
import OurVue from 'vue';

// Lib
import Intercom from './lib';

// Helpers
import {
  isValidType,
} from './utils';

let intercomInstalled = false;

export function install (Vue, options = {}) {
  if (OurVue !== Vue) console.error(`Multiple instances of Vue detected.`);

  // ---------------------------
  // Init vueIntercom
  // ---------------------------
  const { appId } = options;

  if (!isValidType(String, appId)) {
    console.warn('You didn\'t specified Intercom appId. Please check your configuration.');
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
      if (typeof window.Intercom === 'function' && this.$intercom) {
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

        await this.$intercom.load();
        this.$intercom.init();
      }

      intercomInstalled = true;
    },
  });
}
