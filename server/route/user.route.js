const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../model/user.model");
const userRouter = express.Router();


userRouter.post("/register", async (req, res) => {
    const payload = req.body;
    console.log(payload);
    const { password, email } = payload;
    const user = await userModel.findOne({ email });
    if (user) {
        res.send("User Already exist, please login");
    } else {
        try {
            bcrypt.hash(password, 5, async (err, hash) => {
                if (err) {
                    res.send({ msg: "something went wrong while hashing password" });
                } else {
                    const user = new userModel({ ...payload, password: hash });
                    await user.save();
                    res.send({ msg: "You have been registered successfully" });
                }
            });
        } catch (err) {
            res.send({
                msg: "somthing went wrong, cannot register.",
                error: err.message,
            });
        }
    }
});


userRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email });
        if (user) {
            bcrypt.compare(password, user.password, async (err, result) => {
                if (result) {
                    let token = jwt.sign({ userID: user._id }, "meeku");
                    await userModel.findByIdAndUpdate(
                        { _id: user._id },
                        { is_active: true }
                    );
                    res.send({ msg: "Login Successfull", token: token });
                } else {
                    res.send({ msg: "Wrong Credentials" });
                }
            });
        } else {
            res.send({ msg: "User not found!" });
        }
    } catch (err) {
        res.send({ msg: "Something went wrong, cannot login", error: err.message });
    }
});

module.exports = userRouter;