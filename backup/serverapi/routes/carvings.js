const  express = require("express");
const  {addCarving,getCarvings,getCarving,updateCarving,deleteCarving}  = require("../controllers/carving.js");

const router = express.Router();

router.post("/addcarving/:orderid", addCarving);
router.get("/getcarvings", getCarvings);
router.get("/getcarving/:carvingid", getCarving);
router.put("/getcarving/:carvingid", updateCarving);
router.delete("/deletecarving/:id", deleteCarving);

module.exports = router;