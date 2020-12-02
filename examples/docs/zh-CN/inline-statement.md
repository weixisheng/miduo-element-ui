## InlineStatement 行内说明
用于描述主体内容的文案容器，支持内嵌链接

### 基础用法

:::demo
```html
<div>
  <el-inline-statement :statements="statements" :delimiter="delimiter"/>
</div>

<script>
  export default {
    data() {
      return {
        statements: [
          '会员小程序会员小程序会员小程序会员小程序会员小程序会员小程序会员小程序',
          '会员小程序会员小程序会员小程序会员小程序会员小程序会员小程序会员小程序',
          '会员小程序会员小程序会员小程序会员小程序会员小程序会员小程序会员小程序'
        ],
        delimiter: '、'  
      };
    }
  }
</script>
```
:::

### 内嵌链接

:::demo 
```html
<div>
  <el-inline-statement :statements="statements" :delimiter="delimiter"/>
</div>

<script>
  export default {
    data() {
      return {
        statements: [
          '会员小程序会员小程序会员小程序会员小程序会员小程序会员小程序会员小程序',
          [
            '会员小程序会员小程序会员小程序会员小程序会员小程序会员小程序会员小程序',
            {
              genre: 'link',
              href: 'http://www.baidu.com',
              type: 'primary',
              content: '点我跳转'
            },
            '会员小程序'
          ],
          '会员小程序会员小程序会员小程序会员小程序会员小程序会员小程序会员小程序'
        ],
        delimiter: '、'  
      };
    }
  }
</script>
```
:::

### 占位内容
可通过`slot = statement`可自定义占位内容
:::demo 
```html
<div>
  <el-inline-statement :statements="statements">
    <p slot="statement" slot-scope="scopedProps">
      {{scopedProps.index + 1}}、{{scopedProps.statement}}
    </p>
  </el-inline-statement>
</div>

<script>
  export default {
      data() {
        return {
          statements: [
            '会员小程序会员小程序会员小程序会员小程序会员小程序会员小程序会员小程序',
            '会员小程序会员小程序会员小程序会员小程序会员小程序会员小程序会员小程序',
            '会员小程序会员小程序会员小程序会员小程序会员小程序会员小程序会员小程序'
          ]  
        };
      }
    }
</script>
```
:::

### 实际应用
:::demo
```html
<div>
  <el-inline-statement :statements="statements" :showIndex="false"/>
</div>

<script>
export default {
  data() {
    return {
      statements: [
        '创建扫码活动时，您可以根据需要设置扫码活动的活动主题、活动时间、活动范围、活动奖项以及活动策略等；',
        {
          genre: 'text',
          type: 'danger',
          content: '重要提示:' 
        },
        [
          '1、为保证活动正常进行，请确保活动相关的码批次为开启状态（在',
          {
            genre: 'link',
            type: 'primary',
            href: 'http://www.baidu.com',
            content: '【应用服务】>'
          },
          {
            genre: 'link',
            type: 'primary',
            href: 'http://www.baidu.com',
            content: '【标识管理】>'
          },
          {
            genre: 'link',
            type: 'primary',
            href: 'http://www.baidu.com',
            content: '【码批次管理】'
          },
          '中开启）',
          {
            genre: 'popover',
            content: '这是popover内容',
            refProps: {
              icon: 'el-icon-question',
              underline: false
            }
          }
        ],
        '2、扫码活动存在领奖记录之后将不能删除，请谨慎操作'
      ]  
    };
  }
}
</script>
```
:::

### Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| statements | 行内说明内容 | Array | — | [] |
| showIndex | 是否显示列表下标 | Boolean | - | true |
| delimiter | 下标与内容间的分隔符 | String | - | .(dot) |

### statements数组子元素表现形式（支持数组、对象、字符串）
```javascript
statements = [
  '1',
  {
    genre: 'link',
    content: '2'
  },
  {
    genre: 'text',
    content: '3'
  },
  {
    genre: 'popover',
    content: '4',
    refProps: {
      content: 'hover触发popover'
    }
  },
  [
    '5',
    {
      genre: 'link',
      content: '6'
    },
    {
      genre: 'text',
      content: '7'
    },
    {
      genre: 'popover',
      content: '8',
      refProps: {
        content: 'hover触发popover'
      }
    } 
  ]
]
```

### genre = text|link时，其余属性说明
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| genre | 文案类型 | String | popover / link | text |
| content | 链接文本 | String | — | - | 
| type | 类型（跟[&lt;el-link/&gt;](/#/zh-CN/component/link#attributes)组件属性一致）| String | primary / success / warning / danger / info | default |
| underline      | 是否下划线（跟[&lt;el-link/&gt;](/#/zh-CN/component/link#attributes)组件属性一致）| Boolean | — | true |
| disabled       | 是否禁用状态（跟[&lt;el-link/&gt;](/#/zh-CN/component/link#attributes)组件属性一致）| Boolean | — | false   |
| href | 原生 href 属性（跟[&lt;el-link/&gt;](/#/zh-CN/component/link#attributes)组件属性一致）| String  | —    | -       |
| icon | 图标类名（跟[&lt;el-link/&gt;](/#/zh-CN/component/link#attributes)组件属性一致） | String  | —    | -       |

### statements genre = popover 时，其余属性说明
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| genre | 文案类型 | String | popover/link | text |
| trigger | 触发方式（跟[&lt;el-popover/&gt;](/#/zh-CN/component/popover#attributes)组件属性一致） | String  | click/focus/hover/manual |    click    |
| title | 标题（跟[&lt;el-popover/&gt;](/#/zh-CN/component/popover#attributes)组件属性一致）| String | — | — |
| content |  显示的内容（跟[&lt;el-popover/&gt;](/#/zh-CN/component/popover#attributes)组件属性一致）| String | — | — |
| width | 宽度（跟[&lt;el-popover/&gt;](/#/zh-CN/component/popover#attributes)组件属性一致） | String, Number     | — | 最小宽度 150px |
| placement | 出现位置 （跟[&lt;el-popover/&gt;](/#/zh-CN/component/popover#attributes)组件属性一致） | String | top/top-start/top-end/bottom/bottom-start/bottom-end/left/left-start/left-end/right/right-start/right-end |  top |
| disabled| Popover 是否可用（跟[&lt;el-popover/&gt;](/#/zh-CN/component/popover#attributes)组件属性一致）  | Boolean    | — |  false |
| offset |  出现位置的偏移量（跟[&lt;el-popover/&gt;](/#/zh-CN/component/popover#attributes)组件属性一致）  | Number    | — |  0 |
| transition     |  定义渐变动画（跟[&lt;el-popover/&gt;](/#/zh-CN/component/popover#attributes)组件属性一致）      | String      | — | fade-in-linear |
| visible-arrow   |  是否显示 Tooltip 箭头，更多参数可见[Vue-popper](https://github.com/element-component/vue-popper) | Boolean | — | true |
| popper-options | [popper.js](https://popper.js.org/documentation.html) 的参数 | Object            | 参考 [popper.js](https://popper.js.org/documentation.html) 文档 | `{ boundariesElement: 'body', gpuAcceleration: false }` |
| popper-class | 为 popper 添加类名 | String | — | — |
| open-delay | 触发方式为 hover 时的显示延迟，单位为毫秒（跟[&lt;el-popover/&gt;](/#/zh-CN/component/popover#attributes)组件属性一致） | Number | — | — |
| tabindex   | Popover 组件的 [tabindex](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex) | Number | — | 0 |
| refProps   | 触发popover显示的dom元素属性（跟[&lt;el-link/&gt;](/#/zh-CN/component/link#attributes)组件属性一致） | Object | — | {} |

### Slots
| 名称    | 说明         |
|---------|-------------|
| statement | 说明文案内容 |
