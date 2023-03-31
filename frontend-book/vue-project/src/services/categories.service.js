import createApiClient from "./api.service";

class CategoriesService {
    constructor(baseUrl = "/api/shop") {
        this.api = createApiClient(baseUrl);
    }
    async getAllCategories() {
        return (await this.api.get("/")).data;
    }
    async getAllProduct(idCategory) {
        return (await this.api.get(`/${idCategory}`)).data;
    }
    async create(data) {
        return (await this.api.post("/category", data)).data;
    }
    async deleteCategory(id) {
        return (await this.api.delete(`category/${id}`))
    }
    async updateCategory(id, data) {
        return (await this.api.put(`category/${id}`, data)).data;
    }
    async getCategory(id) {
        return (await this.api.get(`category/${id}`))
    }
}

export default new CategoriesService();