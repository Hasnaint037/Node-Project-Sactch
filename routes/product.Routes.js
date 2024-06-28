const express = require("express");
const {
    createProduct,
    updateProduct,
    deleteProduct,
    getSingle,
    getAll,
    addToCart,
    placeOrder,
    removeFromCart,
    cartData,
    adminProducts,
} = require("../controllers/product.controoller");
const uploader = require("../utils/multer");
const { isAdmin } = require("../middlewares/isAdmin");
const { isLoggedIn } = require("../middlewares/isLoggedIn");
const productModel = require("../models/product.model");
const router = express.Router();

router
    .route("/create")
    .post(isLoggedIn, isAdmin, uploader.single("image"), createProduct);
router.route("/update/:id").post(isLoggedIn, isAdmin, updateProduct);
router.route("/delete/:id").get(isLoggedIn, isAdmin, deleteProduct);
router.route("/getone/:id").get(isLoggedIn, getSingle);
router.route("/shop").get(isLoggedIn, getAll);
router.route("/add-to-cart/:id").get(isLoggedIn, addToCart);
router.route("/place-order/:id").get(isLoggedIn, placeOrder);
router.route("/remove-from-cart/:id").post(isLoggedIn, removeFromCart);
router.route("/cart").get(isLoggedIn, cartData);
router.route("/admin").get(isLoggedIn, isAdmin, adminProducts);
router.get("/update/:id", async (req, res) => {
    const { id } = req.params;
    const product = await productModel.findOne({ _id: id });
    res.render("update.ejs", { product, bold: true });
});
router.get("/create", (req, res) => {
    res.render("create", { bold: false });
});
module.exports = router;
