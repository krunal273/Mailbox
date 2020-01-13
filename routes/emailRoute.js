const express = require("express");
const emailController = require("../controllers/emailController");
const router = express.Router();

// receive email
router.get("/", emailController.receive);


// send email (save in database)
router.post("/", emailController.compose);

// sent email
router.get("/sent", emailController.sent);

// archive email
router.get("/archive", emailController.archive);

// delete
router.get("/delete", emailController.delete);

router.post("/action/:id", emailController.actionById);

router.get("/search", emailController.search);

// too see full email
router.get("/:id", emailController.entireEmail);
module.exports = router;
