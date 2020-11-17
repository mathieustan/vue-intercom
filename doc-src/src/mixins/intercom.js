const intercom = {
  name: 'Intercom',
  computed: {
    isIntercomLoaded() {
      return this.$intercom.ready;
    },
    isIntercomInitialized() {
      return this.$intercom.isBooted;
    },
    isIntercomVisible() {
      return this.$intercom.visible;
    },
  },
  methods: {
    generateUserInfos({ name, email, _id: userId }) {
      return {
        name,
        email,
        user_id: userId,
      };
    },
    bootIntercom(user) {
      this.$intercom.boot(this.generateUserInfos(user));
    },
    shutdownIntercom() {
      this.$intercom.shutdown();
    },
    showIntercom() {
      this.$intercom.show();
    },
    hideIntercom() {
      this.$intercom.hide();
    },
    updateIntercom(...args) {
      this.$intercom.update(...args);
    },
    trackEventIntercom(...args) {
      this.$intercom.trackEvent(...args);
    },
  },
};

export default intercom;
