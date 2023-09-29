const express = require("express");
const {sendResetEmail} = require('../controllers/sendresetemail.js');

const router = express.Router();

router.post("/send-reset-email", sendResetEmail);

module.exports = router;