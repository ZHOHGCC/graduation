<template>
  <el-dialog :title='title'
             :visible.sync="appraiseData.show"
             width="80%">
    <el-form ref="form"
             :model="sizeForm"
             :rules="rules"
             label-width="150px"
             size="mini">

      <el-form-item label="论文题目：">

        {{appraiseData.data.title}}
      </el-form-item>
      <el-form-item label="类型：">
        {{appraiseData.data.type}}
      </el-form-item>
      <!-- ------------------------------------格式 -->
      <el-divider content-position="center">格式</el-divider>
      <el-form-item label="格式问题"
                    prop="">
        <el-button round
                   v-for="(i,index) in sizeForm.formatLabels"
                   :key="index">{{i}}</el-button>
      </el-form-item>
      <!-- --------------------------------------------------------- 格式具体 -->

      <!-- <el-form-item v-for="(i,item) in selectedFormats"
                    :key="item"
                    :label="item">
        <el-input v-model="selectedFormats[item]"></el-input>
      </el-form-item> -->
      <el-form-item label="格式具体问题">
        {{sizeForm.format}}
      </el-form-item>
      <!--  -->
      <el-divider content-position="center">内容</el-divider>
      <!-- <el-form-item label="内容问题"
                    prop="">

      </el-form-item> -->
      <!-- --------------------------------------------------------- 内容具体 -->
      <el-form-item v-for="(i,item) in sizeForm.contentLabels"
                    :key="item"
                    :label="item">
        <div :class="{detaill:true,red:textStyle(i[0]),yellow:(!textStyle(i[0]))}">{{i[0]}}</div>
        <div class="contentDetail">建议：{{i[1]}}</div>
      </el-form-item>
      <el-form-item label="内容具体问题">
        {{sizeForm.content}}
      </el-form-item>
      <!--  -->
      <el-form-item label="评价"
                    style="margin:30px 0;"
                    prop="rate">
        <div :class='{green:scoreStyle,red:!scoreStyle,detaill:true}'>{{score}}</div>

      </el-form-item>
      <el-form-item size="large">

        <el-button type="primary"
                   @click="appraiseData.show=false">返回</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script>

import { appraise, getAppraise } from '@/Api/teacher.js'
export default {
  name: "logfound",
  props: {
    appraiseData: Object,
  },

  data () {
    return {
      green: false,
      sizeForm: {

      },
      // selectedFormats: {},
      // formats: ['字体', '标题', '页面设置'],
      // selectedContents: {},
      // contents: ['题目', '中文摘要与关键词', '开发背景', '相关方法与技术', '功能设计与系统实现', '参考文献',],
      rules: {
        rate: [
          { required: true, message: "不能为空！" }
        ],

      }

    };
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {

      // return false
      getAppraise(this.appraiseData.data.appraiseId).then((res) => {
        console.log(res)
        this.sizeForm = res.data
        let arr = res.data.contentLabels.substring(0, res.data.contentLabels.length - 1).split('&')
        let obj = {}
        arr.forEach((item) => {
          let i = item.substring(0, item.length - 1).split('#')
          obj[i[0]] = [i[1], i[2]]
        })
        console.log(obj)
        this.sizeForm.contentLabels = obj
        this.sizeForm.formatLabels = this.sizeForm.formatLabels.split(',')
      })
    },

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

    },
    textStyle (type) {
      if (type == '小改') {
        return false
      } else {
        return true
      }
    },
  },
  computed: {

    scoreStyle () {
      if (this.sizeForm.score >= 3) {
        return this.green = true
      } else {
        return this.green = false
      }
    },
    score () {
      switch (this.sizeForm.score) {
        case 1:
          return '极差'
        case 2:
          return '失望'
        case 3:
          return '一般'
        case 4:
          return '不错';
        case 5:
          return '满意'
      }
    },
    title () {
      return `点评 ${this.appraiseData.data.stuName} 的论文`
    },

  },
};
</script>

<style  scoped>
.a {
}
.green {
  color: green;
}
.red {
  color: red;
}
.contentDetail {
  display: inline-block;
  margin-left: 100px;
}
.yellow {
  color: orange;
}
.detaill {
  margin-left: 20px;
  display: inline-block;
}
</style>