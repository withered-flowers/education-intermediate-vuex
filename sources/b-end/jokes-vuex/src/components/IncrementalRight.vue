<template>
  <div>
    <!-- Setelah didefinisikan pada computed, kita tinggal memanggilnya di sini saja -->
    <p class="font-semibold">{{ initialNumber }}</p>
  </div>
</template>

<script>
export default {
  name: "IncrementalRight",
  computed: {
    // Data perubahan yang ada pada store tidak disimpan di bagian "data"
    // namun disimpan pada "computed" !

    // pada bagian ini kita hanya akan mengakses state initialNumber
    // sehingga di sini hanya butuh return state initialNumber saja
    initialNumber() {
      // ingat pada main.js, vuex disimpan dengan nama "store"
      // sehingga kita dapat memanggilnya dengan this.$store
      return this.$store.state.initialNumber;
    },
  },
};
</script>

<style scoped></style>
