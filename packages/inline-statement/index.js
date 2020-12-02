import InlineStatement from './src/main.js';

/* istanbul ignore next */
InlineStatement.install = function(Vue) {
  Vue.component(InlineStatement.name, InlineStatement);
};

export default InlineStatement;
