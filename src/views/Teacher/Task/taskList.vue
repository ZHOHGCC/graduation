<template>
  <div class="index">
    <div>
      <el-radio v-model="radio1"
                :label="index"
                border
                v-for="(i,index) in type"
                :key="index"
                @change="changeList(i[0])"> {{i[0]==2? '任务':'公告'  }} </el-radio>
    </div>
    <el-table :data="currentData"
              stripe
              style="width: 100%">
      <el-table-column prop="name"
                       label="任务名称">
      </el-table-column>
      <el-table-column prop="description"
                       width="400px"
                       label="介绍">
      </el-table-column>
      <el-table-column prop="type"
                       label="类型">
        <template slot-scope="scope">

          {{scope.row.type==2 ? '任务': '公告'  }}
        </template>
      </el-table-column>
      <el-table-column prop="QQ"
                       width="200px"
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
      <el-table-column prop="endTime"
                       label="截止时间">
        <template slot-scope="scope">

          {{scope.row.type==2 ? scope.row.endTime : '暂无'  }}
        </template>
      </el-table-column>

      <el-table-column prop="finished"
                       align="center"
                       label="任务完成度">
        <template slot-scope="scope">
          <div v-show="scope.row.type==2">
            <el-button type="success"
                       @click="showDetail(scope.row)">{{scope.row.finished }}</el-button>
          </div>
          <div v-show="!(scope.row.type==2)"> 暂无</div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini"
                     type="danger"
                     @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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

  </div>
</template>


<script>

import { getStudent, getTask, delTask } from '@/Api/teacher.js'
import moment from 'moment'
export default {
  name: 'list',
  data () {
    return {

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


    this.getData()

  },
  methods: {
    showDetail (row) {

      this.$router.push({
        path: `/teacher/TeacherTaskDetail/${row.id}&${row.name}`,
      })


    },
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
    getData () {
      let pageSize = this.pageSize
      let pageNum = this.pageNum
      getTask({ pageSize, pageNum }).then((res) => {
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