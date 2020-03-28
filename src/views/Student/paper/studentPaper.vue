<template>
  <div class="index">
    <div>
      <el-button style="float:right"
                 @click="paperPop"
                 v-show="paginations.total <= 0"
                 type="success">提交论文</el-button>
    </div>
    <el-table :data="currentData"
              stripe
              style="width: 100%">

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
          <el-button size="mini">在线阅览</el-button>
          <el-button size="mini">下载</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="
                       finish"
                       align="center"
                       label="评价">

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

    <PaperPop :data='paperData'
              @getData='getData'></PaperPop>
  </div>
</template>


<script>
import PaperPop from './popUp/PaperPop'
import { getThesis } from '@/Api/student.js'
import moment from 'moment'
export default {
  name: 'list',
  data () {
    return {
      currentData: [],
      pageSize: 200,
      tableData: [],
      paginations: {
        page_index: 1, // 当前位于哪页
        total: 0, // 总数
        page_size: 10, // 1页显示多少条
        page_sizes: [10, 15], //每页显示多少条
        layout: "total, sizes, prev, pager, next, jumper" // 翻页属性
      },

      pageNum: 1,
      paperData: {
        show: false,
        data: {}
      }
    }
  },

  components: {
    PaperPop
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
    paperPop () {
      this.paperData.show = true
    },
    //-------------------或得论文
    getData () {
      let pageSize = this.pageSize
      let pageNum = this.pageNum

      getThesis({ pageSize, pageNum }).then((res) => {
        console.log(res)
      })
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