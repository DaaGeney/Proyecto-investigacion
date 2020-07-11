const express = require("express");
const router = express.Router();
const controller = require("./objetives.controller");


// router.get('/hola', function (req, res) {
//     res.send('[GET]Saludos desde express');
// });


router.post(
  "/newObjetive",
  controller.createObjetive
);
router.get(
  "/getObjetives",
  controller.getObjetives
);

module.exports = router;