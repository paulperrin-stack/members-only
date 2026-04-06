const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const pool = require("../db/pool");

// Local Strategy
passport.use(new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
        try {
            const { rows } = await pool.query(
                "SELECT * FROM users WHERE email = $1",
                [email]
            );

            const match = await bcrypt.compare(password, user.password);

            if (!match) {
                return done(null, false, { message: "Incorret password" });
            }

            return done(null, user);
        } catch {
            return done(err);
        }
    }
));

// Serialize and Deserialize
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const { rows } = await pool.query(
            "SELECT * FROM users WHERE id = $1",
            [id]
        );
        done(null, rows[0]);
    } catch (err) {
        done(err);
    }
});

module.exports = passport;