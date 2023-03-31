<script>
import CategoriesService from '../../services/categories.service'
import ProductService from "../../services/products.service";
import AdminBook from '../../views/AdminBook.vue';
import CategoryUpdate from '../../views/CategoryUpdate.vue';
export default {
    props: {
        list: { type: Array, require: true },
        activeCollection: { type: Text, default: '' }
    },
    emits: ["update:activeIndex"],
    methods: {
        updateActiveIndex(index) {
            this.$emit("update:activeIndex", index);
        },
        gotoAddCategory() {
            this.$router.push({ name: "category.add" });
        },
        gotoAddProduct() {
            this.$router.push({ name: "product.add" });
        },
        gotoUpdateCategory(id) {
            this.$router.push({ name: "categoryUpdate", params: { id: id } });
        },
        gotoUpdateProduct(id) {
            this.$router.push({ name: "productUpdate", params: { id: id } });
        },

        async deleteCategory(id) {
            if (confirm("Bạn muốn xóa thể loại này?")) {
                try {
                    await CategoriesService.deleteCategory(id)
                    this.activeCateggory();
                } catch (error) {
                    console.log(error);
                }
            }
        },

        async deleteProduct(id) {
            if (confirm("Bạn muốn xóa sách này?")) {
                try {
                    await ProductService.deleteProduct(id)
                } catch (error) {
                    console.log(error);
                }
            }
        },
        async activeCateggory() {
            this.$root.$emit(activeCateggory)
        },
    },
    watch: {
    }
};
</script>
<template>
    <h4 class="center" v-if="activeCollection == 'product'">Quản Lý Sách</h4>
    <h4 class="center" v-else>Quản Lý Thể Loại Sách</h4>
    <table class="table table-hover" v-if="activeCollection == 'product'">
        <thead>
            <tr>
                <th scope="col" width="150px">Số thứ tự</th>
                <th scope="col">Tên</th>
                <th scope="col">Thể loại</th>
                <th scope="col">Giá</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(l, index) in list" :key="l._id" :class="{ active: index === activeIndex }"
                @click="updateActiveIndex(index)">
                <th scope="row">{{ index + 1 }}</th>
                <td>{{ l.name }}</td>
                <td>{{ l.category }}</td>
                <td>{{ l.price }}</td>
                <td>
                    <button type="button" class="btn btn-danger" @click="deleteProduct(l._id)">Xóa</button>
                </td>
                <td>
                    <button type="button" class="btn btn-success" @click="gotoUpdateProduct(l._id)">Sửa</button>
                </td>
            </tr>
            <tr>
                <td>
                    <button type="button" class="btn btn-info" @click="gotoAddProduct">Thêm mới</button>
                </td>
                <td>
                    <button type="button" class="btn btn-info">Làm mới</button>
                </td>
            </tr>
        </tbody>
    </table>
    <table class="table table-hover" v-else>
        <thead>
            <tr>
                <th scope="col" width="150px">Số thứ tự</th>
                <th scope="col">Thể loại</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(l, index) in list" :key="l._id" :class="{ active: index === activeIndex }"
                @click="updateActiveIndex(index)">
                <th scope="row">{{ index + 1 }}</th>
                <td>{{ l.name }}</td>
                <td>
                    <button type="button" class="btn btn-danger" @click="deleteCategory(l._id)">Xóa</button>
                </td>
                <td>
                    <button type="button" class="btn btn-success" @click="gotoUpdateCategory(l._id)">Sửa</button>
                </td>
            </tr>
            <tr>
                <td>
                    <button type="button" class="btn btn-info" @click="gotoAddCategory">Thêm mới</button>
                </td>
                <td>
                    <button type="button" class="btn btn-info" @click="activeCateggory">Làm mới</button>
                </td>
            </tr>
        </tbody>
    </table>
</template>
