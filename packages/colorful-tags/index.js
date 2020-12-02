import ColorfulTags from './src/main';

/* istanbul ignore next */
ColorfulTags.install = function(Vue) {
  Vue.component(ColorfulTags.name, ColorfulTags);
};

export default ColorfulTags;
