<template>
    <Form @submit="submitCategory">
        <h4>Thêm thể loại mới</h4>
        <div class="form-group">
            <label for="name">Tên thể loại</label>
            <Field name="name" type="text" class="form-control" v-model="categoryLocal.name" />
            <ErrorMessage name="name" class="error-feedback" />
        </div>
        <div class="form-group">
            <button class="btn btn-primary">Thêm</button>
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
    emits: ["submit:category"],
    props: {
        category: { type: Object, required: true }
    },
    data() {
        const categoryFormSchema = yup.object().shape({
            name: yup
                .string()
                .required("Vui lòng nhập thể loại.")
                .min(2, "Tên thể loại phải ít nhất 2 ký tự.")
                .max(50, "Tên có nhiều nhất 50 ký tự."),
        });
        return {
            // Chúng ta sẽ không muốn hiệu chỉnh props, nên tạo biến cục bộ
            // categoryLocal để liên kết với các input trên form
            categoryLocal: this.category,
            categoryFormSchema,
        };
    },
    methods: {
        async submitCategory() {
            this.$emit("submit:category", this.categoryLocal);
        },

        comeback() {
            this.$router.go(-1)
        }
    },
};
</script>
