const Product = require("./../Models/Product")
const Order = require("./../Models/Order")


const getAllOrderByUserId = async (req, res, next) => {
    try {
        const Orders = await Order.find({ userId: req.params.id })
        return res.status(200).json({ success: true, Orders })
    } catch (error) {
        return next(error);
    }
};

const postNewOrder = async (req, res, next) => {
    try {
        const { order } = req.body;
        for (const item of order.Products) {
            const { productId, quantity } = item;
            const productData = await Product.findOne({ _id: productId });

            if (productData) {
                if (productData.quantity < quantity)
                    return res.status(500).json({ status: false, message: `Insufficient quantity for product ${productId}` })
            } else
                return res.status(500).json({ status: false, message: `Product not found: ${productId}` })
        }

        for (const item of order.products) {
            const { productId, quantity } = item;
            await Product.updateOne({ _id: productId }, { $inc: { quantity: -quantity } });
        }

        await Order.create({ ...order, userId: req.user._id });

        return res.status(200).json({
            message: "Order successfully created!!",
            ...newOrder,
        });
    } catch (error) {
        return next(error);
    }
};


module.exports = {
    postNewOrder,
    getAllOrderByUserId,
};
