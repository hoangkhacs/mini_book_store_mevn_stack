const { ObjectId } = require("mongodb");

class CategoriesService {
    constructor(client) {
        this.categories = client.db().collection("categories");
    }

    //Định nghĩa các phương thức truy xuất CSDL sử dụng mongodb API
    extractConactData(payload) {
        const categories = {
            id: payload.id,
            name: payload.name,
        };
        //remove underfined fields
        Object.keys(categories).forEach(
            (key) => categories[key] === undefined && delete categories[key]
        );
        return categories;
    }

    async create(payload) {
        const category = this.extractConactData(payload);
        const result = await this.categories.findOneAndUpdate(
            category,
            {$set: {name: category.name}},
            {returnDocument: "after", upsert: true}
        );
        return result.value;
    }
    async find(filter) {
        const cursor = await this.categories.find(filter)
        return await cursor.toArray()
    }

    async findByName(name) {
        return await this.find({
            name: { $regex: new RegExp(name), $option: 'i' },
        })
    }

    async findById(id) {
        return await this.categories.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }

    async findCategoryById(id) {
        return await this.categories.findOne({
            _id: ObjectId.isValid(id) ? new Object(id) : null,
        });
    }

    async delete(id) {
        const result = await this.categories.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result.value;
    }

    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = this.extractConactData(payload);
        const result = await this.categories.findOneAndUpdate(
            filter, {$set: update}, {returnDocument: "after"});
        return result.value;
    }

}

module.exports = CategoriesService;