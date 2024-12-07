import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    ProductID: { type: Number, required: true, unique: true },
    ProductName: { type: String, required: true },
    Category: { type: String, required: true },
    Price: { type: Number, required: true },
});


module.exports = mongoose.model("Product", productSchema);
