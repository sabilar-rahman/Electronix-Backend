const Products = require("./product.model");


const creteNewProduct = async (req, res) => {
    try {
        const product = await Products.create(req.body);
        res.status(201).send({ message: "Product created successfully", product });

        
    } catch (error) {
        console.error("Error creating product:", error);
        res.status(500).send({ message: "Failed to create product", error });
    }

}

module.exports ={

    creteNewProduct

} 

    