const Order = require('../models/Order');
const User = require('../models/User');

const getOrders = async (req, res) => {
    const authorId = req.id;
    const authorAccountType = req.accountType;
    const author = req.author;
    try {
        let orders;
        if (authorAccountType === "buyer") {
            orders = await Order.find({ purchaserId: authorId });
        } else {
            const orderData = await Order.find({ author });
            orders = await Promise.all(orderData.map(async (order) => {
                const purchaser = await User.findById(order.purchaserId);
                return {
                    author: order.author,
                    title: order.title,
                    price: order.price,
                    createdAt: order.createdAt,
                    razorpayOrderId: order.razorpayOrderId,
                    postUrl: order.postUrl,
                    razorpayPaymentId: order.razorpayPaymentId,
                    razorpaySignature: order.razorpaySignature,
                    purchaserId: order.purchaserId,
                    _id: order._id,
                    purchaser: purchaser ? purchaser.username : 'Unknown', 
                };
            }));
        }

        if (!orders || orders.length === 0) {
            return res.status(404).json({ success: false, message: "No orders Found" });
        }

        return res.status(200).json({ success: true, data: orders });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = { getOrders };