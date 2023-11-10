const  express = require("express");
//const path = require("path");

const  {addProduct,upload, getProducts,deleteProduct,getProduct,updateProduct,addProductCustomer} = require("../controllers/product.js");

const router = express.Router();

router.post("/addproduct", upload.single("image"), addProduct);
router.post("/addproductcustomer/:id", addProductCustomer);

router.put("/updateproduct/:productId", upload.single("image"), updateProduct);

router.get("/getproducts", getProducts);
router.get("/getproduct/:productid", getProduct);
router.delete("/deleteproduct/:id", deleteProduct);

module.exports = router;