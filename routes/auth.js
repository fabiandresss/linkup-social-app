const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.post("/register", async (req, res) => {
    try {
        const { username, email, password} = req.body;

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "El email ya esta registrado" });
        }

        const newUser = new User ({ username, email, password });
        await newUser.save();

        res.status(201).json({ message: "Usuario registrado con exito", newUser });
    } catch (error) {
        res.status(500).json({message: "Error en el servidor", error});
    }
});

module.exports = router;