import Intercom from '@/lib';

import * as loadScriptFn from '@/utils/file';

jest.useFakeTimers();

describe('Intercom: Class', () => {
  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  describe('Intercom', () => {
    it('should fail to init Intercom without appId', () => {
      const intercom = new Intercom();
      expect(intercom).toEqual(
        expect.not.objectContaining({
          appId: undefined,
          defaultOptions: { app_id: undefined },
          ready: false,
          isBooted: false,
          visible: false,
          unreadCount: 0,
        })
      );
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
        })
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
