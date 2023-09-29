const express = require("express");

const { searchCustomer} = require("../controllers/search.js");

const router = express.Router();

router.get("/customer", searchCustomer);
module.exports = router;