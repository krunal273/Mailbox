const express = require("express");
const emailController = require("../controllers/emailController");
const router = express.Router();

// receive email
router.get("/", emailController.getAllEmails);

// too see full email
// router.get("/:id", emailController.entireEmail);

module.exports = router;
