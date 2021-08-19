<template>
  <!-- Setelah didefinisikan di bawah, kita tinggal memanggil methodnya di sini  -->
  <button
    class="bg-gray-100 py-2 px-4 rounded-md hover:bg-gray-300 hover:shadow-md"
    @click="changeIncremental"
  >
    Increment
  </button>
</template>

<script>
export default {
  name: "IncrementalLeft",
  // kita akan membuat sebuah method terlebih dahulu
  methods: {
    changeIncremental() {
      // kita akan memanggil mutation CHANGE_INCREMENTAL
      // dengan menggunakan store.commit

      // anggap saja store.commit seperti emit, tapi untuk memanggil mutation
      this.$store.commit("CHANGE_INCREMENTAL");
    },
  },
};
</script>

<style scoped></style>
