import Intercom from './lib';
import VueIntercom from './plugin';

export default VueIntercom;

export {
  Intercom,
};

const install = VueIntercom.install;
VueIntercom.install = (Vue, options) => {
  install.call(VueIntercom, Vue, {
    ...options,
  });
};

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(VueIntercom);
}
