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
    const products = await Products.find();
    res.status(200).send({ message: "Products fetched successfully", products });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).send({ message: "Failed to fetch products", error });
  }
};

module.exports = {
  creteNewProduct,
  getAllProducts,
  
};
