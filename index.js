const express = require('express');
var bodyParser = require('body-parser');
const app = express();
require('dotenv').config();
const routeClient = require("./routes/client/index.route");
const routeAdmin = require("./routes/admin/index.route")
const port = process.env.PORT;
const database = require("./config/database");
const systemConfig = require("./config/system");
// phần hiển thị popup
var flash = require('express-flash');
var session = require('express-session')
var cookieParser = require('cookie-parser')
// end phần hiển thị popup
var methodOverride = require('method-override')
const path = require('path');




app.set('views', `${__dirname}/views`);
app.set('view engine', 'pug');
app.use(express.static(`${__dirname}/public`));
app.locals.prefixAdmin = systemConfig.prefixAdmin;
// parse application/json
app.use(bodyParser.json())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

//flash
app.use(cookieParser('Yalidas'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());
//end flash
// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))
//timyMCE
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));
//end timyMCE


routeClient(app);
routeAdmin(app);
database.connect();





app.listen(port , () => {
    console.log(`Đang chạy cổng 3000`);
})