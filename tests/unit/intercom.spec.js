/* eslint-disable no-underscore-dangle */

import Vue from 'vue';
import { mount, createLocalVue } from '@vue/test-utils';

import VueIntercom from '../../src';

const localVue = createLocalVue();
localVue.use(VueIntercom, { appId: 'foobar' });

describe('Intercom plugin', () => {
  let mountApp;
  const EmptyComponent = Vue.component('app', {
    template: '<div></div>',
  });

  beforeEach(() => {
    mountApp = () => mount(EmptyComponent, { localVue });
  });

  describe('State', () => {
    it('has default initial state', () => {
      const wrapper = mountApp();
      expect(wrapper.vm.$intercom.ready).toEqual(false);
      expect(wrapper.vm.$intercom.isBooted).toEqual(false);
      expect(wrapper.vm.$intercom.visible).toEqual(false);
      expect(wrapper.vm.$intercom.unreadCount).toEqual(0);
    });

    it('sets ready indicator on load', (done) => {
      const wrapper = mountApp();

      window.dispatchEvent(new Event('load'));

      setTimeout(() => {
        wrapper.vm.$nextTick().then(() => {
          expect(wrapper.vm.$intercom.ready).toEqual(true);
          done();
        }).catch(done);
      }, 50);

    });

    it('exposes state changes through internal vm', () => {
      const wrapper = mountApp();

      wrapper.vm.$intercom._vm.visible = true;
      wrapper.vm.$intercom._vm.unreadCount = 1;

      expect(wrapper.vm.$intercom.visible).toEqual(true);
      expect(wrapper.vm.$intercom.unreadCount).toEqual(1);
    });
  });

  describe('Intercom javascript functions', () => {
    beforeEach(() => (window.Intercom = jest.fn()));
    afterEach(() => {
      jest.resetModules();
      jest.clearAllMocks();
    });

    describe('boot', () => {
      it('is called with an app_id attribute', () => {
        const wrapper = mountApp();

        wrapper.vm.$intercom.boot();

        expect(window.Intercom).toHaveBeenCalledTimes(1);
        expect(window.Intercom).toHaveBeenCalledWith('boot', { app_id: 'foobar' });
        expect(wrapper.vm.$intercom.isBooted).toEqual(true);

        const options = window.Intercom.mock.calls[0][1];
        expect(options.app_id).toEqual('foobar');
      });

      it('does not override app_id if defined by user', () => {
        const wrapper = mountApp();

        wrapper.vm.$intercom.boot({ app_id: 'lorem-ipsum' });

        expect(window.Intercom).toHaveBeenCalledTimes(1);
        expect(window.Intercom).toHaveBeenCalledWith('boot', { app_id: 'lorem-ipsum' });
        expect(wrapper.vm.$intercom.isBooted).toEqual(true);

        const options = window.Intercom.mock.calls[0][1];
        expect(options.app_id).toEqual('lorem-ipsum');
      });

      it('called with user-defined attributes', () => {
        const wrapper = mountApp();

        wrapper.vm.$intercom.boot({
          user_id: 123,
          name: 'Foo Bar',
        });

        expect(window.Intercom).toHaveBeenCalledTimes(1);
        expect(window.Intercom).toHaveBeenCalledWith('boot', {
          app_id: 'foobar',
          user_id: 123,
          name: 'Foo Bar',
        });
        expect(wrapper.vm.$intercom.isBooted).toEqual(true);

        const options = window.Intercom.mock.calls[0][1];
        expect(options.user_id).toEqual(123);
        expect(options.name).toEqual('Foo Bar');
      });
    });

    describe('shutdown', () => {
      it('shutdown', () => {
        const wrapper = mountApp();
        wrapper.vm.$intercom.shutdown();

        expect(window.Intercom).toHaveBeenCalledTimes(1);
        expect(window.Intercom).toHaveBeenCalledWith('shutdown');
      });
    });

    describe('update', () => {
      it('called with no attributes', () => {
        const wrapper = mountApp();
        wrapper.vm.$intercom.update();

        expect(window.Intercom).toHaveBeenCalledTimes(1);
        expect(window.Intercom).toHaveBeenCalledWith('update');
        expect(window.Intercom.mock.calls[0][1]).toEqual(undefined);
      });

      it('called with user-defined attributes', () => {
        const wrapper = mountApp();

        wrapper.vm.$intercom.update({
          name: 'Foo Bar',
          email: 'foo@bar.com',
        });

        expect(window.Intercom).toHaveBeenCalledTimes(1);
        expect(window.Intercom).toHaveBeenCalledWith('update', {
          name: 'Foo Bar',
          email: 'foo@bar.com',
        });
        const options = window.Intercom.mock.calls[0][1];
        expect(options.name).toEqual('Foo Bar');
        expect(options.email).toEqual('foo@bar.com');
      });
    });

    describe('show', () => {
      it('called', () => {
        const wrapper = mountApp();

        wrapper.vm.$intercom.show();
        expect(window.Intercom).toHaveBeenCalledTimes(1);
        expect(window.Intercom).toHaveBeenCalledWith('show');
      });
    });

    describe('hide', () => {
      it('called', () => {
        const wrapper = mountApp();
        wrapper.vm.$intercom.hide();

        expect(window.Intercom).toHaveBeenCalledTimes(1);
        expect(window.Intercom).toHaveBeenCalledWith('hide');
      });
    });

    describe('showMessages', () => {
      it('called', () => {
        const wrapper = mountApp();
        wrapper.vm.$intercom.showMessages();

        expect(window.Intercom).toHaveBeenCalledTimes(1);
        expect(window.Intercom).toHaveBeenCalledWith('showMessages');
      });
    });

    describe('showNewMessage', () => {
      it('called without pre-populated content', () => {
        const wrapper = mountApp();
        wrapper.vm.$intercom.showNewMessage();

        expect(window.Intercom).toHaveBeenCalledTimes(1);
        expect(window.Intercom).toHaveBeenCalledWith('showNewMessage');
      });

      it('called with pre-populated content', () => {
        const wrapper = mountApp();
        wrapper.vm.$intercom.showNewMessage('Foobar:');

        expect(window.Intercom).toHaveBeenCalledTimes(1);
        expect(window.Intercom).toHaveBeenCalledWith('showNewMessage', 'Foobar:');
      });

      it('called without content if content not a string', () => {
        const wrapper = mountApp();
        wrapper.vm.$intercom.showNewMessage({});

        expect(window.Intercom).toHaveBeenCalledTimes(1);
        expect(window.Intercom).toHaveBeenCalledWith('showNewMessage');
      });
    });

    describe('trackEvent', () => {
      it('called with event name', () => {
        const wrapper = mountApp();
        wrapper.vm.$intercom.trackEvent('foobar');

        expect(window.Intercom).toHaveBeenCalledTimes(1);
        expect(window.Intercom).toHaveBeenCalledWith('trackEvent', 'foobar');
      });

      it('called with event name and meta data', () => {
        const wrapper = mountApp();

        wrapper.vm.$intercom.trackEvent('foobar', {
          foo: 'foo',
          bar: 'bar',
        });

        expect(window.Intercom).toHaveBeenCalledTimes(1);
        expect(window.Intercom).toHaveBeenCalledWith('trackEvent', 'foobar', {
          foo: 'foo',
          bar: 'bar',
        });

        const options = window.Intercom.mock.calls[0][2];
        expect(options.foo).toEqual('foo');
        expect(options.bar).toEqual('bar');
      });
    });

    describe('startTour', () => {
      it('called with event name', () => {
        const wrapper = mountApp();
        wrapper.vm.$intercom.startTour('foobar');

        expect(window.Intercom).toHaveBeenCalledTimes(1);
        expect(window.Intercom).toHaveBeenCalledWith('startTour', 'foobar');
      });

      it('called with event name and meta data', () => {
        const wrapper = mountApp();

        wrapper.vm.$intercom.startTour('foobar', {
          foo: 'foo',
          bar: 'bar',
        });

        expect(window.Intercom).toHaveBeenCalledTimes(1);
        expect(window.Intercom).toHaveBeenCalledWith('startTour', 'foobar', {
          foo: 'foo',
          bar: 'bar',
        });

        const options = window.Intercom.mock.calls[0][2];
        expect(options.foo).toEqual('foo');
        expect(options.bar).toEqual('bar');
      });
    });

    describe('getVisitorId', () => {
      it('called', () => {
        const wrapper = mountApp();
        wrapper.vm.$intercom.getVisitorId();

        expect(window.Intercom).toHaveBeenCalledTimes(1);
        expect(window.Intercom).toHaveBeenCalledWith('getVisitorId');
      });
    });
  });
});
