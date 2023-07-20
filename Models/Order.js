const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    Products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
            },
            quantity: {
                type: Number,
                required: true,
                min: [1, "quantity must be greater than 0"],
            }
        }
    ]
});
const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
