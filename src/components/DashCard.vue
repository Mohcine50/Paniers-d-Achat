<script setup lang="ts">

const { title, data, clas } = defineProps<{ title: String,
  data: string , clas:string}>()
</script>

<template>

  <div class="bg-white border border-opacity-80 rounded-lg px-4 py-5 flex flex-col gap-4 grow " :class="clas">
    <h4 class="font-medium text-md">{{title}}</h4>
    <h5 class="font-bold text-md text-center">{{data}}</h5>
  </div>

</template>

