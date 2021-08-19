<template>
  <div>
    <p class="font-semibold">{{ formData.value }}</p>
  </div>
</template>

<script>
export default {
  name: "FormRight.vue",
  // masih sama menggunakan computed
  computed: {
    formData() {
      // hati hati ini dalam bentuk Object
      return this.$store.state.formData;
    },
  },
};
</script>

<style scoped></style>
