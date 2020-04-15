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
                       width="380px"
                       align="center"
                       label="介绍">
      </el-table-column>
      <el-table-column prop="type"
                       label="类型">
        <template slot-scope="scope">

          {{scope.row.type==2 ? '任务': '公告'  }}
        </template>
      </el-table-column>
      <el-table-column prop="endTime"
                       width="180px"
                       label="截止时间">
        <template slot-scope="scope">
          {{scope.row.type==2 ? scope.row.endTime : '暂无'  }}
        </template>
      </el-table-column>
      <el-table-column prop="finished"
                       align="center"
                       label="文件下载">
        <template slot-scope="scope">

          <button v-if="scope.row.oldFileName"
                  type="success">
            <el-link target="_blank"
                     :href='scope.row.filePath'
                     :download='scope.row.oldFileName'>点击下载</el-link>
          </button>
          <div v-if="!scope.row.oldFileName">无</div>
        </template>
      </el-table-column>
      <el-table-column prop="finished"
                       align="center"
                       width="200px"
                       label="操作">
        <template slot-scope="scope">
          <div v-if="scope.row.type==2">
            <a class="file"><input type="file"
                     accept=".zip,.pdf,.doc,.docx"
                     @change="getFile($event,scope.$index)">选择文件</a>
            <el-button class="submit"
                       @click="submit($event,scope.$index)">提交</el-button>
          </div>
          <div v-if="!(scope.row.type==2)">
            暂无
          </div>
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
import { getTask } from '@/Api/student.js'
import { sendFile } from '@/Api/common.js'
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
      fileLists: [],
      //需要给分页组件传的信息
      paginations: {
        page_index: 1, // 当前位于哪页
        total: 0, // 总数
        page_size: 10, // 1页显示多少条
        page_sizes: [10, 15], //每页显示多少条
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

    let pageSize = this.pageSize
    let pageNum = this.pageNum

    getTask({ pageSize, pageNum }).then((res) => {
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
      this.tableData = this.allData
      this.setPaginations()
    })

  },
  methods: {
    submit (e, index) {
      if (this.fileLists[index]) {
        let formData = new FormData()
        let file = this.fileLists[index]
        formData.append('file', file)
      }
    },
    getFile (e, index) {
      this.fileLists[index] = event.target.files[0];
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
    changeList (type) {
      this.tableData = this.type.get(type)
      this.setPaginations()
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
.file {
  position: relative;
  display: inline-block;
  background: #d0eeff;
  border: 1px solid #99d3f5;
  border-radius: 4px;
  margin-top: 1rem;
  padding: 9px 12px;
  overflow: hidden;
  color: #1e88c7;
  text-decoration: none;
  text-indent: 0;
  line-height: 20px;
  margin-right: 1r;
}
.file input {
  position: absolute;
  font-size: 100px;
  right: 0;
  top: 0;
  opacity: 0;
}
.file:hover {
  background: #aadffd;
  border-color: #78c3f3;
  color: #004974;
  text-decoration: none;
}
.submit {
  margin-bottom: 1rem;
  float: right;
  margin-top: 1rem;
}
</style>