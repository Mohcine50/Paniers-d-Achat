<script setup lang="ts">

import DashCard from "../components/DashCard.vue";
import {onMounted, ref, watch} from "vue";
import {CATEGORIESALES, DASHDATA, FILTER, PRODUCT, TRENDPRODUCT} from "../types";
import {fetchData, formatPrice} from "../utils";
import CategoryPieChart from "../components/CategoryPieChart.vue";
import ProductsBarChart from "../components/ProductsBarChart.vue";
import LoadingSpinner from "../components/LoadingSpinner.vue";

const dataFilter :{value: FILTER, text: string}[]= [{value: "week", text:'7 derniers jours'}, {value: "month", text: '30 derniers jours'}, {value: "year", text:'12 derniers mois'}]

const selectedFilter = ref<FILTER>('year');

const loading = ref<boolean>(true)
const loadingProducts = ref<boolean>(true)

const dashData = ref<DASHDATA>({
  totalSales: 0,
  totalCategories: 0,
  totalProducts: 0,
  totalOrders: 0
})

const categoriesData = ref<CATEGORIESALES[]>([]);

const trendingProducts = ref<TRENDPRODUCT[]>([])
const products = ref<PRODUCT[]>([])

const loadAnalytics = async () => {
  loading.value = true
  try {
    const [dash, categories, trending] = await Promise.all([
      fetchData(`/analytics/total_sales?duration=${selectedFilter.value}`),
      fetchData(`/analytics/category_sales?duration=${selectedFilter.value}`),
      fetchData(`/analytics/trending_products?duration=${selectedFilter.value}`),
    ]);
    dashData.value = dash;
    categoriesData.value = categories;
    trendingProducts.value = trending;
    loading.value = false
  } catch (error) {
    console.error("Error loading anaylytics data:", error);
  }
};

const loadProducts = async () => {
  try {
    loadingProducts.value = true

    const productList = await fetchData(`/products`)

    products.value = productList;
    loadingProducts.value = false

  } catch (error) {
    console.error("Error loading prodcuts list:", error);
  }
};


watch(() => selectedFilter.value, loadAnalytics);

onMounted(loadAnalytics);
onMounted(loadProducts);

</script>

<template>
  <div class="flex flex-col w-full">
    <div class="border-b border-gray-200 shadow-sm bg-white h-[10vh] flex items-center px-6">
      <h1 class="font-medium text-md">Tableau de bord</h1>
    </div>

    <div class="p-6 overflow-y-scroll h-[90vh] flex flex-col gap-4">
      <select
          id="filterSelect"
          v-model="selectedFilter"
          class="bg-white border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ml-auto block p-2"
      >
        <option disabled value="">Veuillez sélectionner un filtre</option>
        <option v-for="(filter, index) in dataFilter" :value="filter.value" :key="index">{{ filter.text }}</option>
      </select>
      <div class="flex items-center justify-between gap-4">
        <DashCard clas="bg-blue-200" title="Ventes totales" :data="formatPrice(dashData.totalSales)"/>
        <DashCard clas="bg-yellow-200" title="Nombre de produits" :data="dashData.totalProducts.toString()"/>
        <DashCard clas="bg-green-200" title="Nombre de catégories" :data="dashData.totalCategories.toString()"/>
        <DashCard clas="bg-purple-300" title="Commandes totales" :data="dashData.totalOrders.toString()"/>
      </div>

      <div class="grid grid-cols-2 gap-5">
        <div class="rounded-lg gap-5 flex-col flex">
          <CategoryPieChart :categorySales="categoriesData" :loading="loading"/>
          <ProductsBarChart :products="products" :loading="loadingProducts"/>
        </div>
        <div class="bg-white rounded-lg p-3 h-fit">
          <h1 class="text-lg font-bold">Produits en tendance</h1>
          <div v-if="loading">
            <LoadingSpinner />
          </div>
          <div v-else-if="!trendingProducts.length">
            <span>Aucune donnée à afficher</span>
          </div>
          <div class="flex flex-col gap-2" v-else>
            <div class="flex flex-col gap-0.5" v-for="(product) in trendingProducts" :key="product._id">
              <div class="flex justify-between items-center">
                <h4 class="text-md font-medium">{{ product.productName }}</h4>
                <h5 class="text-md font-medium">{{ product.totalQuantitySold }}</h5>
              </div>
              <div class="flex justify-between items-center">
                <p class="text-sm text-gray-400">{{ product.category }}</p>
                <p class="text-sm text-gray-400">{{ formatPrice(product.totalSalesAmount) }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

