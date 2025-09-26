import Order from "../models/order.model.js";

// Create new order
export const createOrder = async (req, res) => {
    try {
        const { userId, package: pkg, packagePrice, deliveryRegion, deliveryPrice, totalPrice, city } = req.body;

        const order = new Order({
            userId,
            package: pkg,
            packagePrice,
            deliveryRegion,
            deliveryPrice,
            totalPrice,
            city,
        });

        await order.save();
        res.status(201).json({ message: "Order created successfully", order });
    } catch (error) {
        res.status(500).json({ message: "Error creating order", error: error.message });
    }
};

// Get all orders (admin only)
export const getOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate("userId", "name phone");
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: "Error fetching orders", error: error.message });
    }
};

// Get orders for a user
export const getUserOrders = async (req, res) => {
    try {
        const { userId } = req.params;
        const orders = await Order.find({ userId }).populate("userId", "name phone");
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: "Error fetching user orders", error: error.message });
    }
};
