## Gallery 图片库
用于选取／上传图片的组件

### 基础用法

:::demo
```html
<div>
  <el-button @click="visible = !visible">显示/隐藏</el-button>
  <el-gallery 
    v-model="visible" 
    :categories="categories"
    :defaultActiveCategoryIndex="10" 
    :gallery="gallery" 
    :uploader="uploader"
    :maximumPickUpAmount="2"
    @toggleCategory="searchGalleryHandler"
    @searchGallery="searchGalleryHandler"
    @previousPage="searchGalleryHandler"
    @nextPage="searchGalleryHandler"
    @selected="selectedHandler"
  />
</div>

<script>
  export default {
    data() {
      return {
        visible: false,
        categories: [],
        gallery: {},
        uploader: {
          action: 'http://member.miduonet.com/api/common/uploadimages',
          constructAction: function(action, selectedCategory) {
            return action + '?groupId=' + selectedCategory;
          }
        }
      };
    },
    created() {
      this.toggleCategoryHandler();
      this.searchGalleryHandler();
    },
    methods: {
      toggleCategoryHandler() {
        setTimeout(() => {
          this.categories = [
            {
              id: 0,
              groupname: '未分组',
              memberlogin: '10003913',
              imagescount: 139
            },
            {
              id: 1,
              groupname: '未分组',
              memberlogin: '10003913',
              imagescount: 139
            },
            {
              id: 2,
              groupname: '未分组',
              memberlogin: '10003913',
              imagescount: 139
            },
            {
              id: 3,
              groupname: '未分组',
              memberlogin: '10003913',
              imagescount: 139
            },
            {
              id: 4,
              groupname: '未分组',
              memberlogin: '10003913',
              imagescount: 139
            },
            {
              id: 5,
              groupname: '未分组',
              memberlogin: '10003913',
              imagescount: 139
            },
            {
              id: 6,
              groupname: '未分组',
              memberlogin: '10003913',
              imagescount: 139
            },
            {
              id: 7,
              groupname: '未分组',
              memberlogin: '10003913',
              imagescount: 139
            },
            {
               id: 8,
               groupname: '未分组',
               memberlogin: '10003913',
               imagescount: 139
            },                                                                                               
            {
              id: 9,
              groupname: '未分组',
              memberlogin: '10003913',
              imagescount: 139,
              active: false
            },
            {
              id: 10,
              groupname: '未分组',
              memberlogin: '10003913',
              imagescount: 139,
              active: false
            },
            {
              id: 11,
              groupname: '未分组',
              memberlogin: '10003913',
              imagescount: 139,
              active: false
            },
            {
              id: 12,
              groupname: '未分组',
              memberlogin: '10003913',
              imagescount: 139,
              active: false
            },
            {
              id: 13,
              groupname: '未分组',
              memberlogin: '10003913',
              imagescount: 139,
              active: false
            },
            {
              id: 14,
              groupname: '未分组',
              memberlogin: '10003913',
              imagescount: 139,
              active: false
            }
          ]
        }, 1000);
      },
      searchGalleryHandler() {
        setTimeout(() => {
          this.$data.gallery = {
            list: [
             {
               "id": "17256",
               "imgurl": "//image.qn.weixin12315.com.cn/bg/2019-45/13800138000/6815c7c6-fc77-4a49-bc78-f60964e3e70b.png",
               "imgwidth": 613,
               "imgheight": 383,
               "imgsize": 17617,
               "oldname": "TIM图片20190718134504.png",
               "imggroupid": 0,
               "createdate": "2019-07-18 13:45:28"
             },
             {
               "id": "17255",
               "imgurl": "//image.qn.weixin12315.com.cn/13800138000/StoreMini/image/210128fb3b8800d2314b3792ba8ea18c7ddfca.jpg",
               "imgwidth": 750,
               "imgheight": 1334,
               "imgsize": 80732,
               "oldname": "1846002b8c671c4e11452893a381a0d4792db6.jpg",
               "imggroupid": 0,
               "createdate": "2019-07-08 21:01:28"
             },
             {
               "id": "17254",
               "imgurl": "//image.qn.weixin12315.com.cn/micromall/2019/07/13800138000/e9506107-d600-45a4-8a26-dd5df0284ac5.jpg",
               "imgwidth": 290,
               "imgheight": 160,
               "imgsize": 16271,
               "oldname": "14-1P5191355090-l.jpg",
               "imggroupid": 0,
               "createdate": "2019-07-08 10:35:50"
             },
             {
               "id": "17253",
               "imgurl": "//image.qn.weixin12315.com.cn/13800138000/StoreMini/image/150553626c04cb3561477183890ad5797b6417.png",
               "imgwidth": 750,
               "imgheight": 1334,
               "imgsize": 133315,
               "oldname": "saleSpokesmanInvite-bg.png",
               "imggroupid": 0,
               "createdate": "2019-07-06 15:05:53"
             },
             {
               "id": "17251",
               "imgurl": "//image.qn.weixin12315.com.cn/micromall/2019/05/13800138000/09528605-0632-493e-bbb4-d084fd4c75d1.jpg",
               "imgwidth": 1366,
               "imgheight": 768,
               "imgsize": 210275,
               "oldname": "58e4513dd8aeb.jpg",
               "imggroupid": 0,
               "createdate": "2019-05-21 16:04:02"
             },
             {
               "id": "17250",
               "imgurl": "//image.qn.weixin12315.com.cn/13800138000/StoreMini/image/180743327b64938c7d4a50869f1212b5d0a7c3.png",
               "imgwidth": 690,
               "imgheight": 310,
               "imgsize": 460841,
               "oldname": "米田共.png",
               "imggroupid": 0,
               "createdate": "2019-05-20 18:07:43"
             },
             {
               "id": "17247",
               "imgurl": "//image.qn.weixin12315.com.cn/13800138000/StoreMini/image/094339f335e2e6e4654df4b39fc97bdb9c8f35.jpg",
               "imgwidth": 400,
               "imgheight": 400,
               "imgsize": 41150,
               "oldname": "6223cb99bef7359b8958deeb528527a.jpg",
               "imggroupid": 0,
               "createdate": "2019-05-07 09:43:39"
             },
             {
               "id": "17245",
               "imgurl": "//image.qn.weixin12315.com.cn/13800138000/StoreMini/image/09370189a66f4ff1954badbaedcf58dd4bd6ac.png",
               "imgwidth": 637,
               "imgheight": 788,
               "imgsize": 210915,
               "oldname": "图层 1.png",
               "imggroupid": 0,
               "createdate": "2019-04-30 09:37:01"
             },
             {
               "id": "17217",
               "imgurl": "//image.qn.weixin12315.com.cn/13800138000/StoreMini/image/173604d4c5454035e84121ac70c5152defaba8.jpg",
               "imgwidth": 448,
               "imgheight": 409,
               "imgsize": 299580,
               "oldname": "wx2bb87099d69eed6c.o6zAJszJNuPBCkEIrhY9kYBLxjMM.ybOsjW7fx1nQd6a4560f9fc1b92b94d3f2ca9762c2e5.jpg",
               "imggroupid": 0,
               "createdate": "2019-04-16 17:36:05"
             },
             {
               "id": "17213",
               "imgurl": "//image.qn.weixin12315.com.cn/13800138000/StoreMini/image/165423c1f3ae64edfd447d91f890778f64fdd9.png",
               "imgwidth": 30,
               "imgheight": 39,
               "imgsize": 865,
               "oldname": "wxfe320c78c3345f19.o6zAJs2_OB1S8MTDe2JWD3ZJ_VXQ.WhoCk54qcY2Da8dc5a5bda6da6cce6d6d3f23c1539c2.png",
               "imggroupid": 0,
               "createdate": "2019-04-16 16:54:23"
             }
            ],
            totalCount: 100,
            pageSize: 12
          };  
        }, 1000);
      },
      selectedHandler(list) {
        console.log(list);
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
| maximumPickUpAmount | 最大可选择图片数量 | Number | - | `9` |
| uploader | 上传控件参数对象 | Object | - | `{}` |
| defaultActiveCategoryIndex | 默认选中的分组下标 | Number | - | `0` |
| categories | 图片分组列表 | Array | - | `[]` |
| gallery | 图片列表对象 | Object | - | `{}` |
| message | 提示类对象 | Object | - | `{}` |

### uploader 属性说明
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| action | 图片上传接口 | String | - | `''` |
| accept | 接受上传的[文件类型](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-accept) | string | — | `'image/png,image/jpg,image/jpeg,image/gif'` |
| multiple | 是否支持多选 | Boolean | false | true |
| maximumUploadImageSize | 最大可上传图片大小 | Number | - | 500 * 1024字节（即500KB） |
| constructAction | 可在此构造实际的图片上传路径，比如根据图片分组增加查询字符串 | Function(action: String, selectedCategory: String) | - | null |        
     
### Events 
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| toggleCategory | 切换图片分组时触发 | 当前高亮分组对象`activeCategory: Object` |
| searchGallery | 点击搜索按钮时触发 | `{keyword: String, activeCategory: Object}` |
| previousPage | 点击上一页时触发 | `{currentPage: Number, activeCategory: Object, keyword: String}` |
| nextPage | 点击下一页时触发 | `{currentPage: Number, activeCategory: Object, keyword: String}` |
| input | v-model绑定事件 | — |
| selected | 点击确定时，返回已选择图片以及已上传图片列表 | `result: Array` |
