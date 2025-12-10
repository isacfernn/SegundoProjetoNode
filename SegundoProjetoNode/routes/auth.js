const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.post("/login", (req, res) => {
    const { usuario, senha } = req.body;

    if (usuario !== "admin" || senha !== "1234") {
        return res.status(401).json({ erro: "Credenciais inválidas" });
    }

    const token = jwt.sign(
        { usuario },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    );

    res.json({ token });
});

module.exports = router;
