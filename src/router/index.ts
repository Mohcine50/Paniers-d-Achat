import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '../page/dashboard.vue';
import Products from "../page/products.vue";
import Support from "../page/support.vue";
import Categories from "../page/categories.vue";


const routes = [
    { path: '/', name: 'Dashboard', component: Dashboard },
    { path: '/products', name: 'Products', component: Products },
    { path: '/support', name: 'Support', component: Support },
    { path: '/categories', name: 'Categories', component: Categories },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
