# vue-intercom

> - version < 1.0.0 is for Vue2
> - version >= 1.0.0 is for Vue3

## Vue3

### Install

```bash
npm install --save @mathieustan/vue-intercom

or

yarn add @mathieustan/vue-intercom
```

```javascript
import { createApp } from 'vue';
import { createIntercom } from '@mathieustan/vue-intercom';

const app = createApp(/**/);
const intercom = createIntercom({ appId: 'your-app-id' });
app.use(intercom);
```

### useIntercom

Inside a setup, you can easily use `useIntercom` to manage intercom.

```ts
<script setup lang="ts">
import { shallowRef, onBeforeMount, watch } from 'vue';
import { useIntercom } from '@mathieustan/vue-intercom';

const userId = shallowRef('id');
const name = shallowRef('name');
const email = shallowRef('email');

const intercom = useIntercom();

onBeforeMount(() => {
  intercom.shutdown();
  intercom.once('ready', bootIntercom);
});

watch(email, (newEmail) => {
  intercom.update({ email: newEmail });
});

function bootIntercom() {
  intercom.boot({
    user_id: userId.value,
    name: name.value,
    email: email.value,
  });
  intercom.show();
}
</script>
```

### $intercom

`vue-intercom` handles the injection of Intercom's script into your html and wraps calls to the Intercom API with methods and exposes them through the `$intercom` object in your components.

```javascript
new Vue({
  el: '#app',
  data: () => ({
    userId: 1,
    name: 'Foo Bar',
    email: 'foo@bar.com',
  }),
  created() {
    this.$intercom.shutdown();
    this.$intercom.once('ready', this.bootIntercom);
  },
  watch: {
    email(email) {
      this.$intercom.update({ email });
    },
  },
  methods: {
    bootIntercom() {
      this.$intercom.boot({
        user_id: this.userId,
        name: this.name,
        email: this.email,
      });
      this.$intercom.show();
    },
  },
});
```

## Service

You can also use Intercom as a service if you don't want to use it inside components.

### Install

```bash
npm install --save @mathieustan/intercom

or

yarn add @mathieustan/intercom
```

### Usage

```javascript
import Intercom from '@mathieustan/intercom';

const appId = 'fakeAppId';

const intercom = new Intercom({ appId });

function startIntercomMessenger (user) {
  if (!intercom.ready) {
    intercom.once('ready', () => rebootIntercom(user));
  } else {
    rebootIntercom(user);
  }
}

function rebootIntercom () {
  intercom.shutdown();

  if (intercom.isBooted) return;
  intercom.boot(user);
}
```

You'll have access to same methods as with `$intercom`

## API

### Values

#### `$intercom.ready`

Set to `true` once the Intercom script has been loaded.

#### `$intercom.isBooted`

Set to `true` once the Intercom boot method has been called.

#### `$intercom.visible`

Set via the `onShow`/`onHide` events.

#### `$intercom.unreadCount`

Set via the `onUnreadCountChange` event.

### Methods

#### `$intercom.boot(/* optional */options)`

Calls `Intercom('boot')`. Automatically sets the `app_id` unless specified in the options object.

#### `$intercom.shutdown()`

Calls `Intercom('shutdown')`.

#### `$intercom.update(/* optional */options)`

Calls `Intercom('update')`. If the options object is set, calls `Intercom('update', options)`

#### `$intercom.show()`

Calls `Intercom('show')`.

#### `$intercom.hide()`

Calls `Intercom('hide')`.

#### `$intercom.showMessages()`

Calls `Intercom('showMessages')`.

#### `$intercom.showNewMessage(/* optional */content)`

Calls `Intercom('showNewMessage')` with pre-populated content if provided.

#### `$intercom.trackEvent(name, /* optional */metadata)`

Calls `Intercom('trackEvent')` with extra metadata if provided.

#### `$intercom.startTour(name, /* optional */metadata)`

Calls `Intercom('startTour')` with extra metadata if provided.

#### `$intercom.getVisitorId()`

Calls `Intercom('getVisitorId')`.

## Test intercom integration locally

Requires npm 12+

First, clone project & install doc dependencies :

```bash
git clone git@github.com:mathieustan/vue-intercom.git
cd vue-intercom
yarn build
```

Then, you need to set your `VUE_APP_INTERCOM_APP_ID` inside `.env` file.

Finally, start project :

```bash
yarn dev vue
```

You'll be able to test from this url : <http://localhost:5173>
