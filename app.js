// Imports
require("dotenv").config();
require("./config/passport");
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const path = require("path");
const app = express();
const pool = require("./db/pool");
const authRouter = require("./routes/authRouter");
const flash = require("connect-flash");
const messageRouter = require("./routes/messageRouter");

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

app.use(flash());

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());
app.use("/", authRouter);

// New Message
app.use("/", messageRouter);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));