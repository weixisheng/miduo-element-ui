<template>
  <el-dialog
    custom-class="el-gallery"
    :append-to-body="appendToBody"
    width="900px"
    :visible.sync="visible"
    :title="title"
    @closed="afterDialogCloseHandler"
    ref="dialog"
  >
    <template slot="title">
      <span class="el-dialog__title">图片库</span>
      <span class="el-gallery__selected" v-show="!isUploadFromLocal">(已选择{{alreadyPickUpAmount}}张图片)</span>
      <el-divider direction="vertical" v-if="isUploadFromLocal"></el-divider>
      <el-button type="text" @click="isUploadFromLocal = false" v-show="isUploadFromLocal">返回图片库</el-button>
    </template>
    <div class="el-gallery__remote" v-show="!isUploadFromLocal">
      <div class="el-gallery__categories">
        <div
          v-for="(category, index) in initialCategories.formattedList" :key="category.id"
          :class="{'el-gallery__category': true, 'el-gallery__category--active': category.active}"
          @click="toggleActiveCategory(index)"
        >
          {{category.groupname}}<span class="el-gallery__category-summary">（{{category.imagescount}}）</span>
        </div>
      </div>
      <div class="el-gallery__main">
        <div class="el-gallery__top-actions">
          <el-button plain type="primary" size="medium" @click="isUploadFromLocal = true">本地上传</el-button>
          <div class="el-gallery__search">
            <el-input v-model="keyword" placeholder="请输入内容" size="large" clearable :disabled="loading"></el-input>
            <el-button plain
                       type="primary"
                       size="medium"
                       @click="searchGalleryHandler"
                       icon="el-icon-search"
                       :disabled="loading"
            >
              搜索
            </el-button>
          </div>
        </div>
        <div class="el-gallery__content" v-loading="loading">
          <ul class="el-gallery__row" v-for="(subList, x) in initialGallery.formattedList" :key="x">
            <li
              v-for="(item, y) in subList"
              :key="item.id"
              :class="{'el-gallery__item': true, 'el-gallery__item--selected': item.selected}"
              @click="pickUp(x, y)"
            >
              <el-image
                :src="item.imgurl"
                :class="item.imgwidth > item.imgheight ? 'is-autoHeight' : 'is-autoWidth'"
                lazy
              >
                <div slot="placeholder" class="image-slot">
                  <i class="el-icon-picture-outline"></i>
                </div>
              </el-image>
              <i class="el-icon-check"></i>
              <span class="el-gallery__image-size">{{item.imgwidth}}*{{item.imgheight}}</span>
              <span class="el-gallery__image-name">{{item.oldname}}</span>
            </li>
          </ul>
        </div>
        <div class="el-gallery__actions">
          <div class="el-gallery__pagination">
            <el-button plain size="medium" @click="pageChangeHandler(-1)" v-if="currentPage > 1" :disabled="loading">
              上一页
            </el-button>
            <el-button plain size="medium" @click="pageChangeHandler(1)" v-if="currentPage < totalPages"
                       :disabled="loading">
              下一页
            </el-button>
            <div class="el-gallery__statistic">共{{gallery.totalCount}}条，每页{{gallery.pageSize}}条</div>
          </div>
          <el-button type="success" size="medium" @click="checkBeforeCloseHandler" :disabled="loading">确定</el-button>
        </div>
      </div>
    </div>
    <div class="el-gallery__local" v-show="isUploadFromLocal">
      <div class="el-gallery__form">
        <div class="el-gallery__form-item">
          <div class="el-gallery__form-label">
            <span>本地图片</span>
            <span class="el-gallery__hint">仅支持jpeg,jpg,gif,png格式；单张图片大小不超过500k</span>
          </div>
          <div class="el-gallery__form-value">
            <el-upload
              ref="uploader"
              class="el-gallery__uploader"
              list-type="picture-card"
              :auto-upload="autoUpload"
              :multiple="initialUploader.multiple"
              :action="uploadAction"
              :headers="actualHeaders"
              :accept="initialUploader.accept"
              :name="initialUploader.name"
              :limit="!autoUpload ? 100 : (maximumPickUpAmount - alreadyPickUpAmount)"
              :on-preview="pictureCardPreviewHandler"
              :on-error="imageUploadErrorHandler"
              :on-remove="imageRemoveHandler"
              :on-success="imageUploadedHandler"
              :on-exceed="imageUploadExceedHandler"
              :on-change="afterBrowseImageHandler"
              :before-upload="beforeImageUploadHandler"
            >
              <i class="el-icon-plus"></i>
              <div slot="file" slot-scope="{file}" class="el-gallery__uploaded-image"
                   @click="imagePreviewHandler(file)">
                <img
                  class="el-gallery__uploaded-thumbnail"
                  :src="file.url"
                  @load.stop="localImageLoadedHandler"
                  alt=""
                >
                <i class="el-icon-close" @click="deleteUploadedImageHandler(file, $event)"></i>
                <el-progress
                  v-if="file.status === 'uploading'"
                  type="circle"
                  :stroke-width="6"
                  :width="80"
                  :percentage="parsePercentage(file.percentage)">
                </el-progress>
              </div>
            </el-upload>
          </div>
        </div>
        <div class="el-gallery__form-item">
          <div class="el-gallery__form-label">
            <span>图片分组：</span>
          </div>
          <div class="el-gallery__form-value">
            <el-select v-model="selectedCategory">
              <el-option
                v-for="category in categories"
                :key="category.id"
                :label="category.groupname"
                :value="category.id">
              </el-option>
            </el-select>

            <el-link type="primary" :href="categoryCreationUrl" target="_blank" v-if="categoryCreationUrl">
              新增分组
            </el-link>
          </div>
        </div>
      </div>
      <div class="el-gallery__operations">
        <el-button type="success" size="medium" @click="confirmUploadFromLocalHandler">确定</el-button>
      </div>
    </div>
    <el-dialog
      width="900px"
      title="图片预览"
      :visible.sync="isImagePreview"
      append-to-body>
      <img width="100%" :src="previewImageURL" alt="">
    </el-dialog>
  </el-dialog>
</template>
<script>
  import Locale from 'miduo-element-ui/src/mixins/locale';
  import { isArray } from 'miduo-element-ui/src/utils/types';

  export default {
    defaultUploaderConfiguration: {
      action: '',
      accept: 'image/png,image/jpg,image/jpeg,image/gif',
      multiple: true,
      maximumUploadImageSize: 500 * 1024, // 最大可上传图片大小，默认500KB
      constructAction: null,
      headers: {},
      constructHeaders: null,
      name: 'Images'
    },
    defaultGalleryConfiguration: {
      list: [],
      pageIndex: 1,
      pageSize: 12,
      totalCount: 0
    },
    defaultMessageConfiguration: {
      exceedMaximumPickUpAmountMessage: '只可选取不多于{0}张图片！',
      emptySearchKeywordMessage: '搜索内容不能为空！',
      zeroPickUpMessage: '请至少选择或上传一张图片！',
      exceedMaximumUploadSizeMessage: '上传图片大小不得超过{0}KB！',
      unsetUploadImageToCategoryMessage: '请先选择图片分组！',
      exceedMaximumUploadAmount: '选择上传的图片数量超过最大可选取数量！',
      sessionExpiredMessage: '当前登录已失效，请重新登录！',
      commonImageUploadErrorMessage: '当前网络环境较差，请稍后重试！'
    },
    name: 'ElGallery',
    mixins: [Locale],
    inheritAttrs: false,
    props: {
      title: { // 图片库名称
        type: String,
        default: '图片库'
      },
      value: Boolean, // 控制图片库显示与否
      maximumPickUpAmount: { // 最多可选取图片，默认9张
        type: Number,
        default: 9
      },
      uploader: {
        type: Object,
        required: true,
        default: () => {
          return {};
        }
      },
      defaultActiveCategoryIndex: {
        type: Number,
        default: 0,
        validate: (value) => {
          return value > 0;
        }
      },
      categories: { // 所有分组
        type: Array,
        required: true,
        default: () => {
          return [];
        }
      },
      gallery: { // 服务器端图片库
        type: Object,
        required: true,
        default: () => {
          return {};
        }
      },
      message: {
        type: Object,
        default: () => {
          return {};
        }
      },
      delayRedirectAfterSessionExpired: {
        type: Number,
        default: 1000
      },
      appendToBody: {
        type: Boolean,
        default: true
      },

      autoUpload: {
        type: Boolean,
        default: true
      },

      categoryCreationUrl: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        initialUploader: {},
        initialGallery: {},
        initialMessage: {},
        initialCategories: {},
        isUploadFromLocal: false,
        selectedCategory: '',
        activeCategory: {}, // 当前高亮的分组
        pickUps: [], // 已选择的图片列表
        keyword: '',
        loading: true,
        currentPage: 1,
        imageUrl: '',
        uploadedImageList: [],
        isImagePreview: false,
        previewImageURL: '',
        visible: this.$props.value
      };
    },
    created() {
      this.mergeProps2Data();
    },
    computed: {
      alreadyPickUpAmount() {
        let result = [];
        let { initialGallery: { formattedList } } = this.$data;
        for (let subList of formattedList.entries()) {
          for (let item of subList[1].entries()) {
            if (item[1].selected) {
              result.push(item[1]);
            }
          }
        }
        return result.length;
      },
      totalPages() {
        let {pageSize, totalCount} = this.$data.initialGallery;
        return parseInt((totalCount - 1) / pageSize, 10) + 1;
      },
      uploadAction() {
        let { initialUploader: { action, constructAction }, selectedCategory } = this.$data;
        if (Object.prototype.toString.call(constructAction) !== '[object Function]') {
          return action;
        }

        return constructAction(action, selectedCategory) || action;
      },
      actualHeaders() {
        let { initialUploader: { headers, constructHeaders } } = this.$data;

        if (Object.prototype.toString.call(constructHeaders) !== '[object Function]') {
          return headers;
        }

        return constructHeaders(headers) || headers;
      }
    },
    methods: {
      mergeProps2Data() {
        const { defaultUploaderConfiguration, defaultGalleryConfiguration, defaultMessageConfiguration } = this.$options;
        const { uploader, gallery, message, categories} = this.$props;

        Object.assign(this.$data, {
          initialUploader: Object.assign({}, defaultUploaderConfiguration, uploader),
          initialGallery: Object.assign({}, defaultGalleryConfiguration, gallery, {
            formattedList: this.formatGallery(gallery.list)
          }),
          initialMessage: Object.assign({}, defaultMessageConfiguration, message),
          initialCategories: {
            list: categories,
            formattedList: this.formatCategories(categories)
          }
        });
      },
      formatMessage(key, params) {
        let { initialMessage } = this.$data;
        if (!initialMessage[key]) {
          return key;
        }

        if (!isArray(params)) {
          params = [params];
        }

        return initialMessage[key].replace(/{\d}/g, () => params.splice(0, 1));
      },
      formatGallery(list = []) {
        let result = [];
        let subList = [];
        for (let [index, item] of list.entries()) {
          subList.push(Object.assign({}, item, {selected: false}));
          if ((index + 1) % 5 === 0 || (index === list.length - 1)) {
            result.push(subList);
            subList = [];
          }
        }
        return result;
      },
      formatCategories(categories = []) {
        let { defaultActiveCategoryIndex } = this.$props;
        let result = [];
        let activeCategoryIndex = defaultActiveCategoryIndex > categories.length ? 0 : defaultActiveCategoryIndex;
        for (let [index, item] of categories.entries()) {
          result[index] = Object.assign({}, item, {active: activeCategoryIndex === index});
        }

        let activeCategory = result[activeCategoryIndex] || {};
        this.$data.activeCategory = activeCategory;
        this.$data.selectedCategory = activeCategory.id;

        return result;
      },
      toggleActiveCategory(index) {
        let {initialCategories: { formattedList }} = this.$data;
        let activeItem = {};
        for (let [i, item] of formattedList.entries()) {
          if (i === index) {
            item.active = true;
            activeItem = item;
          } else {
            item.active = false;
          }
        }

        Object.assign(this.$data, {
          loading: true,
          currentPage: 1,
          activeCategory: activeItem
        });

        this.$emit('toggleCategory', activeItem);
      },
      pickUp(index, subIndex) {
        let {alreadyPickUpAmount, maximumPickUpAmount, initialGallery: { formattedList }} = this;

        if (formattedList[index][subIndex].selected) {
          formattedList[index][subIndex].selected = false;
        } else {
          if (alreadyPickUpAmount >= maximumPickUpAmount) {
            this.$message.error(this.formatMessage('exceedMaximumPickUpAmountMessage', maximumPickUpAmount));
          } else {
            formattedList[index][subIndex].selected = true;
          }
        }
      },
      imageRemoveHandler(file, fileList) {
        // do nothing
      },
      pictureCardPreviewHandler(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      parsePercentage(val) {
        return parseInt(val, 10);
      },
      searchGalleryHandler() {
        let {keyword, activeCategory} = this.$data;
        if (!keyword || !keyword.trim()) {
          this.$message.error(this.$data.initialMessage.emptySearchKeywordMessage);
          return false;
        }
        Object.assign(this.$data, {
          loading: true,
          currentPage: 1
        });
        this.$emit('searchGallery', {keyword, activeCategory});
      },
      pageChangeHandler(plus) {
        let { activeCategory, keyword, initialGallery: { pageSize } } = this.$data;
        this.$data.currentPage += plus;
        this.$data.loading = true;
        this.$emit(plus > 1 ? 'nextPage' : 'previousPage', {
          currentPage: this.$data.currentPage,
          pageSize,
          activeCategory,
          keyword
        });
      },
      afterDialogCloseHandler() {
        this.$emit('input', false);
      },
      checkBeforeCloseHandler() {
        let {initialGallery: { formattedList }, uploadedImageList = []} = this.$data;
        let result = [];
        for (let subList of formattedList.entries()) {
          for (let item of subList[1].entries()) {
            if (item[1].selected) {
              result.push(item[1]);
            }
          }
        }

        result = result.concat(uploadedImageList);

        if (result.length === 0) { // 图片勾选数量为0 且 上传图片数量为0
          this.$message.error(this.$data.initialMessage.zeroPickUpMessage);
          return false;
        }

        this.$emit('input', false);
        this.$emit('selected', result);
      },
      imagePreviewHandler(file) {
        Object.assign(this.$data, {
          isImagePreview: true,
          previewImageURL: file.url
        });
      },
      deleteUploadedImageHandler(file, domEvent) {
        let {uploadedImageList} = this.$data;
        let index = -1;
        for (let [i, item] of uploadedImageList.entries()) {
          if (item.uid === file.uid) {
            index = i;
          }
        }
        uploadedImageList.splice(index, 1);

        // 删除upload组件中的列表
        let uploadFiles = this.$refs.uploader.uploadFiles;
        uploadFiles.splice(uploadFiles.indexOf(file), 1);

        domEvent.stopPropagation();
      },
      imageUploadedHandler({ return_code, return_msg, return_data }, file, fileList) {
        if (return_code !== 0) {
          this.$message.error(return_msg);
          let uploadFiles = this.$refs.uploader.uploadFiles || [];
          uploadFiles.splice(uploadFiles.indexOf(file), 1);
          return false;
        }

        this.$data.uploadedImageList.push({
          id: file.uid,
          imggroupid: this.$data.selectedCategory,
          ...return_data[0]
        });

        this.afterImageUploadHandler();
      },
      imageUploadExceedHandler() {
        this.$message.error(this.formatMessage('exceedMaximumUploadAmount'));
      },
      beforeImageUploadHandler(file) {
        // eslint-disable-next-line
        return new Promise((resolve) => {
          let { initialUploader, selectedCategory } = this.$data;

          if (selectedCategory === '') {
            this.$message.error(this.formatMessage('unsetUploadImageToCategoryMessage'));
            return false;
          }

          // 兼容limit = 0时，upload.vue中this.limit && this.fileList.length + files.length > this.limit 不生效情况
          if (this.$props.maximumPickUpAmount === this.alreadyPickUpAmount) {
            this.$message.error(this.formatMessage('exceedMaximumUploadAmount'));
            return false;
          }

          // validate image size
          if (file.size > initialUploader.maximumUploadImageSize) {
            this.$message.error(this.formatMessage('exceedMaximumUploadSizeMessage', initialUploader.maximumUploadImageSize / 1024));
            return false;
          }

          // 触发上传接口headers更新
          this.$data.initialUploader.headers = Object.assign({}, this.$data.initialUploader.headers);

          setTimeout(() => {
            resolve();
          }, 500);
        });
      },

      confirmUploadFromLocalHandler() {
        if (this.$data.isUploadFromLocal && !this.$props.autoUpload) {
          // 执行手动上传
          this.$refs.uploader.submit();
          return false;
        }

        this.checkBeforeCloseHandler();
      },

      afterImageUploadHandler() {
        const { isUploadFromLocal, autoUpload, selectedCategory, initialCategories: { formattedList } } = this;
        if (isUploadFromLocal && !autoUpload) {
          let isAllImageUploaded = true;
          (this.$refs.uploader.uploadFiles || []).forEach(item => {
            if (item.status !== 'success') {
              isAllImageUploaded = false;
              return false;
            }
          });

          if (!isAllImageUploaded) {
            return false;
          }

          let uploadedImageLength = this.$data.uploadedImageList.length;
          this.$data.isUploadFromLocal = false;
          // 清空已上传列表
          this.$data.uploadedImageList = [];
          this.$refs.uploader.uploadFiles = [];
          for (let [ index, item ] of formattedList.entries()) {
            if (item.id === selectedCategory) {
              item.imagescount += uploadedImageLength;
              return this.toggleActiveCategory(index);
            }
          }
        }
      },

      /*
       * 非自动上传模式下的图片文件会经过两次合法性校验
       * 1.当文件首次被选择时进行校验（afterBrowseImageHandler）；
       * 2.当文件在被上传前再次进行校验（beforeImageUploadHandler）；
       *
       * 自动上传模式下的图片文件只会经过一次合法性校验
       * 1.当文件在被上传前进行校验（beforeImageUploadHandler）；
       *
       */

      afterBrowseImageHandler(file, list) {
        const {
          initialUploader: {
            maximumUploadImageSize
          },
          maximumPickUpAmount,
          alreadyPickUpAmount,
          isUploadFromLocal,
          autoUpload
        } = this;

        let isValid = true;
        let message = '';

        if (isUploadFromLocal && !autoUpload && file.status === 'ready') {
          if (maximumPickUpAmount === alreadyPickUpAmount) {
            message = this.formatMessage('exceedMaximumUploadAmount');
            isValid = false;
          } else if (file.size > maximumUploadImageSize) {
            message = this.formatMessage('exceedMaximumUploadSizeMessage', maximumUploadImageSize / 1024);
            isValid = false;
          }

          if (!isValid) {
            this.$message.error(message);
            list.splice(list.indexOf(file), 1);
            return false;
          }
        }
      },

      imageUploadErrorHandler({ status, message }, file, fileList) {
        if (status === 401) {
          try {
            const { return_msg, return_data } = JSON.parse(message);
            this.$message.error(return_msg);
            if (return_data) {
              setTimeout(() => {
                window.location.href = return_data;
              }, this.$props.delayRedirectAfterSessionExpired);
            }
          } catch (e) {
            console.warn(e);
          }
        } else {
          this.$message.error(this.formatMessage('commonImageUploadErrorMessage'));
        }
      },

      localImageLoadedHandler({ srcElement }) {
        srcElement.className += srcElement.naturalWidth > srcElement.naturalHeight ? ' is-autoHeight' : ' is-autoWidth';
      }
    },
    watch: {
      gallery(nGallery) {
        Object.assign(this.$data, {
          loading: false,
          initialGallery: Object.assign({
            formattedList: this.formatGallery(nGallery.list)
          }, this.$options.defaultGalleryConfiguration, nGallery)
        });
      },
      categories(nCategories) {
        Object.assign(this.$data, {
          loading: false,
          initialCategories: {
            list: nCategories,
            formattedList: this.formatCategories(nCategories)
          }
        });
      },
      uploader(nUploader) {
        Object.assign(this.$data, {
          initialUploader: Object.assign({}, this.$options.defaultUploaderConfiguration, nUploader)
        });
      },
      value(visible) {
        this.$data.visible = visible;

        // reset other state when dialog invisible
        if (!visible) {
          this.$refs.uploader.clearFiles();
          this.$data.initialCategories.formattedList = this.formatCategories(this.$props.categories);
          this.$data.initialGallery.formattedList = this.formatGallery(this.$props.gallery.list);
          Object.assign(this.$data, {
            isUploadFromLocal: false,
            pickUps: [],
            keyword: '',
            currentPage: 1,
            uploadedImageList: [],
            isImagePreview: false
          });
        }
      }
    }
  };
</script>
