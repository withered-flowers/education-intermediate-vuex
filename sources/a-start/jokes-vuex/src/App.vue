<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <div class="container flex flex-col mx-auto">
      <!-- Incremental Section -->
      <div class="mx-auto py-4">
        <h3 class="font-bold">Incremental Section</h3>
      </div>
      <div class="flex flex-row mx-auto py-4">
        <incremental-left class="mr-4"></incremental-left>
        <incremental-right class="ml-4 my-auto"></incremental-right>
      </div>
      <!-- Form Section -->
      <div class="mx-auto py-4">
        <h3 class="font-bold">Form Section</h3>
      </div>
      <div class="flex flex-row mx-auto py-4">
        <form-left class="mr-4"></form-left>
        <form-right class="ml-4 my-auto"></form-right>
      </div>
      <!-- Table Section -->
      <div class="mx-auto py-4">
        <h3 class="font-bold">Table Section</h3>
      </div>
      <div class="mx-auto">
        <table-list></table-list>
      </div>
    </div>
    <!-- <router-view /> -->
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

<script>
import FormLeft from "./components/FormLeft.vue";
import FormRight from "./components/FormRight.vue";
import IncrementalLeft from "./components/IncrementalLeft.vue";
import IncrementalRight from "./components/IncrementalRight.vue";
import TableList from "./components/TableList.vue";

export default {
  components: {
    IncrementalLeft,
    IncrementalRight,
    FormLeft,
    FormRight,
    TableList,
  },
};
</script>
