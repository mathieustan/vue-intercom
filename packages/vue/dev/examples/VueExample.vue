<template>
  <section>
    <div class="d-flex flex-column m-t-16">
      <label for="userId">
        <input id="userId" v-model="user._id" type="text">
        <span>User Id :</span>
      </label>
    </div>

    <div class="d-flex flex-column m-t-16">
      <label for="userName">
        <input id="userName" v-model="user.name" type="text">
        <span>User Name :</span>
      </label>
    </div>

    <div class="d-flex flex-column m-t-16">
      <label for="userEmail">
        <input id="userEmail" v-model="user.email" type="text">
        <span>User Email :</span>
      </label>
    </div>

    <div class="d-flex flex-row m-t-16">
      <button class="m-r-8" @click="bootIntercom(user)">
        Boot
      </button>
      <button class="m-r-8" @click="shutdownIntercom">
        Shutdown
      </button>
      <button class="m-r-8" @click="hideIntercom">
        Hide
      </button>
      <button class="m-r-8" @click="showIntercom">
        Show
      </button>
    </div>

    <p>isLoaded : {{ intercom.ready }}</p>
    <p>isInitialized : {{ intercom.isBooted }}</p>
    <p>Visible : {{ intercom.visible }}</p>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import { useIntercom } from '@mathieustan/vue-intercom';

const user = ref({
  _id: import.meta.env.VITE_INTERCOM_USER_ID,
  name: import.meta.env.VITE_INTERCOM_USER_NAME,
  email: import.meta.env.VITE_INTERCOM_USER_EMAIL,
  hash: import.meta.env.VITE_INTERCOM_USER_HASH,
});

const intercom = useIntercom();

function generateUserInfos (user) {
  if (!user._id || !user.name || !user.email) return { anonymous: true };

  return {
    name: user.name,
    email: user.email,
    user_id: user._id,
    user_hash: user.hash,
  };
}

function bootIntercom (user) {
  intercom.boot(generateUserInfos(user));
}

function shutdownIntercom () {
  intercom.shutdown();
}

function showIntercom () {
  intercom.show();
}

function hideIntercom () {
  intercom.hide();
}
</script>

<style lang="scss" scoped>
.d-flex {
  display: flex;
}
.flex-column {
  flex-direction: column;
}
.flex-row {
  flex-direction: row;
}

.m-t-16 {
  margin-top: 16px;
}
.m-r-8 {
  margin-right: 8px;
}
</style>
