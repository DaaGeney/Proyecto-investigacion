const express = require("express");
const router = express.Router();
const controller = require("./subject.controller");
const { validateToken } = require("../../utils/auth");


// router.get('/hola', function (req, res) {
//     res.send('[GET]Saludos desde express');
// });


router.post(
  "/newSubject",
  validateToken,
  controller.createSubject
);

router.get(
  "/getSubjects",
  validateToken,
  controller.getSubjects
);

module.exports = router;