const express = require("express");
const router = express.Router();
const controller = require("./subject.controller");


// router.get('/hola', function (req, res) {
//     res.send('[GET]Saludos desde express');
// });


router.post(
  "/newSubject",
  controller.createSubject
);


module.exports = router;