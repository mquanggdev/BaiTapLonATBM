const dashboardRouter = require("./dashboard.route");
const productsRouter = require("./products.route");
const systemConfig = require("../../config/system");
module.exports = (app) =>{
    const PORT = systemConfig.prefixAdmin;
    app.use(`/${PORT}` + "/dashboard" , dashboardRouter);
    app.use(`/${PORT}` + "/products" , productsRouter)
} 