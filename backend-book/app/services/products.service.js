const { ObjectId } = require("mongodb");

class ProductService {
    constructor(client) {
        this.products = client.db().collection("products");
    }

    //Định nghĩa các phương thức truy xuất CSDL sử dụng mongodb API
    extractConactData(payload) {
        const products = {
            id: payload.id,
            name: payload.name,
            category: payload.category,
            price: payload.price,
            public_company: payload.public_company,
            author: payload.author,
            image: payload.image
        };
        //remove underfined fields
        Object.keys(products).forEach(
            (key) => products[key] === undefined && delete products[key]
        );
        return products;
    }

    async find(filter) {
        const cursor = await this.products.find(filter)
        return await cursor.toArray()
    }

    async findByName(name) {
        return await this.find({
            name: { $regex: new RegExp(name), $option: 'i' },
        })
    }

    async findByCategory(Category) {
        return await this.find({
            category: { $regex: new RegExp(Category), $options: "i" },
        });
    }

    async create(payload) {
        const product = this.extractConactData(payload);
        const result = await this.products.findOneAndUpdate(
            product,
            { $set: { name: product.name } },
            { returnDocument: "after", upsert: true }
        );
        return result.value;
    }

    async delete(id) {
        const result = await this.products.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result.value;
    }
    async findById(id) {
        return await this.products.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }
    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = this.extractConactData(payload);
        const result = await this.products.findOneAndUpdate(
            filter, { $set: update }, { returnDocument: "after" });
        return result.value;
    }
}

module.exports = ProductService;