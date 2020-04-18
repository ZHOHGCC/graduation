<template>
  <el-dialog :visible.sync="infoData.show"
             width="80%">
    <el-form ref="form"
             :model="sizeForm"
             label-width="150px"
             size="mini">

      <el-form-item label="学号">
        {{sizeForm.stuId}}
      </el-form-item>
      <el-form-item label="姓名">
        {{sizeForm.stuName}}
      </el-form-item>
      <el-form-item label="电话">
        {{sizeForm.phone}}
      </el-form-item>
      <el-form-item label="QQ">
        <a :href='toQQ(sizeForm.qq)'>{{sizeForm.qq}}</a>
      </el-form-item>
      <el-form-item label="email">
        {{sizeForm.email}}
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script>

import { getStudent } from '@/Api/teacher.js'
export default {
  name: "logfound",
  props: {
    infoData: Object,
  },

  data () {
    return {
      sizeForm: {}
    };
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      getStudent({ pageSize: 100, pageNum: 1 }).then((res) => {
        console.log(res)
        let id = this.infoData.data.stuId
        console.log(id)
        let data = res.data.list.find((item) => {
          return item.stuId == id
        })
        this.sizeForm = data
      })
    },
    toQQ (qq) {
      const res = `tencent://message/?uin=${qq}&Site=&Menu-=yes`
      return res
    },
  },
  computed: {

  },
};
</script>

<style  scoped>
</style>