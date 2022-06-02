<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
}

html {
  width: 100vw;
  height: 100vh;
}
</style>
