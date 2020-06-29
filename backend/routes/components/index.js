const express = require("express");
const router = express.Router();
const controller = require("./component.controller");


// router.get('/hola', function (req, res) {
//     res.send('[GET]Saludos desde express');
// });

router.post(
  "/newComponent",
  controller.createComponent
);
router.get(
  "/getComponents",
  controller.getComponents
);
router.post(
  "/deleteComponent",
  controller.deleteComponent
);


module.exports = router;