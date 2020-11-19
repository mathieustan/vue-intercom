import * as loadScriptFn from '@/utils/file';

jest.spyOn(loadScriptFn, 'loadAsyncScript').mockImplementation((appId, done) => setTimeout(done, 25));
jest.spyOn(console, 'warn').mockReturnValue(true);
