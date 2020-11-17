import Vue from 'vue';
import VueIntercom from '../../../';

const appId = process.env.VUE_APP_INTERCOM_APP_ID;

Vue.use(VueIntercom, { appId });
