## ColorfulTags 多色彩标签组

### 基础用法

:::demo
```html
<div>
  <el-colorful-tags :contents="contents_small"/>
  <el-divider/>
  <el-colorful-tags :contents="contents"/>
  <el-divider/>
  <el-colorful-tags :contents="contents_extra"/>
</div>

<script>
export default {
  data() {
    return {
      contents: [],
      contents_small: [],
      contents_extra: []
    };
  },
  created() {
    this.$data.contents = this.generateContent(); 
    this.$data.contents_small = this.generateContent(1); 
    this.$data.contents_extra = this.generateContent(8); 
  },
  methods: {
    generateContent(expectLength = 4) {
      let result = [];
      for (let i = 0; i < expectLength; i++) {
        let id = parseInt(Math.random() * 1000000);
        result[i] = {
          id,
          name: '标签' + id
        }
      }
      return result;
    }  
  }
}
</script>
```
:::

### 支持渲染纯文本

:::demo
```html
<div>
  <el-colorful-tags :contents="contents" type="text" :ellipsisThreshold="1"/>
  <el-divider/>
  <el-colorful-tags :contents="contents_extra" type="text" :ellipsisThreshold="1"/>
</div>

<script>
export default {
  data() {
    return {
      contents: ['这是一段很短的话'],
      contents_extra: ['你也可以分段传入需要展示的文字', '超过长度会缩略，', '点击会展示全部']
    };
  }
}
</script>
```
:::

### 增加修饰元素

:::demo
```html
<div>
  <el-colorful-tags :contents="contents" type="text" :ellipsisThreshold="1">
    <i class="el-icon-star-on" slot="decoration"></i>
  </el-colorful-tags>
  <el-divider/>
  <el-colorful-tags :contents="contents_extra" type="text" :ellipsisThreshold="1">
    <i class="el-icon-star-off" slot="decoration"></i>
  </el-colorful-tags>
</div>

<script>
export default {
  data() {
    return {
      contents: ['这是一段很短的话啦吧'],
      contents_extra: ['你也可以分段传入需要展示的文字', '超过长度会缩略，', '点击会展示全部']
    };
  }
}
</script>
```
:::

### Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| type | 类型，可以为标签、纯文本 | String | text|tag | `tag` |
| contents | 内容 | Array | - | `[]` | 
| ellipsisThreshold | 省略阀值 | Number | - | `3` |
| ellipsisWidth | 省略长度 | Number | - | `145` |
| decorationWidth | 修饰内容长度，包含margin + padding + width | Number | - | `16` | 
| canvasFont | canvas字体样式，用于计算文本长度 | String | - | `400 14px "Microsoft YaHei"` | 

### Slots
| 名称	 | 说明               |  
| ------ | ------------------ | 
| decoration  | 修饰内容 |
