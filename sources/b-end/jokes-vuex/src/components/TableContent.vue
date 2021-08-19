<template>
  <tbody>
    <tr>
      <td class="border border-gray-300">{{ joke.id }}</td>
      <td class="border border-gray-300">{{ joke.setup }}</td>
      <td class="border border-gray-300">{{ joke.punchline }}</td>
    </tr>
  </tbody>
</template>

<script>
export default {
  name: "TableContent",
  props: ["joke"],
};
</script>

<style scoped></style>
