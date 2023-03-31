<script>
export default {
    props: {
        product: { type: Object, require: true },
    },
};
</script>

<template>
    <div class="col-md-auto">
        <h4>Thông tin chi tiết:</h4>
    </div>
    <div>
        <div class="p-1">
            <strong id="test">Tên: </strong>
            {{ product.name }}
        </div>
        <div class="p-1">
            <strong>Giá: </strong>
            {{ product.price }}đ
        </div>
        <div class="p-1">
            <strong>Thể loại: </strong>
            {{ product.category }}
        </div>
        <div class="p-1">
            <strong>Tác giá: </strong>
            {{ product.author }}
        </div>
        <div class="p-1">
            <strong>Nhà xuất bản: </strong>
            {{ product.public_company }}
        </div>
    </div>
</template>