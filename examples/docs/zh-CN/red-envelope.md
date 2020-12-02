## RedEnvelope 红包库
用于选取参与活动/兑换的红包

### 基础用法

:::demo
```html
<div>
  <el-button @click="toggleVisibleHandler">显示/隐藏</el-button>
  <el-red-envelope 
    v-model="visible" 
    :redEnvelope="redEnvelope"
    createRedEnvelopeURL="https://baidu.com"
    @conditionsUpdated="searchGalleryHandler"
    @selected="selectHandler"
  />
</div>

<script>
  export default {
    data() {
      return {
        visible: false,
        redEnvelope: {}
      };
    },
    
    methods: {
      toggleVisibleHandler() {
        this.$data.visible = !this.$data.visible;
        
        if (this.$data.visible) {
          this.searchGalleryHandler({});
        }
      },
      
      searchGalleryHandler({ pageindex = 1, pagesize = 10 }) {
        setTimeout(() => {
          this.$data.redEnvelope = {
             list: [
               {
                 id: 1,
                 type: 1,
                 minmoney: 1.00, 
                 maxmoney: 2.00, 
                 sender: '13800138000', 
                 hbremark: '这是一个很长的说明这是一个很长的说明这是一个很长的说明', 
                 instructions: '这是一个很长的说明这是一个很长的说明这是一个很长的说明', 
                 wxhbtype: 1
               },
               {
                 id: 2,
                 type: 0,
                 minmoney: 1.00, 
                 maxmoney: 2.00, 
                 sender: '13800138000', 
                 hbremark: '这是一个很长的说明这是一个很长的说明这是一个很长的说明', 
                 instructions: '这是一个很长的说明这是一个很长的说明这是一个很长的说明', 
                 wxhbtype: 1
               }
             ],
             pageindex,
             pagesize,
             totalcount: 1
           };  
        }, 1000);
      },
      selectHandler(item) {
        console.log(item);
      }
    }
  }
</script>
```
:::

### Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| title | 图片库标题 | String | — | `图片库` |
| value | 是否展示图片库 | Boolean | - | `false` |
| redEnvelope | 红包对象 | Object | - | `{}` |
| availablePageSize | 分页数量 | Array | - | `[10, 20, 30, 40, 50, 100]` |
| currency | 货币 | String | - | `¥` |
| createRedEnvelopeURL | 创建红包链接 | String | - | - |
| decimalFixedDigits | 金额保留小数位数 | Number | - | `2` |

### redEnvelope 属性说明
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| list | 红包列表 | Array | - | `[]` |
| pageindex | 当前页码 | Number | - | `1` |,
| pagesize | 每页显示数量 | Number | - | `10` |
| totalcount | 红包总量 | Number | - | `0` |
     
### Events 
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| conditionsUpdated | 查询条件变更时触发，查询条件包括下拉框、输入框、页码、每页显示数量 | `{pageindex: Number, pagesize: Number, keywordfield: Number, keywordvalue: String}: Object` |
| input | v-model绑定事件 | Boolean |
| selected | 点击确定时，返回已选择的红包 |`{id: Number, type: Number, minmoney: Number, maxmoney: Number, sender: String, hbremark: String, instructions: String, wxhbtype: String}: Object` |
