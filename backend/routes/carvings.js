const  express = require("express");
const  {addCarving,getCarvings,getCarving}  = require("../controllers/carving.js");

const router = express.Router();

router.post("/addcarving/:orderid", addCarving);
router.get("/getcarvings", getCarvings);
router.get("/getcarving/:carvingid", getCarving);

module.exports = router;