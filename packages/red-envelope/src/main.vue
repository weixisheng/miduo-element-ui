<template>
  <el-dialog
    custom-class="el-red-envelope"
    :append-to-body="appendToBody"
    width="900px"
    :visible.sync="visible"
    :title="title"
    top="7vw"
    @closed="afterDialogCloseHandler"
    ref="dialog"
  >
    <template slot="title">
      <span class="el-dialog__title">{{title}}</span>
      <el-divider direction="vertical"></el-divider>
      <el-button type="text" @click="openNewWindowHandler">新建红包</el-button>
    </template>

    <div class="el-red-envelope__inline-statement">可选择的红包类型仅支持红包零钱，并且红包金额不能为随机金额~</div>

    <el-form :model="formElement" :inline="true" :disabled="loading">

      <el-form-item label="关键字：">
        <el-input v-model="formElement.input" autocomplete="off" size="large" placeholder="红包ID、使用说明" clearable></el-input>
      </el-form-item>

      <el-button
        plain
        type="primary"
        size="medium"
        @click="searchHandler"
        icon="el-icon-search"
      >
        搜索
      </el-button>
    </el-form>

    <el-table
      v-loading="loading"
      :data="initialRedEnvelope.list"
      header-row-class-name="el-red-envelope__table-header"
      style="width: 100%;"
      height="560px"
    >
      <el-table-column
        class-name="el-red-envelope__table-column"
        prop="id"
        label="红包ID"
        align="center"
        width="80"
      >
      </el-table-column>
      <el-table-column
        class-name="el-red-envelope__table-column"
        label="红包金额"
        align="center"
        :formatter="formatRedEnvelopeValue"
      >
      </el-table-column>

      <el-table-column
        class-name="el-red-envelope__table-column"
        label="使用说明"
        align="center"
      >
        <template slot-scope="scope">
          <el-colorful-tags
            type="text"
            :contents="[scope.row.instructions]"
            :ellipsisThreshold="1"
            :ellipsisWidth="scope.column.realWidth - 25"
          >
          </el-colorful-tags>
        </template>
      </el-table-column>
      <el-table-column
        class-name="el-red-envelope__table-column"
        label="操作"
        align="center"
        width="150"
      >
        <template slot-scope="scope">
          <span v-if="scope.row.type === 0">随机红包不能选择</span>
          <el-button plain type="primary" size="mini" @click="pickUpHandler(scope.row)" v-else>选择</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      @size-change="updatePageSizeHandler"
      @current-change="updatePageIndexHandler"
      :current-page="initialRedEnvelope.pageindex"
      :page-sizes="$props.availablePageSize"
      :page-size="initialRedEnvelope.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="initialRedEnvelope.totalcount"
      :disabled="loading"
    ></el-pagination>
  </el-dialog>
</template>
<script>
  import Locale from 'miduo-element-ui/src/mixins/locale';

  export default {
    defaultRedEnvelopeConfiguration: {
      list: [],
      pageindex: 1,
      pagesize: 10,
      totalcount: 0
    },
    name: 'ElRedEnvelope',
    mixins: [Locale],
    inheritAttrs: false,
    props: {
      title: { // 红包库名称
        type: String,
        default: '选择红包'
      },
      value: Boolean, // 控制红包库显示与否
      redEnvelope: { // 红包对象
        type: Object,
        required: true,
        default: () => {
          return {};
        }
      },
      availablePageSize: {
        type: Array,
        default: () => {
          return [10, 20, 30, 40, 50, 100];
        }
      },
      currency: {
        type: String,
        default: '¥'
      },
      createRedEnvelopeURL: {
        type: String,
        required: true
      },
      decimalFixedDigits: {
        type: Number,
        default: 2
      },

      appendToBody: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        formElement: {
          input: ''
        },
        initialRedEnvelope: {},
        loading: true,
        visible: this.$props.value,
        searchParams: {}
      };
    },
    created() {
      // custom event binding
      this.$on('updateSearchParameters', this.updateSearchParametersHandler);
      this.$on('updateRedEnvelope', this.updateRedEnvelopeHandler);
      this.$on('updateLoadingStatus', this.updateLoadingStatusHandler);
      this.$on('updateFormElement', this.updateFormElementHandler);

      this.mergeProps2Data();
    },

    methods: {
      mergeProps2Data() {
        let { defaultRedEnvelopeConfiguration } = this.$options;
        let { redEnvelope } = this.$props;

        this.$emit('updateRedEnvelope', Object.assign({}, defaultRedEnvelopeConfiguration, redEnvelope));
      },

      formatRedEnvelopeValue({ minmoney, maxmoney, type}) {
        let { decimalFixedDigits } = this.$props;

        if (typeof minmoney === 'undefined') {
          return '';
        }

        return [
          this.$props.currency,
          minmoney.toFixed(decimalFixedDigits),
          (type === 1 ? '' : (' ~ ' + maxmoney.toFixed(decimalFixedDigits)))
        ].join('');
      },

      openNewWindowHandler() {
        window.open(this.$props.createRedEnvelopeURL);
      },

      pickUpHandler(item) {
        this.$emit('input', false);
        this.$emit('selected', item);
      },

      afterDialogCloseHandler() {
        this.$emit('input', false);
      },

      updateLoadingStatusHandler(loading = true) {
        this.$data.loading = loading;
      },

      updateRedEnvelopeHandler(props = {}) {
        this.$data.initialRedEnvelope = Object.assign({}, this.$data.initialRedEnvelope, props);
      },

      updatePageIndexHandler(pageindex) {
        this.$emit('updateRedEnvelope', { pageindex });
        this.$emit('updateSearchParameters');
        this.$emit('updateLoadingStatus');

        this.$emit('conditionsUpdated', this.$data.searchParams);
      },

      updatePageSizeHandler(pagesize) {
        this.$emit('updateRedEnvelope', { pageindex: 1, pagesize });
        this.$emit('updateSearchParameters');
        this.$emit('updateLoadingStatus');

        this.$emit('conditionsUpdated', this.$data.searchParams);
      },

      searchHandler() {
        this.$emit('updateRedEnvelope', { pageindex: 1 });
        this.$emit('updateSearchParameters', true);
        this.$emit('updateLoadingStatus');

        this.$emit('conditionsUpdated', this.$data.searchParams);
      },

      updateSearchParametersHandler(mergeFormElement) {
        let { formElement: { input }, initialRedEnvelope: { pageindex, pagesize } } = this.$data;
        this.$data.searchParams = Object.assign({}, this.$data.searchParams, {
          pageindex,
          pagesize
        }, mergeFormElement ? {
          keywordvalue: input
        } : {});
      },

      updateFormElementHandler() {
        this.$data.formElement = Object.assign({}, this.$data.formElement, {
          input: ''
        });
      }
    },

    watch: {
      redEnvelope(value) {
        this.$emit('updateLoadingStatus', false);
        this.$emit('updateRedEnvelope', Object.assign({}, this.$options.defaultRedEnvelopeConfiguration, value));
      },
      value(visible) {
        this.$data.visible = visible;

        // reset other state when dialog invisible
        if (!visible) {
          this.$emit('updateLoadingStatus');
          this.$emit('updateFormElement');
          this.$emit('updateRedEnvelope', this.$options.defaultRedEnvelopeConfiguration);
          this.$emit('updateSearchParameters', true);
        }
      }
    }
  };
</script>
