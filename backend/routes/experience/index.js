const express = require("express");
const router = express.Router();
const controller = require("./experience.controller");
const { validateToken } = require("../../utils/auth");

// router.get('/hola', function (req, res) {
//     res.send('[GET]Saludos desde express');
// });


router.post(
  "/newExperience",
  validateToken,
  controller.createExperience
);
router.get(
  "/getExperiences",
  validateToken,
  controller.getExperiences
);



module.exports = router;