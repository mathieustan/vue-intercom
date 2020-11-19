import Vue from 'vue';
import { mount, createLocalVue } from '@vue/test-utils';

import VueIntercom from '../../src';

const localVue = createLocalVue();
localVue.use(VueIntercom, { appId: null });

describe('Install', () => {
  let mountApp;
  const EmptyComponent = Vue.component('app', {
    template: '<div></div>',
  });

  beforeEach(() => {
    mountApp = () => mount(EmptyComponent, { localVue });
  });

  describe('Should throw', () => {
    it('when appId isn\'t defined', () => {
      const wrapper = mountApp({ appId: null });
      expect(wrapper.vm.$intercom).toEqual(undefined);
      expect(console.warn).toHaveBeenCalled();
    });
  });
});
