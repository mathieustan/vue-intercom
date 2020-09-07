/* globals VERSION */
import { install } from './install';

const VueIntercom = {
  version: process.env.NODE_ENV === 'test' ? 'v1' : VERSION,
  install,
};

export default VueIntercom;
