<script>
import { Buffer } from 'buffer';

export default {
    props: {
        listProduct: { type: Array, require: true },
        activeIndex: { type: Number, default: -1 },

    },
    emits: ["update:activeIndex"],
    methods: {
        showImage(buf) {
            if (buf) {
                const b64 = new Buffer(buf).toString('base64')
                const mimeType = "image/png"
                let r = `data:${mimeType};base64,${b64}`
                console.log(r)
                return r
            }
        },
        toBase64(arr) {
            return btoa(
                arr.reduce((data, byte) => data + String.fromCharCode(byte), '')
            );
        },
        updateActiveIndex(index) {
            this.$emit("update:activeIndex", index);
        },
    }
}
</script>
<template>
    <section class="section-content padding-y">
        <div class="container">
            <div class="row justify-content-md-center">
                <div class="col-md-auto">
                    <h1>Sản phẩm</h1>
                </div>
            </div>
            <div class="row">
                <div class="col-md-3" v-for="(product, index) in listProduct">
                    <figure class="card card-product-grid limit h-50">
                        <!-- <div class="img-wrap"> -->
                        <img class="card-img limit h-100" :src="product.image" />
                        <!-- </div> -->
                        <figcaption class="info-wrap">
                            <div class="fix-height flex">
                                <a href="{{ product.get_url }}" class="title">{{ product.name }}</a>
                                <div class="price-wrap mt-2">
                                    <span class="price"><b>Giá: </b>{{ product.price }}đ</span>
                                </div>
                            </div>
                            <div :class="{ active: index === activeIndex }" @click="updateActiveIndex(index)">
                                <a class="btn btn-block btn-primary">Chi tiết</a>
                            </div>
                        </figcaption>
                    </figure>
                </div>
            </div>
        </div>
        <!-- container .//  -->
    </section>
    <!-- ========================= SECTION CONTENT END// ========================= -->
</template>
<!-- 
<style>
a {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    width:100px;
}

</style> -->