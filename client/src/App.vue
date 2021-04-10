<template>
  <div id="app">
    <div id="toi"></div>
    <div id="toi_message"></div>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";

export default {
  name: "App",
  components: {
    HelloWorld,
  },
  async created() {
    const a = await this.$indicative(
      { toi: "4d34" },
      require("@/validation/RouteItems.js")
    );
    if (!a.valid) return;
    console.log(1, a);
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
