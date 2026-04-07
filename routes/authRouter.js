const { Router } = require("express");
const { ensureLoggedIn } = require("../middleware/auth");
const router = Router();
const authController = require("../controllers/authController");
const passport = require("passport");
const messageController = require("../controllers/messageController");

// Routes
router.get("/sign-up", authController.getSignUp);
router.post("/sign-up", authController.postSignUp);
router.get("/", messageController.getIndex);


// Login Routes
router.get("/log-in", authController.getLogIn);
router.post(
    "/log-in",
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/log-in",
        failureFlash: true,
    })
);

router.get("/", authController.getIndex);

router.get("/log-out", (req, res) => {
    req.logout((err) => {
        if (err) return next(err);
        res.redirect("/");
    });
});

// ensureLoggedIn
router.get("/join", ensureLoggedIn, authController.getJoin);
router.post("/join", ensureLoggedIn, authController.postJoin);

module.exports = router;