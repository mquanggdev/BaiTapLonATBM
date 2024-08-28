const Product = require("../model/product.model");
module.exports = async (req , find) => {
    const pagination = {
        currentPage: 1,
        limitItems : 4, // mỗi trang có 4 phần tử
    };
    if (req.query.page){
        pagination.currentPage = parseInt(req.query.page);
    }
    pagination.skip = (pagination.currentPage - 1) * (pagination.limitItems); // bỏ qua bao nhiêu trang
    const allProductFind = await Product.countDocuments(find);
    pagination.totalPage = Math.ceil(allProductFind / pagination.limitItems);

    return pagination;
}
