const express = require("express");
const { updateUser, getUser } = require("../controllers/userController");
const router = express.Router();
const {authenticate} = require("../middlewares/authMiddleware")

router.post("/updateUser", authenticate, updateUser);
router.post("/getUser",authenticate, getUser);

module.exports = router;
