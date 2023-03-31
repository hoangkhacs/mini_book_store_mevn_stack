<template>
    <Form @submit="submitProduct" :validation-schema="productFormSchema">
        <div class="form-group">
            <label for="name">Tên sách</label>
            <Field name="name" type="text" class="form-control" v-model="productLocal.name" />
            <ErrorMessage name="name" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="category">Thể loại sách </label>
            <!-- <Field name="email" type="email" class="form-control" v-model="productLocal.category" /> -->
            <div class="form-inline">
                <Field name="category" as="select" class="form-control" v-model="productLocal.category">
                    <option v-for="ca in categories" :value="ca.name">{{ ca.name }}</option>
                </Field>
                <router-link :to="{
                    name: 'category.add',
                }">
                    <button class="ml-2 btn btn-info"> <i class="fa-solid fa-plus"></i> Thêm thể loại</button>
                </router-link>
            </div>
            <ErrorMessage name="category" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="price">Giá</label>
            <Field name="price" type="number" class="form-control" v-model="productLocal.price" />
            <ErrorMessage name="price" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="author">Tác giả</label>
            <Field name="author" type="text" class="form-control" v-model="productLocal.author" />
            <ErrorMessage name="author" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="public_company">Nhà xuất bản</label>
            <Field name="public_company" type="tel" class="form-control" v-model="productLocal.public_company" />
            <ErrorMessage name="public_company" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="image">Hình ảnh sách</label>
            <input v-validate="'image'" data-vv-as="image" name="image" type="file" class="form-control"
                @change="onFileChange">
            <ErrorMessage name="image" class="error-feedback" />
            <br>
            <img :src="productLocal.image" alt="" style="width: 100px">
        </div>
        <div class="form-group">
            <button class="btn btn-primary">Lưu</button>
            <button class="btn btn-primary ml-3" @click="this.$router.go(-1)">Trở về</button>

        </div>
    </Form>
</template>
<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    emits: ["submit:product"],
    props: {
        product: { type: Object, required: true },
        categories: { type: Array, required: true },
    },
    data() {
        const productFormSchema = yup.object().shape({
            name: yup
                .string()
                .required("Tên phải có giá trị.")
                .min(2, "Tên phải ít nhất 2 ký tự2.")
                .max(50, "Tên có nhiều nhất 50 ký tự."),
            category: yup
                .string()
                .required("Thể loại không được để trống"),
            price: yup
                .number()
                .positive()
                .required("Phải nhập giá sách"),
            author: yup
                .string()
                .required("Vui lòng nhập tên tác giả")
                .min(2, "Tên tác giả phải ít nhất 2 ký tự.")
                .max(50, "Tên tác giả có nhiều nhất 50 ký tự."),
            public_company: yup
                .string()
                .required("Vui lòng nhập tên nhà xuất bản")
                .min(2, "Tên nhà xuất bản phải ít nhất 2 ký tự.")
                .max(50, "Tên nhà xuất bản có nhiều nhất 50 ký tự."),
        });
        return {
            // Chúng ta sẽ không muốn hiệu chỉnh props, nên tạo biến cục bộ
            // productLocal để liên kết với các input trên form
            productLocal: this.product,
            productFormSchema,
        };
    },
    methods: {
        async submitProduct() {
            this.$emit("submit:product", this.productLocal);
        },
        convertBase64(file) {
            return new Promise((resolve, reject) => {
                const fileReader = new FileReader();
                fileReader.readAsDataURL(file);

                fileReader.onload = () => {
                    resolve(fileReader.result);
                };

                fileReader.onerror = (error) => {
                    reject(error);
                };
            });
        },

        async onFileChange(event) {
            const file = event.target.files[0];
            const base64 = await this.convertBase64(file);
            this.productLocal.image = base64;
            console.log("base", this.productLocal.image)
        }
    },
};
</script>
