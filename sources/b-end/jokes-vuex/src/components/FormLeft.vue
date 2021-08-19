<template>
  <!--  tambahkan event submit prevent terhadap method yang sudah dibuat -->
  <form action="#" @submit.prevent="submitFormHandler">
    <div>
      <!-- 3. binding input dengan localDataForm -->
      <input
        type="text"
        placeholder="Just write me"
        class="shadow appearance-none border rounded py-2 px-3 text-gray-700"
        v-model="localFormData.name"
      />
    </div>
    <div class="mt-4">
      <button
        type="submit"
        class="
          bg-gray-100
          py-2
          px-4
          rounded-md
          hover:bg-gray-300 hover:shadow-md
        "
      >
        Transfer Me
      </button>
    </div>
  </form>
</template>

<script>
export default {
  name: "FormLeft.vue",
  // 1. di sini kita akan mendefinisikan data lokal terlebih dahulu
  data() {
    return {
      // 2. data ini akan dibinding pada input yang ada di atas
      localFormData: {
        name: "",
      },
    };
  },
  // 4. Siapkan method untuk submit form
  methods: {
    submitFormHandler() {
      // kita di sini hanya perlu melemparkan data ke mutation yang ada
      // parameter kedua adalah si payload yang dibutuhkan

      // ingat pada state yang ada, nama propsnya adalah "value", bukan "name"
      this.$store.commit("FORM_HANDLER", { value: this.localFormData.name });
    },
  },
};
</script>

<style scoped></style>
