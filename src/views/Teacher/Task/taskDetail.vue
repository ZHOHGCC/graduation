<template>
  <div class="index">
    <div>
      <h2>任务名称：{{name}}</h2>
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
      <el-table-column prop="fileName"
                       align="center"
                       label="文件名称">
      </el-table-column>

      <el-table-column width="200px"
                       align="center"
                       label="文件">
        <template slot-scope="scope">
          <div v-show="scope.row.fileId">

            <el-button size="mini">
              <el-link target="_blank"
                       :href='scope.row.filePath'
                       :download='scope.row.oldFileName'>点击下载</el-link>
            </el-button>

          </div>
          <div v-show="!scope.row.fileId">暂无数据</div>
        </template>
      </el-table-column>
      <!-- <el-table-column prop="
                       finish"
                       align="center"
                       label="评价">
        <template slot-scope="scope">
          <div v-show="scope.row.filePath">

            <div v-show="scope.row.appraiseId"
                 style="color:green">

              已点评
            </div>
            <div v-show="!scope.row.appraiseId">
              <el-button size="mini"
                         type="primary"
                         @click="remark(scope.$index, scope.row)">点评</el-button>
            </div>
          </div>
          <div v-show="!scope.row.filePath">暂无数据</div>

        </template>
      </el-table-column> -->
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

  </div>
</template>


<script>

import { getDetail } from '@/Api/teacher.js'
import moment from 'moment'
export default {
  name: 'list',
  data () {
    return {
      name: '',
      tableData: [],
      pageNum: 1,
      radio1: '',
      pageSize: 100,
      type: {},
      selectWord: '',
      allData: [],
      currentData: [],
      //需要给分页组件传的信息
      paginations: {
        page_index: 1, // 当前位于哪页
        total: 0, // 总数
        page_size: 25, // 1页显示多少条
        page_sizes: [10, 15, 25], //每页显示多少条
        layout: "total, sizes, prev, pager, next, jumper" // 翻页属性
      },
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

    let arr = this.$route.params.id.split('&')
    // console.log(arr)
    this.getData(arr[0])
    this.name = arr[1]
  },
  methods: {
    handleDelete (index, row) {
      let res = confirm('确定删除？')
      if (res == true) {
        delTask(row.id).then((res) => {
          console.log(res)
          this.getData()
        })
      }
    },
    //--------------
    getData (id) {

      getDetail(id).then((res) => {
        console.log(res)
        this.allData = res.data.list
        let map = new Map()
        for (let i of this.allData) {
          if (map.has(i.type)) {
            map.set(i.type, [...map.get(i.type), i])
          } else {
            map.set(i.type, [i])
          }
        }
        this.type = map
        // console.log(map)
        this.tableData = map.values().next().value
        this.setPaginations()
      })
    },
    changeList (type) {
      this.tableData = this.type.get(type)
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