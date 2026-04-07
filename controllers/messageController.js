// Imports
const pool = require("../db/pool");
const { body, validationResult } = require("express-validator");

// Validation rules
const validateMessage = [
    body("title").trim().notEmpty().withMessage("Title is required"),
    body("text").trim().notEmpty().withMessage("Message text is required"),
];

// GET handler
exports.getNewMessage = (req, res) => {
    res.render("new-message", { error: [] });
};

// POST handler
exports.postNewMessage = [
    validateMessage,
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.render("new-message", { errors: errors.array() });
        }

        const { title, text } = req.body;

        await pool.query(
            "INSERT INTO messages (title, text, user_id) VALUES ($1, $2, $3)",
            [title, text, req.user.id]
        );

        res.redirect("/");
    },
];