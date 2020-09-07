<template>
  <!-- eslint-disable max-len -->
  <!-- eslint-disable vue/valid-v-for -->
  <div id="app">
    <Header />

    <div class="content">
      <div class="content-inner">
        <section id="section__about">
          <div class="title">
            <h2> About </h2>
          </div>
          <p>
            A wrapper to handle Intercom inside a vue app.
          </p>
        </section>

        <section id="section__install">
          <div class="title">
            <h2> Install </h2>
          </div>
          <p> 1. Install component </p>
          <CodeWrapper type="bash" :source="snippets.install" />

          <p> 2. Load component in your project </p>
          <CodeWrapper type="javascript" :source="snippets.load" />

          <p> 3. Usage </p>
          <p>
            <code>vue-intercom</code> handles the injection of Intercom's script into your
            html and wraps calls to the Intercom API with methods and exposes
            them through the <code>$intercom</code> object in your components.
          </p>
          <CodeWrapper type="javascript" :source="snippets.usage" />
        </section>
      </div>
    </div>
  </div>
</template>

<script>
// Mixins
import snippets from '@/mixins/snippets';

// Components
import CodeWrapper from '@/components/CodeWrapper.vue';
import Header from '@/components/Header.vue';

import './styles/main.scss';

export default {
  name: 'App',
  mixins: [snippets],
  components: {
    CodeWrapper,
    Header,
  },
  data: () => ({
    snippets: {},
  }),
  async mounted() {
    const snippets = [
      { folder: 'howTo', filename: 'install' },
      { folder: 'howTo', filename: 'load' },
      { folder: 'howTo', filename: 'usage' },
    ];
    this.snippets = await this.importSnippets(snippets);
  },
};
</script>

<style lang="scss" scoped>
  @import './styles/abstracts/_index.scss';

  #app {
    flex: 1 1 auto;
    backface-visibility: hidden;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    max-width: 100%;
    position: relative;
  }

  .content {
    display: flex;
    flex: 1 1 auto;
    font-size: 1em;
    line-height: 1.62;
    color: #3b454e;

    @include mq('md') {
      font-size: 1.125em;
    }

    &-inner {
      position: relative;
      margin: 0 auto;
      max-width: 1000px;
      width: 100%;
      display: flex;
      flex-direction: column;
      text-align: left;
      padding: 12px;
    }

    &-title {
      position: relative;
      display: flex;
      justify-content: flex-start;

      h2 {
        display: flex;
        font-size: 2.5rem;
        line-height: 1;
        color: #121212;
        position: relative;
        margin-top: $gutter*6;
        font-size: 1.875rem;

        @include mq('md') {
          font-size: 37px;
        }

        &:first-child {
          margin-top: 40px;
        }

        &:before {
          content: "";
          position: absolute;
          top: calc(100% - #{$gutter});
          left: -#{$gutter};
          background-color: transparentize(color(other, aqua-marine), .7);
          height: $gutter;
          width: calc(100% + #{$gutter*2});
        }
      }
    }
  }
</style>
