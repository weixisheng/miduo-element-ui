<template>
  <div class="el-colorful-tags">
    <div
      :class="{'el-colorful-tags__ellipsis': true, 'is-center': ellipsisList.length < ellipsisThreshold}"
      :style="{width: ellipsisWidth + 'px'}"
    >
      <slot name="decoration"></slot>
      <template v-for="(item, index) in ellipsisList">
        <div v-if="type === 'text'" class="el-colorful-tags__ellipsis-plaintext">{{item}}</div>
        <el-tag v-else size="small" :style="constructTagStyle(index)" :key="item.id">{{item.name}}</el-tag>
      </template>
    </div>
    <el-popover
      v-if="popOverVisibility"
      trigger="hover"
      placement="right"
      class="el-colorful-tags__popover-wrapper"
      popper-class="el-colorful-tags__popover"
    >
      <div :class="['el-colorful-tags__full', type === 'text' ? 'is-plaintext' : '']">
        <template v-for="(item, index) in contents">
          <template v-if="type === 'text'">{{item}}</template>
          <el-tag v-else size="small" :style="constructTagStyle(index)" :key="item.id">{{item.name}}</el-tag>
        </template>
      </div>
      <span class="el-colorful-tags__ellipsis-trigger" slot="reference">
        <i class="el-icon-more"></i>
      </span>
    </el-popover>
  </div>
</template>
<script>
  import measureText from 'miduo-element-ui/src/mixins/measure-text';

  export default {
    name: 'ElColorfulTags',
    mixins: [measureText],
    props: {
      type: {
        type: String,
        default: 'tag',
        validator: (value) => {
          return ['tag', 'text'].indexOf(value) !== -1;
        }
      },
      contents: {
        type: Array,
        default: () => {
          return [];
        }
      },
      ellipsisThreshold: {
        type: Number,
        default: 3
      },
      ellipsisWidth: {
        type: Number,
        default: 145
      },
      decorationWidth: {
        type: Number,
        default: 16
      }
    },
    data() {
      return {
        availableColors: [
          '#1EC3D1',
          '#FFC261',
          '#4BDBB9',
          '#FF9A86'
        ]
      };
    },
    methods: {
      constructTagStyle(colorIndex) {
        const color = this.$data.availableColors[colorIndex % 4];
        return {
          backgroundColor: color,
          borderColor: color
        };
      }
    },
    computed: {
      ellipsisList() {
        return this.$props.contents.slice(0, this.$props.ellipsisThreshold);
      },
      popOverVisibility() {
        const { type, ellipsisThreshold, contents, ellipsisWidth, decorationWidth } = this.$props;
        if (type === 'tag') {
          return contents.length >= ellipsisThreshold;
        }
        // method from mixins
        return this.measureText(contents.join('')) > (ellipsisWidth - (this.$slots.decoration ? decorationWidth : 0));
      }
    }
  };
</script>