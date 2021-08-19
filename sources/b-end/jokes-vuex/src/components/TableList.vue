<template>
  <table class="table-fixed w-full border-collapse border border-gray-300">
    <thead>
      <tr class="bg-gray-100">
        <th class="w-1/6 border border-gray-300">ID</th>
        <th class="w-1/3 border border-gray-300">Setup</th>
        <th class="w-1/3 border border-gray-300">Punchline</th>
      </tr>
    </thead>
    <!-- lakukan v-for seperti kondisi normal -->
    <table-content
      v-for="joke in jokes"
      :key="'joke' + joke.id"
      :joke="joke"
    ></table-content>
  </table>
</template>

<script>
import TableContent from "./TableContent.vue";

export default {
  components: { TableContent },
  name: "TableList",
  beforeCreate() {
    // panggil action fetchJokes agar dapat mengambil data yang ada
    // dengan menggunakan store.dispatch

    // anggap saja seperti this.emit, tapi untuk action
    this.$store.dispatch("fetchJokes");
  },
  computed: {
    // kita akan menyimpan state jokes di sini
    jokes() {
      return this.$store.state.jokes;
    },
  },
};
</script>

<style scoped></style>
