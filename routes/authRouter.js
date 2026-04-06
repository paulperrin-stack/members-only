const { Router } = require("express");
const router = Router();
const authController = require("../controllers/authController");
const passport = require("passport");

// Routes
router.get("/sign-up", authController.getSignUp);
router.post("/sign-up", authController.postSignUp);

// Login Routes
router.get("/log-in", authController.getLogIn);
router.post(
    "/log-in",
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/log-in",
        failureFlash: false,
    })
);

router.get("/", authController.getIndex);

router.get("/log-out", (req, res) => {
    req.logout((err) => {
        if (err) return next(err);
        res.redirect("/");
    });
});

module.exports = router;