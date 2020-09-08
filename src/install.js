/* eslint-disable no-underscore-dangle */
import OurVue from 'vue';
import { initIntercom, loadIntercom } from './intercom';

// Helpers
import { isValidType } from './utils';

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

  const vueIntercom = initIntercom(Vue, { appId });
  Object.defineProperty(Vue.prototype, '$intercom', {
    get: () => vueIntercom,
  });

  // ---------------------------
  // Load Intercom
  // Instantiate $intercom in vue global wrapper
  // ---------------------------
  Vue.mixin({
    beforeCreate () {
      if (intercomInstalled) return;

      // CF => https://developers.intercom.com/installing-intercom/docs/basic-javascript
      if (typeof window.Intercom === 'function') {
        this.$intercom._init();
        this.$intercom._call('reattach_activator');
        this.$intercom.update();
      } else {
        const placeholder = (...args) => placeholder.c(args);
        placeholder.q = [];
        placeholder.c = args => placeholder.q.push(args);
        window.Intercom = placeholder;

        loadIntercom(appId, () => this.$intercom._init());
      }

      intercomInstalled = true;
    },
  });
}
