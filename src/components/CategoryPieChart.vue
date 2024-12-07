
<script setup lang="ts">
import { DoughnutChart } from 'vue-chart-3';
import {Chart, ChartData, registerables} from "chart.js";
import {ref, watch} from "vue";
import {CATEGORIESALES} from "../types";
import LoadingSpinner from "./LoadingSpinner.vue";

Chart.register(...registerables);

  const myStyles = {
    responsive:true,
    height: 40
  }
const {categorySales = [], loading} = defineProps<{
  categorySales: CATEGORIESALES[],
  loading:boolean
}>()

const chartData = ref<ChartData<"doughnut">>({
  labels: [],
  datasets: [
    {
      data: [],
      backgroundColor: ['#77CEFF', '#0079AF', '#123E6B', '#97B0C4', '#A5C8ED'],
    },
  ],
});

watch(
    () => categorySales,
    (newData) => {
      chartData.value.labels = newData.map((item:CATEGORIESALES) => item.category);
      chartData.value.datasets[0].data = newData.map((item) => item.percentage);

    },
    { immediate: true,deep: true }
);





</script>

<template>
  <div class="bg-white rounded-lg p-3">
  <h1 class="text-lg font-bold mb-2">Ventes par catégorie</h1>
    <LoadingSpinner v-if="loading"/>
    <div v-else-if="!categorySales.length">
      <span>Aucune donnée à afficher</span>
    </div>
  <DoughnutChart :chartData="chartData" :style="myStyles" class="h-[200px]" v-else/>
  </div>
</template>
