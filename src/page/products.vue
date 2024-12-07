<script setup lang="ts">

import ProductsTable from "../components/ProductsTable.vue";
import {onMounted, ref} from "vue";
import {PRODUCT} from "../types";
import {fetchData} from "../utils";


const products = ref<PRODUCT[]>([])
const laoding = ref<boolean>(true)

const loadData = async () => {
  try {
    laoding.value = true
    const productList = await fetchData("/products/")
    products.value = productList;
    laoding.value = false
  } catch (error) {
    console.error("Error loading data:", error);
  }
};

onMounted(loadData);


</script>

<template>
  <div class="flex flex-col h-full">
    <div class="border-b border-gray-200 shadow-sm bg-white p-6">
      <h1 class="font-medium text-md">Produits</h1>
    </div>
    <div class="bg-white p-4 rounded-md m-3 flex-1 overflow-y-auto">
      <ProductsTable :products="products" :loading="laoding" />
    </div>
  </div>
</template>

