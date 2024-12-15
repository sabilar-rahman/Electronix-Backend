const Order = require("../orders/order.model");
const Products = require("../products/product.model");
const Reviews = require("../reviews/review.model");
const User = require("../user/user.model");

const userStats = async (req, res) => {

    const email = req.params.email;
    if (!email) {
        return res.status(400).send({ message: "Email is required" });
    }

    try {

        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }
        // aggregation
        //sum of all orders

        const totalPaymentsResult = await Order.aggregate([
            { $match: { email: email } },
            { $group: { _id: null, totalAmount: { $sum: "$amount" } } }
        ]);

        const totalPaymentsAmount = totalPaymentsResult.length > 0 ? totalPaymentsResult[0].totalAmount : 0;


         console.log(totalPaymentsAmount);


        // get total reviews
        const totalReviews = await Reviews.countDocuments({ userId: user._id });

        // get total purchased products

        const purchasedProducts = await Order.distinct("products.productId", { email: email });

        const totalPurchasedProducts = purchasedProducts.length;


        res.status(200).send({
             totalPayments: totalPaymentsAmount.toFixed(2), totalReviews,
            totalPurchasedProducts });


    } catch (error) {
        console.error("Error fetching user stats:", error);
        res.status(500).send({ message: "Failed to fetch user stats", error });
    }
};

const  adminStats = async (req, res) => {
    try {

        const totalOrders = await Order.countDocuments();
        const totalProducts = await Products.countDocuments();
        const totalReviews = await Reviews.countDocuments();
        const totalUsers = await User.countDocuments();

        // calculate total revenue
        const totalEarningResult = await Order.aggregate([
            { $group: { _id: null, totalEarnings: { $sum: "$amount" } } }
        ])

        const totalEarnings = totalEarningResult.length > 0 ? totalEarningResult[0].totalEarnings : 0;

        //monthly earnings
        
        const monthlyEarningsResult = await Order.aggregate([
            { $group: {
                 _id: {month:{ $month: "$createdAt" } , year: { $year: "$createdAt" }},  monthlyEarnings: { $sum: "$amount" }
            } },
            {
                $sort: { "_id.year": 1, "_id.month": 1 }
            }
        ]);


        // format monthly earnings
        const monthlyEarnings = monthlyEarningsResult.map((item) => ({
            month: item._id.month,
            year: item._id.year,
            earnings: item.monthlyEarnings.toFixed(2)
        }));


        res.status(200).send({ message: "Admin stats fetched successfully", totalOrders, totalProducts, totalReviews, totalUsers, totalEarnings, monthlyEarnings });



        
    } catch (error) {
        
    }

}

module.exports = {
    userStats,
    adminStats

};