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

            return res.status(400).send({ message: "Review already exists" });
        } else {
            const review = await Reviews.create({ comment, rating, userId, productId });
            if (review.length > 0) {
                const totalRating = review.reduce((acc, review) => ((acc += review.rating), 0));
                const averageRating = totalRating / review.length;

                // await Products.updateOne({ _id: productId }, { $set: { rating: averageRating } });

                const product = await Products.findById(productId);
                if(product) {    
                    product.rating = averageRating;
                    await product.save({validateBeforeSave: false});
                }else{
                    return res.status(404).send({ message: "Product not found" });
                }

            }
            res.status(200).send({ message: "Review created successfully", review });
        }


    } catch (error) {
        console.error("Error creating review:", error);
        res.status(500).send({ message: "Failed to create review", error });
    }
};

module.exports = { postReview };