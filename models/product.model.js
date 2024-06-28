const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    image: {
        type: String,
        required: [true, "image required"],
    },
    name: {
        type: String,
        required: [true, "name is required"],
    },
    price: {
        type: Number,
        default: 1000,
    },
    discount: {
        type: Number,
        default: 0,
    },
    stock: {
        type: Number,
        default: 0,
    },
    bgcolor: {
        type: String,
        default: "#000000",
    },
    panelcolor: {
        type: String,
        default: "#000000",
    },
    textcolor: {
        type: String,
        default: "#000000",
    },
});

module.exports = mongoose.model("Product", productSchema, "products");
