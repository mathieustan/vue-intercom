import Intercom from '@/index';

// Utilities
import * as loadScriptFn from '@/utils/file';

jest.useFakeTimers();

describe('Intercom: Class', () => {
  beforeEach(() => {
    jest.spyOn(loadScriptFn, 'loadAsyncScript').mockImplementation((appId, done) => setTimeout(done, 25));
    jest.spyOn(console, 'warn').mockReturnValue(true);
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  describe('Intercom', () => {
    it('should throw an error when init Intercom without appId', () => {
      expect(
        () => new Intercom(),
      ).toThrowError('[Intercom] You didn\'t specified Intercom appId. Please check your configuration.');
    });

    it('should init Intercom with appId', () => {
      const intercom = new Intercom({ appId: 'fakeAppId' });
      expect(intercom).toEqual(
        expect.objectContaining({
          appId: 'fakeAppId',
          defaultOptions: { app_id: 'fakeAppId' },
          ready: false,
          isBooted: false,
          visible: false,
          unreadCount: 0,
        }),
      );
    });

    it('should load intercom script and init', () => {
      const intercom = new Intercom({ appId: 'fakeAppId' });
      jest.spyOn(intercom, 'init');

      intercom.load();
      expect(loadScriptFn.loadAsyncScript).toHaveBeenCalledWith('fakeAppId', expect.any(Function));

      window.dispatchEvent(new Event('load'));
      jest.runOnlyPendingTimers();

      expect(intercom.init).toHaveBeenCalled();
      expect(intercom.ready).toEqual(true);
    });

    it('should init intercom listeners (onShow, onHide, onUnreadCountChange)', () => {
      global.Intercom = jest.fn();

      const intercom = new Intercom({ appId: 'fakeAppId' });
      expect(intercom.ready).toEqual(false);
      expect(intercom.visible).toEqual(false);

      intercom.init();
      expect(intercom.ready).toEqual(true);
      expect(global.Intercom).toHaveBeenCalledWith('onHide', expect.any(Function));
      expect(global.Intercom).toHaveBeenCalledWith('onShow', expect.any(Function));
      expect(global.Intercom).toHaveBeenCalledWith('onUnreadCountChange', expect.any(Function));

      const onHide = global.Intercom.mock.calls[0][1];
      const onShow = global.Intercom.mock.calls[1][1];
      const onUnreadCountChange = global.Intercom.mock.calls[2][1];

      onShow();
      expect(intercom.visible).toEqual(true);
      onHide();
      expect(intercom.visible).toEqual(false);
      onUnreadCountChange(2);
      expect(intercom.unreadCount).toEqual(2);
    });

    describe('Intercom methods', () => {
      describe('boot', () => {
        it('is called with an app_id attribute', () => {
          const intercom = new Intercom({ appId: 'fakeAppId' });

          intercom.boot();

          expect(window.Intercom).toHaveBeenCalledTimes(1);
          expect(window.Intercom).toHaveBeenCalledWith('boot', { app_id: 'fakeAppId' });
          expect(intercom.isBooted).toEqual(true);

          const options = window.Intercom.mock.calls[0][1];
          expect(options.app_id).toEqual('fakeAppId');
        });

        it('does not override app_id if defined by user', () => {
          const intercom = new Intercom({ appId: 'fakeAppId' });

          intercom.boot({ app_id: 'lorem-ipsum' });

          expect(window.Intercom).toHaveBeenCalledTimes(1);
          expect(window.Intercom).toHaveBeenCalledWith('boot', { app_id: 'lorem-ipsum' });
          expect(intercom.isBooted).toEqual(true);

          const options = window.Intercom.mock.calls[0][1];
          expect(options.app_id).toEqual('lorem-ipsum');
        });

        it('called with user-defined attributes', () => {
          const intercom = new Intercom({ appId: 'fakeAppId' });

          intercom.boot({
            user_id: 123,
            name: 'Foo Bar',
          });

          expect(window.Intercom).toHaveBeenCalledTimes(1);
          expect(window.Intercom).toHaveBeenCalledWith('boot', {
            app_id: 'fakeAppId',
            user_id: 123,
            name: 'Foo Bar',
          });
          expect(intercom.isBooted).toEqual(true);

          const options = window.Intercom.mock.calls[0][1];
          expect(options.user_id).toEqual(123);
          expect(options.name).toEqual('Foo Bar');
        });
      });

      describe('shutdown', () => {
        it('shutdown', () => {
          const intercom = new Intercom({ appId: 'fakeAppId' });

          intercom.isBooted = true;

          intercom.shutdown();

          expect(window.Intercom).toHaveBeenCalledTimes(1);
          expect(window.Intercom).toHaveBeenCalledWith('shutdown');
          expect(intercom.isBooted).toEqual(false);
        });
      });

      describe('update', () => {
        it('called with no attributes', () => {
          const intercom = new Intercom({ appId: 'fakeAppId' });
          intercom.update();

          expect(window.Intercom).toHaveBeenCalledTimes(1);
          expect(window.Intercom).toHaveBeenCalledWith('update');
          expect(window.Intercom.mock.calls[0][1]).toEqual(undefined);
        });

        it('called with user-defined attributes', () => {
          const intercom = new Intercom({ appId: 'fakeAppId' });

          intercom.update({
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
          const intercom = new Intercom({ appId: 'fakeAppId' });

          intercom.show();
          expect(window.Intercom).toHaveBeenCalledTimes(1);
          expect(window.Intercom).toHaveBeenCalledWith('show');
        });
      });

      describe('hide', () => {
        it('called', () => {
          const intercom = new Intercom({ appId: 'fakeAppId' });
          intercom.hide();

          expect(window.Intercom).toHaveBeenCalledTimes(1);
          expect(window.Intercom).toHaveBeenCalledWith('hide');
        });
      });

      describe('showMessages', () => {
        it('called', () => {
          const intercom = new Intercom({ appId: 'fakeAppId' });
          intercom.showMessages();

          expect(window.Intercom).toHaveBeenCalledTimes(1);
          expect(window.Intercom).toHaveBeenCalledWith('showMessages');
        });
      });

      describe('showNewMessage', () => {
        it('called without pre-populated content', () => {
          const intercom = new Intercom({ appId: 'fakeAppId' });
          intercom.showNewMessage();

          expect(window.Intercom).toHaveBeenCalledTimes(1);
          expect(window.Intercom).toHaveBeenCalledWith('showNewMessage');
        });

        it('called with pre-populated content', () => {
          const intercom = new Intercom({ appId: 'fakeAppId' });
          intercom.showNewMessage('Foobar:');

          expect(window.Intercom).toHaveBeenCalledTimes(1);
          expect(window.Intercom).toHaveBeenCalledWith('showNewMessage', 'Foobar:');
        });

        it('called without content if content not a string', () => {
          const intercom = new Intercom({ appId: 'fakeAppId' });
          intercom.showNewMessage({});

          expect(window.Intercom).toHaveBeenCalledTimes(1);
          expect(window.Intercom).toHaveBeenCalledWith('showNewMessage');
        });
      });

      describe('trackEvent', () => {
        it('called with event name', () => {
          const intercom = new Intercom({ appId: 'fakeAppId' });
          intercom.trackEvent('foobar');

          expect(window.Intercom).toHaveBeenCalledTimes(1);
          expect(window.Intercom).toHaveBeenCalledWith('trackEvent', 'foobar');
        });

        it('called with event name and meta data', () => {
          const intercom = new Intercom({ appId: 'fakeAppId' });

          intercom.trackEvent('foobar', {
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
        it('called with tourId', () => {
          const intercom = new Intercom({ appId: 'fakeAppId' });
          intercom.startTour(123);

          expect(window.Intercom).toHaveBeenCalledTimes(1);
          expect(window.Intercom).toHaveBeenCalledWith('startTour', 123);
        });
      });

      describe('getVisitorId', () => {
        it('called', () => {
          const intercom = new Intercom({ appId: 'fakeAppId' });
          intercom.getVisitorId();

          expect(window.Intercom).toHaveBeenCalledTimes(1);
          expect(window.Intercom).toHaveBeenCalledWith('getVisitorId');
        });
      });
    });
  });

  it('should Boot Intercom', () => {
    global.Intercom = jest.fn();

    const intercom = new Intercom({ appId: 'fakeAppId' });
    expect(intercom.isBooted).toEqual(false);

    intercom.boot();
    expect(intercom.isBooted).toEqual(true);
    expect(global.Intercom).toHaveBeenCalledWith('boot', { app_id: 'fakeAppId' });
  });

  it('should Shutdown Intercom', () => {
    global.Intercom = jest.fn();

    const intercom = new Intercom({ appId: 'fakeAppId' });
    expect(intercom.isBooted).toEqual(false);

    intercom.boot();
    expect(intercom.isBooted).toEqual(true);
    expect(global.Intercom).toHaveBeenCalledWith('boot', { app_id: 'fakeAppId' });

    intercom.shutdown();
    expect(intercom.isBooted).toEqual(false);
    expect(global.Intercom).toHaveBeenCalledWith('shutdown');
  });
});
