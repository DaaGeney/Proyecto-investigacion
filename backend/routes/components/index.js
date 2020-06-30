const express = require("express");
const router = express.Router();
const controller = require("./component.controller");


// router.get('/hola', function (req, res) {
//     res.send('[GET]Saludos desde express');
// });

router.post(
  "/updateComponent/:pastName",
  controller.updateComponent
);
router.post(
  "/newComponent",
  controller.createComponent
);
router.get(
  "/getComponents",
  controller.getComponents
);
router.get(
  "/getComponent/:name",
  controller.getComponent
);
router.delete(
  "/deleteComponent/:id",
  controller.deleteComponent
);



module.exports = router;