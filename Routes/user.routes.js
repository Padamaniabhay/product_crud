const express = require("express");
const validateAuthData = require("../Middlewares/validateAuthData");
const router = express.Router();

const { loginUser, registerUser } = require("./../Controllers/user.controller");

router.post("/login", validateAuthData, loginUser);
router.post("/register", validateAuthData, registerUser);

module.exports = { userRoutes: router };
