const Product = require("../../model/product.model")
//[GET]/products
module.exports.index = async (req, res) => {
    const products = await Product
    .find({
        status:"active",
        deleted:false
    })
    .sort({
        position : "desc"
    })
    for (const item of products) {
        item.newPrice = (item.price - (item.price * item.discountPercentage / 100) ).toFixed(0);
    }
    res.render("client/pages/products/index.pug" , {
        pageTitle :"Trang Sản Phẩm",
        products : products
    });
}
module.exports.detail = async (req, res) => {
    try {
        const slug = req.params.slug;
        const product = await Product.findOne({
            slug:slug,
            deleted:false,
            status:"active"
        })
        res.render("client/pages/products/detail.pug" , {
            pageTitle :"Trang Sản Phẩm",
            product : product
        });
    } catch (error) {
        res.redirect("/")
    }
   
}