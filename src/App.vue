<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>

export default {
  name: "app",
  created () {
    if (localStorage.Authentication) {
      const eleToken = localStorage.Authentication
      this.$store.dispatch("setIsAuthenticated", !this.isEmpty(eleToken));
      this.$store.dispatch("setUser", eleToken);
    }
  },
  methods: {
    isEmpty (value) {
      return (
        value === undefined ||
        value === null ||
        (typeof value === "object" && Object.keys(value).length === 0) ||
        (typeof value === "string" && value.trim().length === 0)
      );
    }
  }
};
</script>


<style>
#app {
  overflow: scroll;
}
</style>
