const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");

// Load User model
const User = require("../../models/User");

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register",
    // Form validation
    [
        check("name", "Name is required")
            .not()
            .isEmpty(),
        check("email", "Please include a valid email")
            .isEmail(),
        check(
            "password",
            "Please enter a password with 6 or more characters")
            .isLength({ min: 6 })
    ],
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            })
        }

        const { name, email, password } = req.body

        try {

            // Does user exist?

            let user = await User.findOne({ email });

            if (user) {
                return res.stats(400).json({ errors: [{ msg: "Email already exists" }] })
            }

            // Create new user

            user = new User({
                name,
                email,
                password
            })

            // Encrypt password

            const salt = await bcrypt.genSalt(10);

            user.password = await bcrypt.hash(password, salt);

            await user.save();

            // Return jsonWebToken
            const payload = {
                user: {
                    id: user.id
                }
            };

            jwt.sign(
                payload,
                config.get("jwtSecret"),
                // Expire in 1 year
                { expiresIn: 31556926 },
                (err, token) => {
                    if (err) throw err;
                    res.json({ token });
                }
            );
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server error")
        }

    });

module.exports = router;