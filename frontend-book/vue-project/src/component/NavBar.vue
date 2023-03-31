<script>
export default {
    props: {
        categories: { type: Array, require: true },
        modelValue: { type: String, default: "" }
    },
    emits: ["submit", "update:modelValue"],
    methods: {
        gotoProductCategory(id) {
            this.$router.push({ name: "productCategory", params: { idCategory: id } });
        },
        updateModelValue(e) {
            this.$emit("update:modelValue", e.target.value);
        },
        submit() {
            this.$emit("submit");
        },
    }
};
</script>

<template>
    <div class="">
        <nav class="navbar navbar-expand-lg navbar-light bg-primary">
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                    <!-- <router-link :to="{
                        name: 'adminbook',
                    }">
                        <li class="nav-item active">
                            <a class="nav-link" href="/"><i class="fa-solid fa-lock"></i>Admin<span
                                    class="sr-only"></span></a>
                        </li>
                    </router-link> -->
                    <li class="nav-item active">
                        <a class="nav-link" href="/"><i class="fa-solid fa-house-user"></i>Trang chủ<span
                                class="sr-only"></span></a>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown"
                            aria-expanded="false">
                            Thể loại
                        </a>
                        <div class="dropdown-menu">
                            <a class="dropdown-item" v-for="category in categories"
                                @click="gotoProductCategory(category._id)">{{
                                        category.name
                                }}</a>
                        </div>
                    </li>
                </ul>
                <form class="form-inline my-2 my-lg-0">
                    <input class="form-control mr-sm-2 " type="search" aria-label="Search"
                        placeholder="Nhập thông tin cần tìm" :value="modelValue" @input="updateModelValue"
                        @keyup.enter="submit">
                    <button class="btn btn-outline-success my-2 my-sm-0 bg-dark" type="submit" @click="submit">Tìm
                        kiếm</button>
                </form>
            </div>
        </nav>
    </div>
</template>