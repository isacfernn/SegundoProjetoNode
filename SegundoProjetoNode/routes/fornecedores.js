const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const db = require("../database/db");

// LISTAR
router.get("/lista", auth, (req, res) => {
    db.all("SELECT * FROM fornecedores", [], (err, rows) => {
        if (err) return res.status(500).json({ erro: err.message });
        res.json(rows);
    });
});

// CRIAR
router.post("/criar", auth, (req, res) => {
    const { nome, contato } = req.body;

    db.run(
        "INSERT INTO fornecedores (nome, contato) VALUES (?, ?)",
        [nome, contato],
        function (err) {
            if (err) return res.status(500).json({ erro: err.message });
            res.json({ mensagem: "Fornecedor criado!", id: this.lastID });
        }
    );
});

// ATUALIZAR
router.put("/:id", auth, (req, res) => {
    const { nome, contato } = req.body;

    db.run(
        "UPDATE fornecedores SET nome = ?, contato = ? WHERE id = ?",
        [nome, contato, req.params.id],
        function (err) {
            if (err) return res.status(500).json({ erro: err.message });
            res.json({ mensagem: "Fornecedor atualizado!" });
        }
    );
});

// DELETAR
router.delete("/:id", auth, (req, res) => {
    db.run(
        "DELETE FROM fornecedores WHERE id = ?",
        [req.params.id],
        function (err) {
            if (err) return res.status(500).json({ erro: err.message });
            res.json({ mensagem: "Fornecedor deletado!" });
        }
    );
});

module.exports = router;
