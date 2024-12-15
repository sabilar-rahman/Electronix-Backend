const Order = require("../orders/order.model");
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

       

    } catch (error) {
        console.error("Error fetching user stats:", error);
        res.status(500).send({ message: "Failed to fetch user stats", error });
    }
};



module.exports = {
    userStats,

};