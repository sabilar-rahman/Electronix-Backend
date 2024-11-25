const Products = require("../products/product.model");
const Reviews = require("./review.model");

const postReview = async (req, res) => {
    try {

        const { comment, rating, userId, productId } = req.body;

        if (!comment || rating === undefined || !userId || !productId) {
            return res.status(400).send({ message: "Missing required fields" });
        }

        const existingReview = await Reviews.findOne({ userId, productId });
        if (existingReview) {
            existingReview.comment = comment;
            existingReview.rating = rating;
            await existingReview.save();


        } else {
            const newReview = new Reviews({ comment, rating, userId, productId });

            await newReview.save();
        }

        const review = await Reviews.find({ productId });


        if (review.length > 0) {
            const totalRating = review.reduce((acc, review) => ((acc + review.rating), 0));
            const averageRating = totalRating / review.length;



            const product = await Products.findById(productId);
            if (product) {
                product.rating = averageRating;
                await product.save({ validateBeforeSave: false });
            } else {
                return res.status(404).send({ message: "Product not found" });
            }

        }
        res.status(200).send({ message: "Review created successfully", review });
    }


    catch (error) {
        console.error("Error creating review:", error);
        res.status(500).send({ message: "Failed to create review", error });
    }
};



const getUserReviews = async (req, res) => {

    const { userId } = req.params;
    try {
        if(!userId){
            return res.status(400).send({ message: "Missing required fields" });
        }
        const reviews = await Reviews.find({ userId: userId }).sort({ createdAt: -1 });

        if(reviews.length === 0){
            return res.status(404).send({ message: "No reviews found" });
        }
        res.status(200).send({ message: "Reviews fetched successfully", reviews });
    } catch (error) {
        console.error("Error fetching reviews:", error);
        res.status(500).send({ message: "Failed to fetch reviews", error });
    }
};


const getTotalReviewsCount = async (req, res) => {
    try {
        const totalReviews = await Reviews.countDocuments({});
        res.status(200).send({ message: "Total reviews Count successfully", totalReviews });
    } catch (error) {
        console.error("Error fetching total reviews:", error);
        res.status(500).send({ message: "Failed to fetch total reviews", error });
    }
};


module.exports = {
    postReview,
    getUserReviews,
    getTotalReviewsCount
};