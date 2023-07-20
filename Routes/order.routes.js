const {
    postNewOrder,
    getAllOrderByUserId,
} = require("./../Controllers/order.controller");

const express = require("express");
const verifyUser = require("../Middlewares/isAuth");
const validateOrderData = require("../Middlewares/validateOrderData");

const router = express.Router();
router.get("/user/:id", getAllOrderByUserId);
router.post("/", verifyUser, validateOrderData, postNewOrder);

module.exports = router;
