const Reviews = require("../reviews/review.model");
const Products = require("./product.model");

const creteNewProduct = async (req, res) => {
    try {
        const product = await Products.create(req.body);
        res.status(201).send({ message: "Product created successfully", product });

        // calculate average rating
        const reviews = await Reviews.find({ productId: product._id });

        if (reviews.length > 0) {
            const totalRating = reviews.reduce(
                (acc, review) => ((acc += review.rating), 0)
            );
            console.log("totalRating", totalRating);
            const averageRating = totalRating / reviews.length;
            console.log("averageRating", averageRating);

            savedProduct.rating = averageRating;
            await savedProduct.save();
        }

        // let totalRating = 0;
        // let ratingCount = 0;

        // reviews.forEach((review) => {
        //     totalRating += review.rating;
        //     ratingCount++;
        // });

        // const averageRating = ratingCount > 0 ? totalRating / ratingCount : 0;

        // await Products.findByIdAndUpdate(product._id, { rating: averageRating });
    } catch (error) {
        console.error("Error creating product:", error);
        res.status(500).send({ message: "Failed to create product", error });
    }
};



const getAllProducts = async (req, res) => {
    try {

        const { category, color, minPrice, maxPrice, page = 1, limit = 10 } = req.query;

        const filters = {};
        if (category && category !== 'all') {
            filters.category = category
        }
        if (color && color !== 'all') {
            filters.color = color;
        }

        if (minPrice && maxPrice) {
            const min = parseFloat(minPrice);
            const max = parseFloat(maxPrice);
            if (!isNaN(min) && !isNaN(max)) {
                filters.price = { $gte: min, $lte: max };
            }
        }

        const skip = (parseInt(page) - 1) * parseInt(limit);

        const totalProducts = await Products.countDocuments(filters);
        const totalPages = Math.ceil(totalProducts / parseInt(limit));

        const products = await Products.find(filters)
            .skip(skip)
            .limit(parseInt(limit))
            .sort({ createdAt: -1 })
            .populate("author" , "name email");

        res.status(200).send({
            message: "Products fetched successfully",
            products,
            totalProducts,
            totalPages,
            currentPage: parseInt(page),
            limit: parseInt(limit),
        });
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).send({ message: "Failed to fetch products", error });
    }
};

// const getAllProducts = async (req, res) => {
//     try {
//         const products = await Products.find();
//         res.status(200).send({ message: "Products fetched successfully", products });
//     } catch (error) {
//         console.error("Error fetching products:", error);
//         res.status(500).send({ message: "Failed to fetch products", error });
//     }
// };

const getSingleProducts = async (req, res) => {
    try {
        const product = await Products.findById(req.params.id).populate("author" , "name email");

        if (!product) {
            return res.status(404).send({ message: "Product not found" });
        }

        const reviews = await Reviews.find({ productId: product._id }).populate("userId", "name email");


        res.status(200).send({ message: "Product fetched successfully", product, reviews });
    } catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).send({ message: "Failed to fetch product", error });
    }
};



module.exports = {
    creteNewProduct,
    getAllProducts,
    getSingleProducts

};
