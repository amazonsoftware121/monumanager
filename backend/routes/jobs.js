const express = require("express");
const  jobadd = require("../controllers/job.js");

const router = express.Router();

router.post("/jobadd", jobadd);
router.post("/orderNotes", jobadd);

module.exports = router;