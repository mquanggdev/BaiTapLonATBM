const dashboardRouter = require("./dashboard.route");
const productsRouter = require("./products.route");
const authRoute = require("./auth.route");
const roleRoute = require("./roles.route");
const accountRoute = require("./accounts.route");
const excelRouter = require("./exportExcel.route");
const systemConfig = require("../../config/system");
const authMiddleware = require("../../middleware/admin/auth.middleware.js");
module.exports = (app) =>{
    const PORT = systemConfig.prefixAdmin;
    app.use(`/${PORT}` + "/dashboard" ,authMiddleware.requireAuth, dashboardRouter);
    app.use(`/${PORT}` + "/products" ,authMiddleware.requireAuth, productsRouter)
    app.use(`/${PORT}` + "/excel" ,authMiddleware.requireAuth, excelRouter);
    app.use(`/${PORT}` + "/auth", authRoute);
    app.use(`/${PORT}` + "/accounts" ,authMiddleware.requireAuth, accountRoute);
    app.use(`/${PORT}` + "/roles" ,authMiddleware.requireAuth, roleRoute);
} 