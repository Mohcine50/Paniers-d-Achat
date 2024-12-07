<script setup lang="ts">
import {PRODUCT} from "../types";
import {formatPrice} from "../utils";
import LoadingSpinner from "./LoadingSpinner.vue";
import {computed, ref} from "vue";

const { products, loading } = defineProps<{ products: PRODUCT[], loading: boolean }>();

// Pagination state
const currentPage = ref(1);
const itemsPerPage = ref(10); // Adjust the number of items per page

// Calculate total pages
const totalPages = computed(() => {
  return Math.ceil(products.length / itemsPerPage.value);
});

// Get the current page's products
const currentPageProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return products.slice(start, end);
});

// Change page
const goToPage = (page: number) => {
  if (page < 1 || page > totalPages.value) return; // Prevent going beyond available pages
  currentPage.value = page;
};
</script>

<template>
  <div class="p-4">
    <h2 class="text-2xl font-semibold mb-4">Product List</h2>

    <div class="h-full overflow-y-scroll">
      <div class="max-h-full overflow-y-auto">
        <table class="w-full table-auto border-collapse">
          <thead class="sticky top-0 bg-white">
          <tr class="border-b border-gray-300">
            <th class="p-3 text-left text-md font-medium text-gray-500">Nom du produit</th>
            <th class="p-3 text-left text-md font-medium text-gray-500">Categorie</th>
            <th class="p-3 text-left text-md font-medium text-gray-500">Ventes totales</th>
          </tr>
          </thead>
          <LoadingSpinner v-if="loading" />
          <tbody v-else>
          <tr
              v-for="(product, index) in currentPageProducts"
              :key="index"
              class="hover:bg-gray-50 border-b border-gray-200"
          >
            <td class="p-3 text-sm font-medium">{{ product.ProductName }}</td>
            <td class="p-3 text-sm font-medium">{{ product.Category }}</td>
            <td class="p-3 text-sm font-medium">{{ formatPrice(product.Price) }}</td>
          </tr>
          </tbody>
        </table>


        <div class="mt-4 flex justify-center space-x-2" v-if="products.length">
          <button
              :disabled="currentPage === 1"
              @click="goToPage(currentPage - 1)"
              class="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
          >
            Précédent
          </button>
          <span class="flex items-center">
            {{ currentPage }} / {{ totalPages }}
          </span>
          <button
              :disabled="currentPage === totalPages"
              @click="goToPage(currentPage + 1)"
              class="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
          >
            Suivant
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

