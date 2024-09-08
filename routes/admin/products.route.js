const express = require("express");
const router = express.Router();
const controller = require("../../controllers/admin/products.controller")
const multer  = require('multer')
// const upload = multer({ storage: storageMulterHelper })
const validate = require("../../validate/admin/products.validate");
const uploadCloudMiddleware = require("../../middleware/admin/uploadCloud.middleware");
const upload = multer()





router.get("/" , controller.index);
router.patch("/change-status/:statusChange/:id",controller.changeStatus) // :id tức là đặt đường dẫn động có tên là id
router.patch("/change-multi",controller.changeMulti)
router.patch("/delete/:id" , controller.deleteItem);
router.patch("/change-position/:id" , controller.changePosition);
router.get("/create" , controller.create);
router.post("/create" ,
    upload.single('thumbnail'),uploadCloudMiddleware.uploadSingle,
    validate.createPost,
     controller.createPost);
router.get("/edit/:id",controller.edit)
router.patch("/edit/:id" ,upload.single('thumbnail'),uploadCloudMiddleware.uploadSingle,validate.createPost, controller.editPatch);
router.get("/detail/:id",controller.detail);
module.exports = router