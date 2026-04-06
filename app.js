// Imports
require("dotenv").config();
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const path = require("path");
const app = express();
const pool = require("./db/pool");

// View engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Parse form data
app.use(express.urlencoded({ extended: false}));

// Sessions
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
}));

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));