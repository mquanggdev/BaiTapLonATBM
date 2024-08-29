const dashboardRouter = require("./dashboard.route");
const productsRouter = require("./products.route");
const excelRouter = require("./exportExcel.route");
const systemConfig = require("../../config/system");
module.exports = (app) =>{
    const PORT = systemConfig.prefixAdmin;
    app.use(`/${PORT}` + "/dashboard" , dashboardRouter);
    app.use(`/${PORT}` + "/products" , productsRouter)
    app.use(`/${PORT}` + "/excel" , excelRouter)
} 