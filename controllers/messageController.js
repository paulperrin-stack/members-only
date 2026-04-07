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
    res.render("new-message", { errors: [] });
};

exports.getIndex = async (req, res) => {
    const { rows: messages } = await pool.query(`
        SELECT  messages.id, messages.title, messages.text, messages.created_at,
                users.first_name, users.last_name
        FROM messages
        JOIN users ON messages.user_id = users.id
        ORDER BY messages.created_at DESC
    `);

    res.render("index", { user: req.user, messages });
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

// Delete Controller
exports.deleteMessage = async (req, res) => {
    await pool.query(
        "DELETE FROM messages WHERE id = $1",
        [req.params.id]
    );

    res.redirect("/");
}