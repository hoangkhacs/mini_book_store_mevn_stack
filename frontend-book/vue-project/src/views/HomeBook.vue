<template>
    <div class="border">
        <NavBar :categories=this.categories v-model="searchText"></NavBar>
    </div>
    <div class="container">
        <div class="row">
            <div class="col-9">
                <ListProduct :listProduct="filteredProducts" v-model:activeIndex="activeIndex"></ListProduct>
            </div>
            <!-- <p>{{activeProduct}}</p> -->
            <div class="col-3" v-if="activeProduct">
                <br><br>
                <ProductCard :product="activeProduct" />
            </div>
        </div>
    </div>
</template>

<script>
import NavBar from '../component/NavBar.vue';
import ListProduct from '../component/ListProduct.vue';
import ProductCard from '../component/ProductCard.vue';
import CategoriesService from "@/services/categories.service";
import ProductService from "../services/products.service"

export default {
    components: {
        NavBar,
        ListProduct,
        ProductCard
    },

    data() {
        return {
            categories: [],
            listProduct: [],
            activeIndex: -1,
            searchText: "",
        }
    },

    props: {
        // id: {}
    },

    computed: {
        // Chuyển các đối tượng contact thành chuỗi để tiện cho tìm kiếm.
        productStrings() {
            return this.listProduct.map((product) => {
                const { name, category, public_company } = product;
                return [name, category, public_company].join("").toLowerCase();
            });
        },
        // Trả về các contact có chứa thông tin cần tìm kiếm.
        filteredProducts() {
            if (!this.searchText) {
                return this.listProduct;
            }
            else {
                return this.listProduct.filter((_contact, index) =>
                    this.productStrings[index].includes(this.searchText.toLowerCase())
                );
            }
        },
        activeProduct() {
            if (this.activeIndex < 0) return null;
            return this.filteredProducts[this.activeIndex];
        },
    },
    methods: {
        async getAllCategories() {
            try {
                this.categories = await CategoriesService.getAllCategories();
            } catch (error) {
                console.log(error);
            }
        },
        async retrieveProduct() {
            try {
                console.log(this.$route.params)
                if (this.$route.params.idCategory) {
                    this.listProduct = await ProductService.getAllProduct(this.$route.params.idCategory);
                }
                else {
                    this.listProduct = await ProductService.getAllProduct();
                }
            } catch (error) {
                console.log(error);
            }
        },
    },
    mounted() {
        this.getAllCategories();
        this.retrieveProduct()
    },
    watch: {
        '$route.params.idCategory': {
            handler() {
                this.retrieveProduct();
            }
        },
        searchText() {
            this.activeIndex = -1;
        },
    },
}
</script>
