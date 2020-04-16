<template>
  <el-dialog :title='title'
             :visible.sync="appraiseData.show"
             :close-on-click-modal='false'
             width="80%">
    <el-form ref="form"
             :model="sizeForm"
             :rules="rules"
             label-width="150px"
             size="mini">

      <el-form-item label="论文题目">
        <el-input v-model="appraiseData.data.title"
                  disabled=""></el-input>
      </el-form-item>
      <el-form-item label="类型">
        <el-input v-model="appraiseData.data.type"
                  disabled=""></el-input>
      </el-form-item>
      <!-- ------------------------------------格式 -->
      <el-divider content-position="center">格式</el-divider>
      <el-form-item label="格式问题"
                    prop="">
        <div>{{ sizeForm.formatLabels}}</div>
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
        <!-- <el-input v-model="selectedContents[item]"></el-input> -->
      </el-form-item>
      <el-form-item label="内容具体问题">
        {{sizeForm.content}}
      </el-form-item>
      <!--  -->
      <el-form-item label="评价"
                    style="margin:30px 0;"
                    prop="rate">
        <div :class='{green:scoreStyle,red:!scoreStyle}'>{{score}}</div>

      </el-form-item>
      <el-form-item size="large">
        <el-button type="primary"
                   @click="onSubmit('form')">立即创建</el-button>
        <el-button @click="appraiseData.show=false">取消</el-button>
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

    }
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
</style>