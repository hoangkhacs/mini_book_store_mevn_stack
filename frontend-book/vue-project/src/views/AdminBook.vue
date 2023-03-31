<template>
    <div class="border mt-10 row">
        <div class="">
        </div>
        <div class="col-2">
            <div class="bg-primary">
                <a href="#" class="list-group-item list-group-item-action active">
                    Collections
                </a>
                <a class="list-group-item list-group-item-action list-group-item-success"
                    @click="activeProduct">Sách</a>
                <a class="list-group-item list-group-item-action list-group-item-success" @click="activeCateggory">Thể
                    loại</a>
            </div>
        </div>
        <div class="col-8">
            <TableCollection v-if="filteredCollectionCount() > 0" :list=this.list :activeCollection="activeCollection"
                v-model:activeIndex="activeIndex">
            </TableCollection>
        </div>
    </div>
    <div class="col-auto-md">
        <router-link :to="{
            name: 'homebook',
        }">
            <button class="m-4 btn btn-info"> <i class="fa-solid fa-house-user"></i>Trang chủ</button>
        </router-link>
    </div>
</template>

<script>

import TableCollection from '../component/admin/TableCollection.vue';
import CategoriesService from "../services/categories.service";
import ProductService from "../services/products.service";


export default {
    components: {
        TableCollection
    },
    data() {
        return {
            list: [],
            activeIndex: -1,
            activeCollection: ''
        };
    },
    methods: {

        async retrieveProduct() {
            try {
                this.list = await ProductService.getAllProduct();
            } catch (error) {
                console.log(error);
            }
        },
        async retrieveCategory() {
            try {
                this.list = await CategoriesService.getAllCategories();
            } catch (error) {
                console.log(error);
            }
        },
        async activeProduct() {
            this.activeCollection = 'product'
            this.retrieveProduct()
        },
        async activeCateggory() {
            this.activeCollection = 'category'
            this.retrieveCategory()
        },
        filteredCollectionCount() {
            return this.list.length;
        },
        test() {
            return 1
        }
    },
    mounted() {
        // this.retrieveProduct()
    },
}
</script>