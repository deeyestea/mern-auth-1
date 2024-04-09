import express from "express";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import validateLoginInput from "../../validation/login.js";
import validateRegisterInput from "../../validation/register.js";
import User from "../../models/User.js";
import * as dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

router.post("/register", (req, res) => {
    console.log("res", res.json())
    const { errors, isValid } = validateRegisterInput(req.body);

    if (!isValid) res.status(400).json(errors);

    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            return res.status(400).json({ email: "Email already exists" });
        } else {
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
            })

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser
                        .save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err))
                })
            })
        }
    })
})

router.post("/login", (req, res) => {
    console.log("login")
    const { errors, isValid } = validateLoginInput(req.body);

    if (!isValid) res.status(400).json(errors);

    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email }).then(user => {
        if (!user) res.status(400).json({ emailnotfound: "Email not found" })

        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                const payload = {
                    id: user.id,
                    name: user.name
                }

                jwt.sign(payload,
                    process.env.JWT_KEY,
                    {
                        expiresIn: 24 * 60 * 60 * 1000
                    },
                    (err, token) => {
                        res.json({
                            success: true,
                            token: "Bearer " + token
                        });
                    })
            } else {
                return res.status(400).json({ passwordIncorrect: "Password incorrect" })
            }
        })
    });
})

export default router;