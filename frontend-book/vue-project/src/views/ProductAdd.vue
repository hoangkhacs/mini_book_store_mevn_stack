<template>
    <div class="page">
        <h4>Thêm sách mới</h4>
        <ProductForm :product="product" :categories="categories" @submit:product="uploadProduct" />
        <p>{{ message }}</p>
    </div>
</template>
<script>
import ProductForm from '../component/admin/ProductForm.vue';
import ProductService from '../services/products.service';
import CategoriesService from "../services/categories.service";


export default {
    components: {
        ProductForm
    },
    data() {
        return {
            product: {},
            categories: [],
            message: ""
        }
    },
    methods: {
        async uploadProduct(data) {
            console.log(data)
            try {
                await ProductService.createProduct(data)
                this.message = "Sách đã được thêm mới."
            }
            catch (error) {
                console.log(error)
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
    mounted() {
        this.getAllCategories()
    }


}
</script>
<style>

</style>