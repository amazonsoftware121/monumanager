const express = require("express");
const {login,logout,sendResetEmail} = require('../controllers/auth.js');

const router = express.Router();

router.post("/login", login);
router.post("/logout", logout);
router.post("/send-reset-email", sendResetEmail);

module.exports = router;