const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const db = require("../database/db");

// LISTAR
router.get("/lista", auth, (req, res) => {
    db.all("SELECT * FROM produtos", [], (err, rows) => {
        if (err) return res.status(500).json({ erro: err.message });
        res.json(rows);
    });
});

// CRIAR
router.post("/criar", auth, (req, res) => {
    const { nome, preco } = req.body;

    db.run(
        "INSERT INTO produtos (nome, preco) VALUES (?, ?)",
        [nome, preco],
        function (err) {
            if (err) return res.status(500).json({ erro: err.message });
            res.json({ mensagem: "Produto criado!", id: this.lastID });
        }
    );
});

// ATUALIZAR
router.put("/:id", auth, (req, res) => {
    const { nome, preco } = req.body;

    db.run(
        "UPDATE produtos SET nome = ?, preco = ? WHERE id = ?",
        [nome, preco, req.params.id],
        function (err) {
            if (err) return res.status(500).json({ erro: err.message });
            res.json({ mensagem: "Produto atualizado!" });
        }
    );
});

// DELETAR
router.delete("/:id", auth, (req, res) => {
    db.run(
        "DELETE FROM produtos WHERE id = ?",
        [req.params.id],
        function (err) {
            if (err) return res.status(500).json({ erro: err.message });
            res.json({ mensagem: "Produto deletado!" });
        }
    );
});

module.exports = router;
