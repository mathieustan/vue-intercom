import * as loadScriptFn from '../src/utils/script';

jest.spyOn(loadScriptFn, 'loadIntercomScript')
  .mockImplementation((appId, done) => setTimeout(done, 25));

jest.spyOn(console, 'warn').mockReturnValue(true);
