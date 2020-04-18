<template>
  <el-dialog :title='title'
             :destroy-on-close="true"
             :visible.sync="remarkData.show"
             :close-on-click-modal='false'
             @close='closeRemark'
             ref="remark"
             width="80%">
    <el-form ref="form"
             :model="sizeForm"
             :rules="rules"
             label-width="150px"
             size="mini">

      <el-form-item label="论文题目">
        <el-input v-model="remarkData.data.title"
                  disabled=""></el-input>
      </el-form-item>
      <el-form-item label="类型">
        <el-input v-model="remarkData.data.type"
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

      <!-- <el-form-item v-for="(i,item) in selectedFormats"
                    :key="item"
                    :label="item">
        <el-input v-model="selectedFormats[item]"></el-input>
      </el-form-item> -->
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
        <el-radio-group v-model="selectedContents[item]['amend']">
          <el-radio label="大改">大改</el-radio>
          <el-radio label="小改">小改</el-radio>
          <el-radio label="缺失">缺失</el-radio>
        </el-radio-group>
        <div class="text"> 详细：</div>
        <el-input class="input"
                  v-model="selectedContents[item]['text']"></el-input>
        <!-- ------------------------------------------------------------------多选框 -->
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

import { appraise } from '@/Api/teacher.js'
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

      // 管理  选题背景、目的意义，  相关理论与模型 ，模型分析优化与验证，模型应用或实例分析，结论，参考文献
      // 开发  '开发背景、目的、意义', '相关方法与技术', '功能设计与系统实现', 重点模块和功能,'小结归纳','参考文献'
      // 算法   选题背景、目的意义 相关理论基础、算法改进与优化、仿真实验与结果分析 结论
      selectedFormats: {},
      formats: ['字体', '标题', '页面设置', '表格', '图片', '所有格式仔细对照'],
      selectedContents: {},
      // contents: ['题目', '中文摘要与关键词', '开发背景', '相关方法与技术', '功能设计与系统实现', '参考文献',],
      rules: {
        rate: [
          { required: true, message: "不能为空！" }
        ],

      }

    };
  },

  methods: {
    closeRemark () {

      this.sizeForm = {
        format: [],
        formatContent: '',
        contents: [],
        content: '',
        rate: 0
      }
      this.selectedFormats = {}
      this.selectedContents = {}

    },
    contentsChange (i) {
      if (this.selectedContents[i]) {
        delete this.selectedContents[i]
        this.selectedContents = Object.assign({}, this.selectedContents)
      } else {
        this.selectedContents[i] = {          amend: '小改'
        }
        this.selectedContents = Object.assign({}, this.selectedContents)
      }
    },
    formatsChange (i) {
      if (this.selectedFormats[i]) {
        delete this.selectedFormats[i]
        this.selectedFormats = Object.assign({}, this.selectedFormats)
      } else {
        this.selectedFormats[i] = {}
        this.selectedFormats = Object.assign({}, this.selectedFormats)
      }
    },
    onSubmit (form) {

      console.log('a', this.sizeForm)
      console.log('b', this.selectedContents)
      let str = ''
      for (let i in this.selectedContents) {
        str = str + i + '#'
        for (let j in this.selectedContents[i]) {
          str = str + this.selectedContents[i][j] + '#'
        }
        str = str + '&'
      }

      this.$refs[form].validate(valid => {
        if (valid) {
          let appraiseId = this.remarkData.data.appraiseId
          let type = 2
          let score = this.sizeForm.rate
          let contentLabels = str
          let formatLabels = this.sizeForm.format.join(',')
          let format = this.sizeForm.formatContent
          let content = this.sizeForm.content
          let taskThesisId = this.remarkData.data.id

          appraise({ appraiseId, type, score, contentLabels, formatLabels, format, content, taskThesisId }).then((res) => {
            this.remarkData.show = false
            this.$emit('getData')

          })
        }
      });
    }
  },
  computed: {
    title () {
      return `点评 ${this.remarkData.data.stuName} 的论文`
    },

    contents () {

      if (this.remarkData.data.type == '管理类') {
        return ['选题背景,目的意义', '相关理论与模型', '模型分析优化与验证', '模型应用或实例分析', '结论,参考文献']
      } else if (this.remarkData.data.type == '算法类') {
        return ['选题背景,目的意义', '相关理论基础', '算法改进与优化', '仿真实验与结果分析', '结论']
      } else {
        return ['开发背景,目的,意义', '相关方法与技术', '功能设计与系统实现', '重点模块和功能', '小结归纳', '参考文献']
      }
    },
  },
};
</script>

<style  scoped>
.input {
  width: 500px;
  margin-right: 20px;
}
.text {
  display: inline-block;
  margin: 0 10px 0 30px;
}
</style>