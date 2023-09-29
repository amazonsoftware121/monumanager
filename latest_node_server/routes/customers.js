const express = require("express");
const {addCustomer,getCustomers,getSingleCustomer,editCustomer,deleteCustomer} = require('../controllers/customer.js');

const router = express.Router();

router.post("/addcustomer", addCustomer);
router.get("/getcustomers", getCustomers);
router.get("/getsinglecustomer/:id", getSingleCustomer);
router.put("/editcustomer/:customerId", editCustomer);
router.delete("/deletecustomer/:id", deleteCustomer)

module.exports = router;