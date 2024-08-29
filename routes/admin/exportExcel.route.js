const express = require("express");
const router = express.Router();
const controller = require("../../controllers/admin/excel.controller");
router.get("/downloadExcel" , controller.index);

module.exports = router ;