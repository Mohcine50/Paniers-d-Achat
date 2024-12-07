<script lang="ts" setup>
import {  ref, computed } from "vue";
import { Chart, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from "chart.js";
import { BarChart } from "vue-chart-3";
import { PRODUCT} from "../types";
import LoadingSpinner from "./LoadingSpinner.vue";

Chart.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);


const {products = [], loading} = defineProps<{
  products: PRODUCT[],
  loading:boolean
}>()


    const priceRanges = computed(() => {
      const prices = products.map((p) => p.Price);
      const minPrice = Math.min(...prices);
      const maxPrice = Math.max(...prices);
      const rangeSize = (maxPrice - minPrice) / 5;

      return Array.from({ length: 5 }, (_, i) => ({
        min: minPrice + i * rangeSize,
        max: minPrice + (i + 1) * rangeSize,
      }));
    });

    const salesByPriceRange = computed(() => {
      return priceRanges.value.map((range) => {
        const totalSales = products
            .filter((p) => p.Price >= range.min && p.Price < range.max)
            .reduce((sum, p) => sum + p.salesCount, 0);
        return {
          range: `${range.min.toFixed(2)} - ${range.max.toFixed(2)}`,
          sales: totalSales,
        };
      });
    });

    const chartData = computed(() => ({
      labels: salesByPriceRange.value.map((r) => r.range),
      datasets: [
        {
          label: "Sales Count",
          data: salesByPriceRange.value.map((r) => r.sales),
          backgroundColor: "rgba(75, 192, 192, 0.5)",
        },
      ],
    }));

    const chartOptions = ref({
      responsive: true,
      plugins: {
        legend: {
          display: false,
        },
        title: {
          display: false,
        },
      },
    });



</script>




<template>
  <div class="bg-white rounded-lg p-3">
    <h2 class="text-lg font-bold mb-2">Données de ventes par tranche de prix</h2>
    <loading-spinner v-if="loading"/>
    <BarChart
        v-else
        :chart-data="chartData"
        :chart-options="chartOptions"
        style="max-width: 600px; margin: auto;"
    />
  </div>
</template>

