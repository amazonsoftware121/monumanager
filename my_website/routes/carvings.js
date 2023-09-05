const  express = require("express");
const  {addCarving,getCarvings,getCarving,editCarving,deleteCarving}  = require("../controllers/carving.js");

const router = express.Router();

router.post("/addcarving/:orderid", addCarving);
router.post("/addcarving", addCarving);
router.get("/getcarvings", getCarvings);
router.get("/getcarving/:carvingid", getCarving);
router.put("/editcarving/:carvingId", editCarving);
router.delete("/deletecarving/:id", deleteCarving);

module.exports = router;