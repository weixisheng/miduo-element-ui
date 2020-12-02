export default {
  props: {
    canvasFont: {
      type: String,
      default: '400 14px "Microsoft YaHei"'
    }
  },
  data() {
    return {
      canvasContext: null
    };
  },
  methods: {
    measureText(text) {
      if (!this.$data.canvasContext) {
        this.$data.canvasContext = document.createElement('canvas').getContext('2d');
      }

      this.$data.canvasContext.font = this.$props.canvasFont;

      return this.$data.canvasContext.measureText(text).width;
    }
  }
};
