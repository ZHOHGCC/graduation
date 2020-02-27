<template>
  <el-dialog :title='title'
             :visible.sync="remarkData.show"
             :close-on-click-modal='false'
             width="80%">
    <el-form ref="form"
             :model="sizeForm"
             :rules="rules"
             label-width="150px"
             size="mini">

      <el-form-item label="论文题目"
                    prop="title">
        <el-input v-model="remarkData.data.paperName"
                  disabled=""></el-input>
      </el-form-item>
      <!-- ------------------------------------格式 -->
      <el-divider content-position="center">格式</el-divider>
      <el-form-item label="格式问题"
                    prop="">
        <el-checkbox-group v-model="sizeForm.format">
          <el-checkbox-button v-for="i in formats"
                              :label="i"
                              @change="formatsChange(i)"
                              :key="i">{{i}}</el-checkbox-button>
        </el-checkbox-group>
      </el-form-item>
      <!-- --------------------------------------------------------- 格式具体 -->

      <el-form-item v-for="(i,item) in selectedFormats"
                    :key="item"
                    :label="item">
        <el-input v-model="selectedFormats[item]"></el-input>
      </el-form-item>
      <el-form-item label="格式具体问题">
        <el-input type="textarea"
                  v-model="sizeForm.formatContent"></el-input>
      </el-form-item>
      <!--  -->
      <el-divider content-position="center">内容</el-divider>
      <el-form-item label="内容问题"
                    prop="">
        <el-checkbox-group v-model="sizeForm.contents">
          <el-checkbox-button v-for="i in contents"
                              :checked='false'
                              @change="contentsChange(i)"
                              :label="i"
                              :key="i">{{i}}</el-checkbox-button>
        </el-checkbox-group>
      </el-form-item>
      <!-- --------------------------------------------------------- 内容具体 -->
      <el-form-item v-for="(i,item) in selectedContents"
                    :key="item"
                    :label="item">
        <el-input v-model="selectedContents[item]"></el-input>
      </el-form-item>
      <el-form-item label="内容具体问题">
        <el-input type="textarea"
                  v-model="sizeForm.content"></el-input>
      </el-form-item>
      <!--  -->
      <el-form-item label="评价"
                    style="margin:30px 0;"
                    prop="rate">
        <el-rate v-model="sizeForm.rate"
                 style="margin-top:5px"
                 show-text>
        </el-rate>
      </el-form-item>
      <el-form-item size="large">
        <el-button type="primary"
                   @click="onSubmit('form')">立即创建</el-button>
        <el-button @click="remarkData.show=false">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script>
export default {
  name: "logfound",
  props: {
    remarkData: Object,
  },

  data () {
    return {
      sizeForm: {
        format: [],
        formatContent: '',
        contents: [],
        content: '',
        rate: 0
      },
      selectedFormats: {},
      formats: ['字体', '标题', '页面设置'],
      selectedContents: {},
      contents: ['题目', '中文摘要与关键词', '开发背景', '相关方法与技术', '功能设计与系统实现', '参考文献',],
      rules: {
        rate: [
          { required: true, message: "不能为空！" }
        ],

      }

    };
  },

  methods: {
    contentsChange (i) {
      if (this.selectedContents[i]) {
        delete this.selectedContents[i]
        this.selectedContents = Object.assign({}, this.selectedContents)
      } else {
        this.selectedContents[i] = ' '
        this.selectedContents = Object.assign({}, this.selectedContents)
      }
    },
    formatsChange (i) {
      if (this.selectedFormats[i]) {
        delete this.selectedFormats[i]
        this.selectedFormats = Object.assign({}, this.selectedFormats)
      } else {
        this.selectedFormats[i] = ' '
        this.selectedFormats = Object.assign({}, this.selectedFormats)
      }
    },
    onSubmit (form) {
      console.log(this.sizeForm.rate)
      this.$refs[form].validate(valid => {
        if (valid) {


        }
      });
    }
  },
  computed: {
    title () {
      return `点评 ${this.remarkData.data.stuName} 的论文`
    },

  },
};
</script>

<style  scoped>
.a {
}
</style>