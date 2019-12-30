<template>
  <div class="index">
    <div>
      <el-button type="success"
                 @click="showSenior"
                 plain>2019届</el-button>
      <el-button type="success"
                 @click="showJunior"
                 plain>2020届</el-button>
      <el-input v-model="selectWord"
                class="select"
                @input='select'
                placeholder="请输入学号或者姓名"></el-input>
      <el-button type="primary">搜索</el-button>
    </div>
    <el-table :data="tableData"
              stripe
              style="width: 100%">
      <el-table-column prop="stuId"
                       label="学号">
      </el-table-column>
      <el-table-column prop="stuName"
                       label="姓名">
      </el-table-column>
      <el-table-column prop="classes"
                       label="班级">
      </el-table-column>
      <el-table-column prop="major"
                       label="系">
      </el-table-column>
      <el-table-column prop="phone"
                       label="电话">
      </el-table-column>
      <el-table-column prop="QQ"
                       label="QQ">
      </el-table-column>
      <el-table-column prop="finish"
                       align="center"
                       label="任务完成度">
        0/0
      </el-table-column>
    </el-table>
  </div>
</template>


<script>
import { getStudent } from '@/Api/teacher.js'
import moment from 'moment'
export default {
  name: 'list',
  data () {
    return {
      tableData: [],
      pageNum: 1,
      pageSize: 100,
      senior: [],
      junior: [],
      selectWord: '',
    }
  },
  components: {

  },
  computed: {
    date () {
      return moment().format('YYYY')
    }
  },
  created () {
    let pageSize = this.pageSize
    let pageNum = this.pageNum

    getStudent({ pageSize, pageNum }).then((res) => {
      let arr = res.data.list
      for (let i of arr) {
        let a = String(i.stuId).slice(0, 4)
        if (a == '2015') {
          this.senior.push(i)
        } else {
          this.junior.push(i)
        }
      }
      this.tableData = this.senior
    })
  },
  methods: {
    select (e) {
      console.log(typeof e)
      let arr = [...this.senior, ...this.junior]
      let result = []
      for (let i of arr) {
        if (String(i.stuId).indexOf(e) !== -1 || i.stuName.indexOf(e) !== -1) {
          result.push(i)
        }
      }
      this.tableData = result
    },
    showJunior () {
      this.tableData = this.junior
    },
    showSenior () {
      this.tableData = this.senior
    }
  }
}
</script>
<style  scoped>
.index {
  width: 100%;
  /* height: 100%; */
}
.select {
  width: 200px;
  margin: 0 0 0 20px;
}
</style>