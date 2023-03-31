const express = require("express")
const controler = require("../controllers/controller")

const router = express.Router();

router.route("/")
    // .post(controler.create)
    .get(controler.findAllCategories)

router.route("/:idCategory")
    .get(controler.findAllProduct);


router.route("/category")
    .post(controler.createCategory);

router.route("/category/:id")
    .delete(controler.deleteCategory)
    .put(controler.updateCategory)
    .get(controler.findOne)

router.route("/product")
    .post(controler.createProduct)

router.route("/product/:id")
    .delete(controler.deleteProduct)
    .get(controler.findOneProduct)
    .put(controler.updateProduct)

module.exports = router