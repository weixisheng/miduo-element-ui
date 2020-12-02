import Editor from './src/main.js';

/* istanbul ignore next */
Editor.install = function(Vue) {
  Vue.component(Editor.name, Editor);
};

export default Editor;
