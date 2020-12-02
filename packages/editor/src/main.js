import 'tinymce/tinymce';
import 'tinymce/themes/silver/theme';
import 'tinymce/icons/default/icons.js';
import Editor from '@tinymce/tinymce-vue';
import GalleryPlugin from './plugins/gallery/plugin';
import Gallery from 'miduo-element-ui/packages/gallery/index';

export default {
  defaultEditorConfiguration: {
    disabled: false,
    plugins: 'link lists image imagetools code table wordcount gallery',
    toolbar: [
      'bold italic  underline strikethrough',
      'fontsizeselect',
      'forecolor backcolor',
      'alignleft aligncenter alignright alignjustify',
      'bullist numlist',
      'outdent indent blockquote',
      'undo redo',
      'link unlink image code',
      'removeformat',
      'gallery'
    ].join('|'),
    init: {
      height: 300,
      branding: false,
      menubar: false,
      contextmenu: 'link image imagetools table spellchecker gallery',
      skin: false,
      content_css: false
    }
  },
  name: 'ElEditor',

  props: {
    value: String,
    editor: Object,
    gallery: Object,
    showDefaultGalleryComponent: {
      type: Boolean,
      default: true
    }
  },

  created() {
    this.mergeProps2Data();
    this.dynamicImportEditorPlugin();
  },

  data() {
    return {
      editorConfiguration: {},
      visible: false,
      needInstallGallery: false
    };
  },

  methods: {
    mergeProps2Data() {
      let {defaultEditorConfiguration} = this.$options;
      let {editor} = this.$props;

      this.$data.editorConfiguration = Object.assign({}, defaultEditorConfiguration, editor);
    },
    dynamicImportEditorPlugin() {
      let self = this;
      let {editorConfiguration: {plugins = ''}} = this.$data;
      for (let plugin of plugins.split(' ').entries()) {
        if (plugin[1] === 'gallery') {
          this.$data.needInstallGallery = true;
          continue;
        }
        require('tinymce/plugins/' + plugin[1]).default;
      }

      if (this.$data.needInstallGallery) {
        GalleryPlugin.install(function() {
          self.$emit('galleryToolbarClick');

          if (self.$props.showDefaultGalleryComponent) {
            self.$data.visible = true;
          }
        });

        self.$emit('afterInstallGalleryPlugin', GalleryPlugin);
      }
    },
    formatImages(list = []) {
      let result = [];
      for (let [index, image] of list.entries()) {
        result[index] = {
          src: {
            value: image.imgurl
          },
          dimensions: {
            width: image.imgwidth,
            height: image.imgheight
          },
          hspace: image.imgwidth,
          vspace: image.imgheight,
          border: 0,
          borderStyle: '',
          caption: false,
          classes: '',
          style: '',
          alt: '',
          title: ''
        };
      }
      return result;
    }
  },

  watch: {
    editor() {
      this.mergeProps2Data();
    }
  },

  render(h) {
    const self = this;
    let {needInstallGallery} = this.$data;

    function renderGallery() {
      if (!needInstallGallery || !self.$props.showDefaultGalleryComponent) {
        return null;
      }

      return h(Gallery, {
        props: {
          ...self.$props.gallery,
          value: self.$data.visible
        },
        on: {
          input: function() {
            self.$data.visible = false;
          },
          selected: function(images) {
            GalleryPlugin.insertIntoEditor(self.formatImages(images));
          }
        }
      });
    }

    return h('div', {class: 'el-editor'}, [
      h(Editor, {
        props: {...this.$data.editorConfiguration},
        on: {
          input: function(content) {
            self.$emit('input', content);
          }
        }
      }),
      renderGallery()
    ]);
  }
};
