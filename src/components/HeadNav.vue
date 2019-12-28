<template>
  <header class="head-nav">
    <div style="width:1200px;margin:auto;min-width:1000px">
      <div class="title"
           @click="toHome">天才小熊猫</div>

      <div class="NavLink">
        <div class="Nav">HTML,CSS</div>
        <div class="Nav">JavaScript</div>
        <div class="Nav">计算机网络</div>

      </div>
    </div>

  </header>
</template>
<script>
export default {
  name: "head-nav",
  computed: {


  },
  methods: {

  }
};
</script>

<style scoped>
.head-nav {
  display: flex;
  /* width: 100%; */
  height: 2.2rem;
  min-width: 600px;
  /* padding: 0 0 0 20px; */
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

