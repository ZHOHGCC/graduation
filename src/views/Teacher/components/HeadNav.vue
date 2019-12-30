<template>
  <div>
    <header class="head-nav">
      <div style="width:1200px;margin:auto;min-width:1000px">
        <div class="title">欢迎您 {{user.tutorName}} 老师</div>
        <div class="NavLink">
          <div class="Nav">HTML,CSS</div>
          <div class="Nav">JavaScript</div>
          <div class="Nav">计算机网络</div>
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
        <el-menu-item index="/teacher/task">发布任务</el-menu-item>
        <el-menu-item index="/teacher/paper">论文审核</el-menu-item>
        <el-menu-item index="/teacher/report">开题审核</el-menu-item>
      </el-menu>
    </div>
  </div>
</template>
<script>
export default {
  name: "head-nav",
  data () {
    return {
      user: this.$store.state.user,
      activeIndex: '/teacher/list'
    }
  },
  computed: {


  },
  methods: {

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
  width: 25rem;
}
.b {
  float: left;
  /* min-width: 800px; */
  height: 1rem;
}
.Nav:hover {
  color: #4abf8a;
}
</style>

