<template>
  <div class="index">
    <div>
      <el-radio v-model="radio1"
                :label="index"
                border
                v-for="(i,index) in grade"
                :key="index"
                @change="changeList(i[0])">{{i[0]}} 级</el-radio>
      <el-input v-model="selectWord"
                class="select"
                @input='select'
                placeholder="请输入学号或者姓名"></el-input>
      <el-button type="primary">搜索</el-button>

      <el-button type="success">批量下载</el-button>
    </div>
    <el-table :data="currentData"
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
      <el-table-column prop=""
                       label="论文类型">
      </el-table-column>
      <el-table-column prop=""
                       label="论文题目">
      </el-table-column>
      <el-table-column prop="QQ"
                       width="200px"
                       align="center"
                       label="文件">
        <template slot-scope="scope">
          <el-button size="mini"
                     @click="remark(scope.$index, scope.row)">PDF阅览</el-button>
          <el-button size="mini"
                     @click="remark(scope.$index, scope.row)">下载</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="
                       finish"
                       align="center"
                       label="评价">
        <template slot-scope="scope">
          <el-button size="mini"
                     @click="remark(scope.$index, scope.row)">点评</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-col :span="24">
      <div class="pagination">
        <el-pagination v-if="paginations.total > 0"
                       :page-sizes="paginations.page_sizes"
                       :page-size="paginations.page_size"
                       :layout="paginations.layout"
                       :total="paginations.total"
                       :current-page.sync="paginations.page_index"
                       @current-change="handleCurrentChange"
                       @size-change="handleSizeChange"></el-pagination>
      </div>
    </el-col>
    <Remark :remarkData='remarkData'></Remark>
  </div>
</template>


<script>
import Remark from './popUp/remark'
import { getStudent, getPaper } from '@/Api/teacher.js'
import moment from 'moment'
export default {
  name: 'list',
  data () {
    return {
      tableData: [],
      pageNum: 1,
      radio1: '',
      pageSize: 100,
      grade: {},
      selectWord: '',
      allData: [],
      currentData: [],
      //需要给分页组件传的信息
      paginations: {
        page_index: 1, // 当前位于哪页
        total: 0, // 总数
        page_size: 25, // 1页显示多少条
        page_sizes: [10, 15, 20, 25], //每页显示多少条
        layout: "total, sizes, prev, pager, next, jumper" // 翻页属性
      },
      remarkData: {
        show: false,
        data: {}
      }
    }
  },

  components: {
    Remark
  },
  computed: {
    date () {
      return moment().format('YYYY')
    }
  },
  created () {
    let pageSize = this.pageSize
    let pageNum = this.pageNum

    getPaper({ pageSize, pageNum, searchType: '' }).then((res) => {
      console.log(res)
      // this.allData = res.data.list
      // let map = new Map()
      // for (let i of this.allData) {
      //   if (map.has(i.grade)) {
      //     map.set(i.grade, [...map.get(i.grade), i])
      //   } else {
      //     map.set(i.grade, [i])
      //   }
      // }
      // this.grade = map
      // this.tableData = this.allData
      // this.setPaginations()
    })
  },
  methods: {
    remark (index, row) {
      this.remarkData.show = true
      const { stuName, stuId } = row
      this.remarkData.data = { stuId, stuName }
    },
    select (e) {
      let result = []
      for (let i of this.allData) {
        if (String(i.stuId).indexOf(e) !== -1 || i.stuName.indexOf(e) !== -1) {
          result.push(i)
        }
      }
      this.tableData = result
      this.setPaginations()
    },
    changeList (grade) {
      this.tableData = this.grade.get(grade)
      this.setPaginations()
    },
    //分页
    handleCurrentChange (page) {
      // 当前页
      let sortnum = this.paginations.page_size * (page - 1);
      let table = this.tableData.filter((item, index) => {
        return index >= sortnum;
      });
      // 设置默认分页数据
      this.currentData = table.filter((item, index) => {
        return index < this.paginations.page_size;
      });
    },
    handleSizeChange (page_size) {
      // 切换size
      this.paginations.page_index = 1;
      this.paginations.page_size = page_size;
      this.currentData = this.tableData.filter((item, index) => {
        return index < page_size;
      });
    },
    setPaginations () {
      // 总页数
      this.paginations.total = this.tableData.length;
      this.paginations.page_index = 1;
      this.paginations.page_size = 25;
      // 设置默认分页数据
      this.currentData = this.tableData.filter((item, index) => {
        return index < this.paginations.page_size;
      });
    },
  }
}
</script>
<style  scoped>
.index {
  margin-bottom: 15px;
  width: 100%;
  /* height: 100%; */
}
.select {
  width: 200px;
  margin: 0 0 0 20px;
}
.pagination {
  text-align: center;
  margin-top: 10px;
}
</style>