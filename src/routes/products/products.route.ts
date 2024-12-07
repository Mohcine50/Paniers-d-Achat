import {Router} from "express";

const  Product = require( "../../models/product")

const productsRoute: Router = Router()



productsRoute.get("/", async (req, res) => {

    try {
        const products = await Product.aggregate([
            {
                $lookup: {
                    from: 'sales',
                    localField: 'ProductID',
                    foreignField: 'ProductID',
                    as: 'sales',
                },
            },
            {
                $addFields: {
                    salesCount: { $size: '$sales' },
                },
            },
            {
                $project: {
                    sales: 0,
                },
            },
        ]);

        res.status(200).json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error found when try to fetch the products' });
    }
})


export default productsRoute