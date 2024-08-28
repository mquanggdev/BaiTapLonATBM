const homeRouter = require("./home.route");
const productsRouter = require("./products.route");

module.exports = (app) => {
    app.use("/" , homeRouter);
    app.use("/products" , productsRouter);
} 