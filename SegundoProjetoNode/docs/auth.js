const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

// Rota de login (simples, sem banco)
router.post("/login", (req, res) => {
    const { usuario, senha } = req.body;

    // Exemplo simples — substitua depois com validação real
    if (usuario !== "admin" || senha !== "1234") {
        return res.status(401).json({ erro: "Credenciais inválidas" });
    }

    const token = jwt.sign(
        { usuario: usuario },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    );

    res.json({ token });
});

module.exports = router;
