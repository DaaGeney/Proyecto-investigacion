const express = require("express");
const router = express.Router();
const controller = require("./auth.controller");
const { validateToken } = require("../../utils/auth");

router.post("/user/logIn", controller.logIn);
router.post("/user/createUser", controller.createUser);
// router.post("/user/restorePassword", controller.restorePassword);
// router.post("/user/changePassword", validateToken, controller.changePassword);
router.post("/user/update/:pastEmail",controller.updateUser);
router.get("/user/getUsers", controller.getUsers);
router.delete("/user/delete/:id", controller.deleteUser);

module.exports = router;