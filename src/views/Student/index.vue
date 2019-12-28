<template>
  <div class="index">

    <div class="rightContainer">
      <router-view></router-view>
    </div>
    <Footer></Footer>
  </div>
</template>


<script>

import Footer from '../../components/footer'
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
  /* height: 100%; */
}
.rightContainer {
  height: calc(100% - 60px);
  background-color: #efefef;
}
</style>