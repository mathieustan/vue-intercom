// Utilities
import viteSSR from 'vite-ssr/vue';

// Components
import App from './App.vue';

// Plugins
import intercom from './plugins/vue-intercom';

export default viteSSR(App, {
  routes: [],
}, ({ app }) => {
  // app.config.performance = true
  app.use(intercom);
});
