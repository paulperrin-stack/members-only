const { Router } = require("express");
const router = Router();
const authController = require("../controllers/authController");

// Routes
router.get("/sign-up", authController.getSignUp);
router.post("/sign-up", authController.postSignUp);

module.exports = router;