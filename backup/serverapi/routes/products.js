const  express = require("express");
//const path = require("path");

const  {addProduct,upload, getProducts,deleteProduct,getProduct,updateProduct} = require("../controllers/product.js");

const router = express.Router();

router.post("/addproduct/:orderid", upload.single("product_image"), addProduct);

router.put("/updateproduct/:productid", upload.single("product_image"), updateProduct);

router.get("/getproducts", getProducts);
router.get("/getproduct/:productid", getProduct);
router.delete("/deleteproduct/:id", deleteProduct);

module.exports = router;