import Vue from 'vue';
import VueIntercom from '../src';

import * as loadScriptFn from '../src/utils/script';

jest.spyOn(loadScriptFn, 'loadIntercomScript')
  .mockImplementation((appId, done) => setTimeout(done, 25));

Vue.use(VueIntercom, { appId: 'foobar' });
