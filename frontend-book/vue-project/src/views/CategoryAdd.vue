<template>
    <div class="page">
        <CategoryForm :category="category" @submit:category="uploadCategory" />
        <p>{{ message }}</p>
    </div>
</template>
<script>
import CategoryForm from '../component/admin/CategoryForm.vue';
import CategoriesService from '../services/categories.service';

export default {
    components: {
        CategoryForm
    },
    data() {
        return {
            category: {},
            message: ""
        }
    },
    methods: {
        async uploadCategory(data) {
            try {
                console.log(data.file);
                await CategoriesService.create(data)
                this.message = "Thể loại đã được thêm vào."
            }
            catch (error) {
                console.log(error)
            }
        }
    },


}
</script>
