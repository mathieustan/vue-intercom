// Utilities
import { createIntercom } from '@mathieustan/vue-intercom';

export const APP_ID = import.meta.env.VITE_INTERCOM_APP_ID;

export default createIntercom({
  appId: APP_ID,
});

