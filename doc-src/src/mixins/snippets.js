/* eslint-disable */

const camelizeRE = /-(\w)/g;
function camelize(str = '') {
  return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : '');
}

export default {
  methods: {
    importSnippets(snippets) {
      const promises = snippets.map(snippet => this.importSnippet(snippet));
      return Promise.all(promises).then(result => this.formattedSnippets(result));
    },
    importSnippet({ folder, filename }) {
      return import(
        /* webpackChunkName: "examples-source" */
        /* webpackMode: "lazy-once" */
        `!raw-loader!../snippets/${folder}/${filename}.txt`
      ).then(file => ({ value: file.default, filename }));
    },
    formattedSnippets(snippets) {
      return snippets.reduce((result, snippet) => ({
        ...result,
        [camelize(snippet.filename)]: snippet.value,
      }), {});
    },
  },
};
