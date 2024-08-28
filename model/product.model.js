const mongoose = require("mongoose");
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);
const productModelSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    discountPercentage: Number,
    stock: Number,
    thumbnail: String,
    status: String,
    position: Number,
    deleted: {
        type: Boolean,
        default: false
    },
    slug:{
         type: String,
         slug: "title",
         unique : true 
        },
    qrLink:{
        type:String,
        default : ""
    }
}, {
    timestamps: true // tự động thêm trường createAt và updateAt
})

const Product = mongoose.model("Product" , productModelSchema , "products-demo");
module.exports = Product;