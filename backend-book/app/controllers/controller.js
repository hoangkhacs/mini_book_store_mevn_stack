const CategoriesService = require("../services/categories.service")
const ProductService = require("../services/products.service")
const ApiError = require("../api-error");
const MongoDB = require("../utils/mongodb.util")

exports.findAllCategories = async (req, res, next) => {
    let documents = [];
    try {
        const categoriesService = new CategoriesService(MongoDB.client);
        const { name } = req.query;
        if (name) {
            documents = await categoriesService.findByName(name);
        }
        else {
            documents = await categoriesService.find({});
        }
    } catch (error) {
        return next(
            new ApiError(500, "Lỗi không tìm thấy thể loại!")
        );
    }
    return res.send(documents);
}

exports.findAllProduct = async (req, res, next) => {
    let documents = [];

    try {
        const categoriesService = new CategoriesService(MongoDB.client);
        const productService = new ProductService(MongoDB.client);
        const category = await categoriesService.findById(req.params.idCategory);
        if (category && category != {}) {
            documents = await productService.findByCategory(category.name);
        }
        else {
            documents = await productService.find({});
        }
    } catch (error) {
        return next(
            new ApiError(500, "Lỗi không tìm thấy thể loạ")
        );
    }
    return res.send(documents);
};


exports.createCategory = async (req, res, next) => {
    if (!req.body?.name) {
        return next(new ApiError(400, "Tên không được để trống"));
    }

    try {
        const categoriesService = new CategoriesService(MongoDB.client);
        const document = await categoriesService.create(req.body);
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(500, "Không tạo được thể loại sách")
        );
    }
};

exports.deleteCategory = async (req, res, next) => {
    try {
        const categoriesService = new CategoriesService(MongoDB.client);
        const document = await categoriesService.delete(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Không tìm thấy thể loại"));
        }
        return res.send({ message: "Xóa thể loại thành công" });
    } catch (error) {
        return next(new ApiError(
            500,
            `Could not delete contact with id=${req.params.id}`
        ));
    }
}

exports.updateCategory = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400, "Data to update can not be empty"));
    }

    try {
        const categoriesService = new CategoriesService(MongoDB.client);
        const document = await categoriesService.update(req.params.id, req.body);
        if (!document) {
            return next(new ApiError(404, "Thể loại không tìm thấy"));
        }
        return res.send({ message: "Thể loại đã được cập nhật" });
    }
    catch (error) {
        return next(new ApiError(500, `Lỗi với sách id=${req.params.id}`));
    }
}

exports.findOne = async (req, res, next) => {
    try {
        const categoriesService = new CategoriesService(MongoDB.client);
        const document = await categoriesService.findById(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Category not found"));
        }
        return res.send(document);
    }
    catch (error) {
        return next(new ApiError(500, `Error retreiving category with id=${req.params.id}`))
    }
};

exports.createProduct = async (req, res, next) => {
    if (!req.body?.name) {
        return next(new ApiError(400, "Tên không được để trống"));
    }

    try {
        const productsService = new ProductService(MongoDB.client);
        const document = await productsService.create(req.body);
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(500, "Không tạo được sách")
        );
    }
};

exports.deleteProduct = async (req, res, next) => {
    try {
        const productsService = new ProductService(MongoDB.client);
        const document = await productsService.delete(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Không tìm thấy sách"));
        }
        return res.send({ message: "Xóa thể loại thành công" });
    } catch (error) {
        return next(new ApiError(
            500,
            `Could not delete contact with id=${req.params.id}`
        ));
    }
}

exports.findOneProduct = async (req, res, next) => {
    try {
        const productsService = new ProductService(MongoDB.client);
        const document = await productsService.findById(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Product not found"));
        }
        return res.send(document);
    }
    catch (error) {
        return next(new ApiError(500, `Error retreiving product with id=${req.params.id}`))
    }
};

exports.updateProduct = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400, "Data to update can not be empty"));
    }

    try {
        const productsService = new ProductService(MongoDB.client);
        const document = await productsService.update(req.params.id, req.body);
        if (!document) {
            return next(new ApiError(404, "Contact not found"));
        }
        return res.send({ message: "Sách đã được cập nhật" });
    }
    catch (error) {
        return next(new ApiError(500, `Error updating contact with id=${req.params.id}`));
    }
}
