const router = require("express").Router();

const { addNewUser, login, verifyUser } = require("../controller/auth");

router.route("/").post(addNewUser);
router.route("/login").post(login);
router.route("/verifyUser").post(verifyUser);

module.exports = router;