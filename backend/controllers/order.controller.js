import Order from "../models/order.model.js";

// Create new order
export const createOrder = async (req, res) => {
    try {
        const { name, phone, secondPhone, email, package: selectedPackage, city:deliveryRegion, deliveryRegion:city, user, userId } = req.body;
        console.log("req.user is : ",user)
        // Map package to price
        let packagePrice = 0;
        if (selectedPackage === "single") packagePrice = 50;
        if (selectedPackage === "triple") packagePrice = 150;

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
            userId,
            package: selectedPackage === "single" ? "1-pill" : "4-pills",
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
        const orders = await Order.find()
            .populate("userId", "username phone email")
            .sort({ createdAt: -1 }); // الأجدد أولاً

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


// Update order delivered status
export const updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { delivered } = req.body;

        const order = await Order.findByIdAndUpdate(
            id,
            { delivered },
            { new: true }
        );

        if (!order) {
            return res.status(404).json({ message: "الطلب غير موجود" });
        }

        res.json({ message: "تم تحديث حالة الطلب", order });
    } catch (error) {
        res.status(500).json({ message: "خطأ في تحديث حالة الطلب", error: error.message });
    }
};