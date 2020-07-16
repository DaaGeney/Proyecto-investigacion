const express = require("express");
const router = express.Router();
const controller = require("./files.controller");
const fileUpload = require("express-fileupload");
router.use(fileUpload());

// router.get('/hola', function (req, res) {
//     res.send('[GET]Saludos desde express');
// });

router.post(
  "/:typeComponent/:nameComponent",
  controller.newFile
);




module.exports = router;