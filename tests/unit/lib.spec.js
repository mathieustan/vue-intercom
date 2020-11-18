import Intercom from '@/lib';

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

    it('should load intercom script & resolve promise when done', async () => {
      const onload = jest.fn();
      const script = { onload };

      Object.defineProperties(global.document, {
        getElementsByTagName: {
          value: () => [{ parentNode: { insertBefore: jest.fn(() => script.onload()) } }],
        },
        createElement: {
          get: () => () => script,
        },
      });

      const intercom = new Intercom({ appId: 'fakeAppId' });

      expect(intercom._eventsCount).toEqual(1);
      await intercom.load();
      expect(intercom._eventsCount).toEqual(0);
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

});
