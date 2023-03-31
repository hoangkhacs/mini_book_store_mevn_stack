<template>
    <div v-if="product" class="page">
        <h4>Cập nhật sách</h4>
        <ProductForm :product="product" :categories="categories" @submit:product="updateProduct" />
        <p>{{ message }}</p>
    </div>
</template>
<script>
import ProductForm from "../component/admin/ProductForm.vue";
import ProductService from "../services/products.service";
import CategoriesService from "../services/categories.service"
export default {
    components: {
        ProductForm,
    },
    props: {
        id: { type: String, required: true },
    },
    data() {
        return {
            product: null,
            message: "",
            categories: []
        };
    },
    methods: {
        async getProduct(id) {
            try {
                this.product = await ProductService.getProduct(id);
            } catch (error) {
                console.log(error);
                // Chuyển sang trang NotFound đồng thời giữ cho URL không đổi
                this.$router.push({
                    name: "notfound",
                    params: {
                        pathMatch: this.$route.path.split("/").slice(1)
                    },
                    query: this.$route.query,
                    hash: this.$route.hash,
                });
            }
            this.product = this.product.data
        },
        async updateProduct(data) {
            try {
                await ProductService.updateProduct(this.product._id, data);
                this.message = "Sách cập nhật thành công.";
            } catch (error) {
                console.log(error);
            }
        },
        async getAllCategories() {
            try {
                this.categories = await CategoriesService.getAllCategories();
            } catch (error) {
                console.log(error);
            }
        },

    },
    created() {
        this.getProduct(this.id);
        this.message = "";
    },
    mounted(){
        this.getAllCategories()
    }
};
</script>