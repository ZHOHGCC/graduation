<template>
  <div>
    <header class="head-nav">
      <div style="width:1200px;margin:auto;min-width:1000px">
        <div class="title">欢迎您 {{user.name}} 老师</div>
        <div class="NavLink">
          <div class="Nav"><a href="http://jiaowu.sicau.edu.cn/"
               target="_blank">教务处</a></div>
          <div class="Nav"><a href="http://eol.sicau.edu.cn"
               target="_blank">课程平台</a></div>

          <div class="Nav">
            <el-button type="danger"
                       round
                       @click="quit">退出</el-button>
          </div>
        </div>
      </div>
    </header>
    <div style="width:1200px;margin:auto;min-width:1000px">
      <el-menu class="el-menu-demo"
               background-color="#337AB7"
               active-text-color="#4abf8a"
               text-color='#fff'
               :router='true'
               mode="horizontal">
        <el-menu-item index="/teacher/list">学生名单</el-menu-item>
        <!-- <el-submenu index="2">
          <template slot="title">任务</template>
          <el-menu-item index="/teacher/taskList">查看任务</el-menu-item>
          <el-menu-item index="/teacher/task">发布任务</el-menu-item>

        </el-submenu> -->
        <el-menu-item index="/teacher/taskList">查看任务</el-menu-item>
        <el-menu-item index="/teacher/task">发布任务</el-menu-item>
        <el-menu-item index="/teacher/paper">论文审核</el-menu-item>
        <!-- <el-menu-item index="/teacher/report">开题审核</el-menu-item> -->
        <el-submenu style="float:right"
                    index="3">
          <template slot="title">修改信息</template>
          <el-menu-item index="/teacher/teacherPassWorld">修改密码</el-menu-item>
          <el-menu-item index="/teacher/information">个人信息</el-menu-item>

        </el-submenu>
      </el-menu>

    </div>
  </div>
</template>
<script>
export default {
  name: "head-nav",
  data () {
    return {
      activeIndex: '/teacher/list',
      user: {}
    }
  },
  computed: {
  },
  mounted () {



  },
  created () {

    this.user = { ...this.$store.state.user }
  },
  methods: {
    quit () {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      this.$router.push('/login')
    }
  }
};
</script>

<style scoped>
.head-nav {
  display: flex;
  height: 2.2rem;
  min-width: 600px;
  background: #fff;
  border-bottom: 1px solid #eaecef;
  vertical-align: middle;
  line-height: 2.2rem;
  padding: 10px 10px 10px 50px;
  min-width: 500px;
  /* position: fixed；; */
}
.title {
  /* float: left;
   */
  cursor: pointer;
  display: inline-block;
  font-size: 1.1rem;
  color: #2c3e50;
  font-weight: 600;
  /* margin-left: 20px; */
}
.Nav {
  flex: 1;
  margin: 0 40px 0 0;
  cursor: pointer;
  font-weight: 500;
  text-decoration: none;
  /* text-align: center; */
}
.NavLink {
  margin-left: auto;
  padding-left: 1.5rem;
  box-sizing: border-box;
  background-color: #fff;
  white-space: nowrap;
  font-size: 0.7rem;
  float: right;
  display: flex;
  width: 20rem;
}
.b {
  float: left;
  /* min-width: 800px; */
  height: 1rem;
}
a:hover {
  color: #4abf8a;
}
a {
  text-decoration: none;
  color: #000;
}
</style>

