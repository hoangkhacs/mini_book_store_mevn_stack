import { createWebHistory, createRouter } from "vue-router";
import HomeBook from "../views/HomeBook.vue";
import AdminBook from "../views/AdminBook.vue";

const routes = [
    {
        path: "/",
        name: "homebook",
        component: HomeBook,
    },
    {
        path: "/product/:idCategory",
        name: "productCategory",
        component: HomeBook,
    },
    {
        path: "/admin",
        name: "adminbook",
        component: AdminBook,
    },
    {
        path: '/admin/category',
        name: 'category.add',
        component: () => import("../views/CategoryAdd.vue"),
        props: true, // Truyền các biến trong $route.params vào làm props
    },
    {
        path: '/admin/category/update/:id',
        name: 'categoryUpdate',
        component: () => import("../views/CategoryUpdate.vue"),
        props: true, // Truyền các biến trong $route.params vào làm props
    },
    {
        path: '/admin/product',
        name: 'product.add',
        component: () => import("../views/ProductAdd.vue"),
        props: true, // Truyền các biến trong $route.params vào làm props
    },
    {
        path: '/admin/product/update/:id',
        name: 'productUpdate',
        component: () => import("../views/ProductUpdate.vue"),
        props: true, // Truyền các biến trong $route.params vào làm props
    },
    {
        path: "/:pathMatch(.*)*",
        name: "notfound",
        component: () => import("../views/NotFound.vue"),
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});


export default router;