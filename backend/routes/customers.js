import express from "express";
import {addCustomer,viewCustomer,updateCustomer} from '../controllers/customer.js';

const router = express.Router();

router.post("/addcustomer", addCustomer);
router.post("/viewcustomer", viewCustomer);
router.post("/updatecustomer", updateCustomer);


export default router