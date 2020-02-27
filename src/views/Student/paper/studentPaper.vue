<template>
  <div class="index">
    <div>
      <el-button style="float:right"
                 @click="paperPop"
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
    <PaperPop :data='paperData'></PaperPop>
  </div>
</template>


<script>
import PaperPop from './popUp/PaperPop'
// import { getStudent } from '@/Api/teacher.js'
import moment from 'moment'
export default {
  name: 'list',
  data () {
    return {
      currentData: [],
      pageSize: 100,



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

  },
  methods: {
    paperPop () {
      this.paperData.show = true

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