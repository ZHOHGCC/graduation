<template>
  <div class="index">
    <HeadNav></HeadNav>
    <div class="rightContainer">
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>


<script>
import HeadNav from './components/HeadNav';
import Footer from './components/footer'
export default {
  name: 'index',
  components: {
    HeadNav,
    Footer
  },

}
</script>
<style  scoped>
.index {
  width: 100%;
  height: 100%;
}
.content {
  padding: 20px;
}
.rightContainer {
  min-height: 700px;
  width: 1200px;
  margin: auto;
  min-width: 1000px;
}
</style>