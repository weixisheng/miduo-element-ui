import Link from 'miduo-element-ui/packages/link';
import PopOver from 'miduo-element-ui/packages/popover';
import Locale from 'miduo-element-ui/src/mixins/locale';
import { isArray, isObject } from 'miduo-element-ui/src/utils/types';

export default {
  name: 'ElInlineStatement',

  mixins: [Locale],
  inheritAttrs: false,
  props: {
    statements: { // 说明内容
      type: Array,
      required: true,
      validator(value) {
        return value.length > 0;
      }
    },
    showIndex: { // 是否显示索引
      type: Boolean,
      default: true
    },
    delimiter: { // 分隔符
      type: String,
      default: '.'
    }
  },

  render(h) {
    const {$props, $scopedSlots} = this;

    function renderPlainText(props) {
      return renderLink({
        class: 'el-inline-statement__plaintext',
        underline: false,
        ...props
      });
    }

    function renderLink(props, slot) {
      return h(Link, {props: {...props}, class: props.class, slot}, props.content);
    }

    function renderPopOver(props) {
      return h(PopOver, {props: {
        placement: 'top',
        trigger: 'hover',
        ...props
      }}, [
        renderLink({...(props.refProps || {})}, 'reference')
      ]);
    }

    function renderArrayChild(children) {
      return children.map((item) => {
        if (isObject(item)) {
          return renderObjectChild(item);
        } else {
          return renderPlainText({
            content: item
          });
        }
      });
    }

    function renderObjectChild(child) {
      let { genre } = child;
      switch (genre) {
        case 'link':
          return renderLink(child);
        case 'popover':
          return renderPopOver(child);
        default:
          return renderPlainText(child);
      }
    }

    function renderStringChild(content) {
      return renderPlainText({content});
    }

    function renderChildren(statement, index) {
      let children = [];
      if (isArray(statement)) {
        children = renderArrayChild(statement);
      } else if (isObject(statement)) {
        children[0] = renderObjectChild(statement);
      } else { // plain text
        children[0] = renderStringChild(statement);
      }

      if ($props.showIndex) {
        children.unshift(renderPlainText({
          content: [index + 1, $props.delimiter]
        }));
      }

      return h('div', {
        class: 'el-inline-statement__item'
      }, children);
    }

    return (
      <div class="el-inline-statement">
        {
          $props.statements.map((statement, index) =>
            $scopedSlots.statement ? $scopedSlots.statement({statement, index}) : renderChildren(statement, index)
          )
        }
      </div>
    );
  }
};
