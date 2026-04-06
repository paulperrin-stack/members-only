const pool = require("../db/pool");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");

// GET handler
exports.getSignUp = (req, res) => {
    res.render("sign-up", { errors: [] });
};

// Validation rules
const validationSignUp = [
    body("firstName").trim().notEmpty().withMessage("First name is required"),
    body("lastName").trim().notEmpty().withMessage("Last name is required"),
    body("email").isEmail().withMessage("Must be a valid email"),
    body("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters"),
    body("confirmPassword").custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error("Password do not match");
        }
        return true;
    }),
];

// POST handler
exports.postSignUp = [
    validationSignUp,
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.render("sign-up", { errors: errors.array() });
        }

        const { firstName, lastName, email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        try {
            await pool.query(
                "INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4)",
                [firstName, lastName, email, hashedPassword]
            );
            res.redirect("/log-in");
        } catch (err) {
            if (err.code === "23505") {
                // 23505 is PostgreSQL's unique violation error code
                return res.render("sign-up", {
                    errors: [{ msg: "Email already in use" }],
                });
            }
            throw err;
        }
    },
];

exports.getLogIn = (req, res) => {
    res.render("log-in", { error: null });
};

exports.getIndex = (req, res) => {
    res.render("index", { user: req.user });
}