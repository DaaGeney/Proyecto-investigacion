const express = require("express");
const router = express.Router();
const controller = require("./component.controller");
const { validateToken } = require("../../utils/auth");



// router.get('/hola', function (req, res) {
//     res.send('[GET]Saludos desde express');
// });

router.post(
  "/updateComponent/:pastName",
  validateToken,
  controller.updateComponent
);
router.post(
  "/newComponent",
  validateToken,
  controller.createComponent
);
router.get(
  "/getComponents/:id",
  validateToken,
  controller.getComponents
);
router.get(
  "/getComponent/:name",
  validateToken,
  controller.getComponent
);
router.delete(
  "/deleteComponent/:id",
  validateToken,
  controller.deleteComponent
);



module.exports = router;