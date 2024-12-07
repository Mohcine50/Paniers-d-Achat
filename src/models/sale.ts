import mongoose from "mongoose";

const saleSchema = new mongoose.Schema({
    SaleID: { type: Number, required: true, unique: true },
    ProductID: { type: Number, required: true, ref: 'Product' },
    Quantity: { type: Number, required: true },
    Date: { type: Date, required: true },
    TotalAmount: { type: Number, required: true },
});

const Sale = mongoose.model('Sale', saleSchema);

module.exports = Sale;
