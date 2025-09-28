import Order from "../models/order.model.js";

// Create new order
export const createOrder = async (req, res) => {
    try {
        const { name, phone, secondPhone, email, package: selectedPackage, city:deliveryRegion, deliveryRegion:city, user } = req.body;
        console.log("req.user is : ",user)
        // Map package to price
        let packagePrice = 0;
        if (selectedPackage === "single") packagePrice = 50;
        if (selectedPackage === "triple") packagePrice = 100;

        // Delivery price (based on region and login status)
        let deliveryPrice = 0;
        if (user) {
            // Logged in user gets discount delivery
            if (deliveryRegion === "الضفة الغربية") deliveryPrice = 0;
            if (deliveryRegion === "القدس") deliveryPrice = 10;
            if (deliveryRegion === "الداخل") deliveryPrice = 30;
        } else {
            if (deliveryRegion === "الضفة الغربية") deliveryPrice = 20;
            if (deliveryRegion === "القدس") deliveryPrice = 30;
            if (deliveryRegion === "الداخل") deliveryPrice = 50;
        }

        const totalPrice = packagePrice + deliveryPrice;

        const order = new Order({
            userId: user ? user._id : null,
            package: selectedPackage === "single" ? "1-pill" : "3-pills",
            packagePrice,
            name,
            phone,
            secondPhone,
            email,
            deliveryRegion,
            deliveryPrice,
            totalPrice,
            city,
        });

        await order.save();

        res.status(201).json({ message: "تم إنشاء الطلب بنجاح", order });
    } catch (error) {
        res.status(500).json({ message: "خطأ في إنشاء الطلب", error: error.message });
    }
};

// Get all orders (admin only)
export const getOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate("userId", "username phone email");
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: "خطأ في جلب الطلبات", error: error.message });
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
