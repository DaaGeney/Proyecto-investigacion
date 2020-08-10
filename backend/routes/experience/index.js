const express = require("express");
const router = express.Router();
const controller = require("./experience.controller");


// router.get('/hola', function (req, res) {
//     res.send('[GET]Saludos desde express');
// });


router.post(
  "/newExperience",
  controller.createExperience
);
router.get(
  "/getExperiences",
  controller.getExperiences
);



module.exports = router;