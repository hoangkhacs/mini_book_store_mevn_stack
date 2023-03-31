<template>
    <div v-if="category" class="page">
        <h4>Cập nhật thể loại sách</h4>
        <CategoryUpdate :category="category" @submit:category="updateCategory"/>
        <p>{{ message }}</p>
    </div>
</template>
<script>
import CategoryUpdate from "../component/admin/CategoryUpdate.vue";
import CategoriesService from "../services/categories.service";
export default {
    components: {
    CategoryUpdate,
    CategoryUpdate
},
    props: {
        id: { type: String, required: true },
    },
    data() {
        return {
            category: null,
            message: "",
        };
    },
    methods: {
        async getCategory(id) {
            try {
                this.category = await CategoriesService.getCategory(id);
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
        },
        async updateCategory(data) {
            try {
                await CategoriesService.updateCategory(this.$route.params.id, data);
                this.message = "Thể loại đã được cập nhật thành công.";
            } catch (error) {
                console.log(error);
            }
        },
    },
    created() {
        this.getCategory(this.$route.params.id);
        this.message = "";
    },
};
</script>