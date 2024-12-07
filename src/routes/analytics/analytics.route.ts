import {Router} from "express";
import {getDateRanges} from "../../utils/date.helper";
const Product = require( "../../models/product");
const  Sale = require( "../../models/sale")



const analyticsRoute: Router = Router()


analyticsRoute.get("/total_sales", async (req, res)=>{
    try{
        const { duration } = req.query;

        const filterDate = getDateRanges(duration as "week"| "month" | "year" | null)

        const [salesStats, totalProducts, totalCategories] = await Promise.all([
            Sale.aggregate([
                {
                    $match: {
                        Date: {
                            $gte: filterDate,
                            $lte: new Date()
                        },
                    },
                },
                {
                    $group: {
                        _id: null,
                        totalSales: { $sum: "$TotalAmount" },
                        totalOrders: { $sum: 1 },
                    },
                },
            ]),
            Product.countDocuments(),
            Product.distinct("Category").then((categories: any) => categories.length),
        ]);

        const { totalSales = 0, totalOrders = 0 } = salesStats[0] || {};

        res.status(200).json({
            totalSales,
            totalOrders,
            totalProducts,
            totalCategories,
        });

    }catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Error found when in calculating'});
    }
})

analyticsRoute.get("/trending_products", async (req, res)=>{
    try {

        const { duration } = req.query;

        const filterDate = getDateRanges(duration as "week"| "month" | "year" | null)

        const products = await Sale.aggregate([
            {
                $match: {
                    Date: { $gte: filterDate },
                },
            },
            {
                $lookup: {
                    from: "products",
                    localField: "ProductID",
                    foreignField: "ProductID",
                    as: "productDetails",
                },
            },
            {
                $unwind: "$productDetails",
            },
            {
                $group: {
                    _id: "$ProductID",
                    productName: { $first: "$productDetails.ProductName" },
                    totalQuantitySold: { $sum: "$Quantity" },
                    totalSalesAmount: { $sum: "$TotalAmount" },
                },
            },
            {
                $sort: { totalQuantitySold: -1 },
            },
            {
                $limit: 5,
            },
        ]);
        res.status(200).json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error found when try to fetch the products' });
    }
})

analyticsRoute.get("/category_sales", async (req, res)=>{
    try {

        const { duration } = req.query;

        const filterDate = getDateRanges(duration as "week"| "month" | "year" | null)

        const salesDistributionByCategory = await Sale.aggregate([

            {
                $match: {
                    Date: { $gte: filterDate },
                },
            },
            {
                $lookup: {
                    from: "products",
                    localField: "ProductID",
                    foreignField: "ProductID",
                    as: "productDetails",
                },
            },
            {
                $unwind: "$productDetails",
            },
            {
                $group: {
                    _id: "$productDetails.Category",
                    salesCount: { $sum: 1 },
                },
            },
            {
                $facet: {
                    groupedData: [
                        { $project: { category: "$_id", salesCount: 1, _id: 0 } }
                    ],
                    totalSales: [
                        { $group: { _id: null, totalSalesCount: { $sum: "$salesCount" } } }
                    ],
                },
            },
            {
                $project: {
                    groupedData: 1,
                    totalSales: { $arrayElemAt: ["$totalSales.totalSalesCount", 0] },
                },
            },
            {
                $unwind: "$groupedData",
            },
            {
                $addFields: {
                    "groupedData.percentage": {
                        $multiply: [
                            { $divide: ["$groupedData.salesCount", "$totalSales"] },
                            100,
                        ],
                    },
                },
            },
            {
                $replaceRoot: {
                    newRoot: "$groupedData",
                },
            }
        ]);
    res.status(200).json(salesDistributionByCategory)
    }catch (error){
        console.log(error)
        res.status(500).json({ message: 'Error found when try to fetch the products' });
    }
})



export default analyticsRoute;