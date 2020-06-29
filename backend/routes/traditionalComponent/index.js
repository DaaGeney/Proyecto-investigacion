const express = require("express");
const router = express.Router();
const controller = require("./traditionalComponent.controller");


// router.get('/hola', function (req, res) {
//     res.send('[GET]Saludos desde express');
// });

router.post(
    "/newComponent/traditionalComponent",
    controller.createTraditionalComponent
  );


module.exports = router;