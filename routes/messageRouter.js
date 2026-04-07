// Imports
const { Router } = require("express");
const router = Router();
const messageController = require("../controllers/messageController");
const { ensureLoggedIn } = require("../middleware/auth");
const { ensureAdmin } = require("../middleware/auth");

// Routes
router.get("/new-message", ensureLoggedIn, messageController.getNewMessage);
router.post("/new-message", ensureLoggedIn, messageController.postNewMessage);
router.post("/delete/:id", ensureLoggedIn, ensureAdmin, messageController.deleteMessage);

// Export
module.exports = router;