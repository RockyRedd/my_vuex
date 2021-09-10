<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <p>{{ this.$store.state.name }}</p>
    <p>{{ this.$store.state.age }}</p>
    <p>{{ this.$store.getters.getHobbies }}</p>
    <button @click="$store.commit('addAge', 1)">年龄加1</button>
    <button @click="$store.dispatch('addHobby', 'basketball')">添加爱好</button>
  </div>
</template>

<script>
export default {
  name: 'App',
  created() {
    window.app = this
  },
}
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
