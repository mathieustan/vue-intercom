// Utilities
import { describe, expect, it } from '@jest/globals';
import { initIntercom } from '@/composables';

jest.useFakeTimers();

describe('Composables', () => {
  describe('initIntercom', () => {
    it('should throw an error when init Intercom without appId', () => {
      expect(
        () => initIntercom(),
      ).toThrowError('[Intercom] You didn\'t specified Intercom appId. Please check your configuration.');
    });

    it('should init Intercom with appId', () => {
      const intercom = initIntercom({ appId: 'fakeAppId' });
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
  });
});
