const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../models/User");

// POST: Registrar
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

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "El usuario no existe" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "La contraseña incorrecta" });
        }

        const token = jwt.sign(
            { id: user._id},
            process.env.JWT_SECRET || "secreto", 
            { expiresIn: "1h" }
        );

        res.json ({ token, user });
    } catch (error) {
        res.status(500).json({message: "Error en el servidor", error});
    }
});

module.exports = router;