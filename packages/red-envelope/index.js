import RedEnvelope from './src/main';

/* istanbul ignore next */
RedEnvelope.install = function(Vue) {
  Vue.component(RedEnvelope.name, RedEnvelope);
};

export default RedEnvelope;
