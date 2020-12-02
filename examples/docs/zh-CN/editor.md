## Editor 编辑器
基于[Tinymce](https://github.com/tinymce/tinymce)的富文本编辑器

### 基础用法

:::demo
```html
<div>
  <el-editor 
    :gallery="gallery" 
    :editor="editor" 
    v-model="content" 
    :showDefaultGalleryComponent="false"
    @afterInstallGalleryPlugin="afterInstallHandler"
    @galleryToolbarClick="galleryToolbarClick"
  />
  <div>{{content}}</div>
</div>

<script>
export default {
  data() {
    return {
      content: '',
      gallery: {},
      editor: {},
      galleryToolbarPluginInstance: null,
      selectedImages: [
         {
           src: {
             value: '//image.qn.weixin12315.com.cn/bg/2019-45/13800138000/6815c7c6-fc77-4a49-bc78-f60964e3e70b.png'
           },
           dimensions: {
             width: 613,
             height: 383
           },
           hspace: 613,
           vspace: 383,
           border: 0,
           borderStyle: '',
           caption: false,
           classes: '',
           style: '',
           alt: '',
           title: ''
         }
      ]
    }
  },
  created() {
    setTimeout(() => {
      this.$data.gallery = {
        categories: [
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
        ],
        gallery: {
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
         }   
       }
    }, 1000);
  },
  methods: {
    afterInstallHandler(instance) {
      this.$data.galleryToolbarPluginInstance = instance; 
    },
    galleryToolbarClick() {
      this.$message('gallery toolbar click');
      this.$data.galleryToolbarPluginInstance.insertIntoEditor(this.$data.selectedImages);
    }
  }
}
</script>
```
:::

### Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| value／v-model | 编辑器内容输出 | String | - | `''`|
| editor | 编辑器对象，属性与[tinymce-vue组件属性](https://github.com/tinymce/tinymce-vue#configuring-the-editor)一致 | Object| - | `{}` |
| gallery | 图片库对象，属性与[gallery组件属性](http://localhost:8085/#/zh-CN/component/gallery#attributes)一致 | Object | - | `{}` |
| showDefaultGalleryComponent | 点击工具栏的图片库按钮，是否默认展示图片库组件 | Boolean | false | `true` |

### Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| galleryToolbarClick | 图片库工具栏点击事件 | - | 
| afterInstallGalleryPlugin | 插件安装完成事件 | 插件实例对象 |
| input | 编辑器输入事件，可配合v-model使用 | 编辑器文本内容 | 

