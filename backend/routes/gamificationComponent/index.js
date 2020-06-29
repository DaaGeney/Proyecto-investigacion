const express = require("express");
const router = express.Router();
const controller = require("./gamificationComponent.controller");


// router.get('/hola', function (req, res) {
//     res.send('[GET]Saludos desde express');
// });

router.post(
    "/newComponent/GamificationComponent",
    controller.createGamificationComponent
  );


module.exports = router;