const express = require("express");
const {addCustomer,viewCustomer,updateCustomer} = require('../controllers/customer.js');


const router = express.Router();

router.post("/addcustomer", addCustomer);
router.post("/viewcustomer", viewCustomer);
router.post("/updatecustomer", updateCustomer);

module.exports = router;