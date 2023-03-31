import createApiClient from "./api.service";

class ProductService {
    constructor(baseUrl = "/api/shop") {
        this.api = createApiClient(baseUrl);
    }
    async getAllProduct(idCategory) {
        return (await this.api.get(`/${idCategory}`)).data;
    }
    async createProduct(data) {
        return (await this.api.post("/product", data)).data;
    }
    async deleteProduct(id) {
        return (await this.api.delete(`product/${id}`))
    }
    async getProduct(id) {
        return (await this.api.get(`product/${id}`))
    }
    async updateProduct(id, data) {
        return (await this.api.put(`product/${id}`, data)).data;
    }
}

export default new ProductService();