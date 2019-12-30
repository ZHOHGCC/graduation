<template>
  <footer class="foot">
    <ul>
      <li>蜀ICP备19027474号</li>
      <li>Designed and developed by zhong cheng.</li>
      <li>Copyright © 2019-2020 钟诚. All Rights Reserved.</li>
    </ul>
  </footer>
</template>
<script>
export default {
  name: "foot-nav",
  computed: {


  },
}
</script>

<style scoped>
.foot {
  height: 100px;

  text-align: center;
  width: 100%;
}
ul {
  list-style: none;
}
li {
  color: var(--color-font);
  opacity: 0.4;
  font-family: "plantc", "Source Han Serif", serif;
  margin-top: 10px;
}
</style>

