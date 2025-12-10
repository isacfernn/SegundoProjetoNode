const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const db = require("../database/db");

// ASSOCIAR
router.post("/", auth, (req, res) => {
    const { produto_id, fornecedor_id } = req.body;

    db.run(
        "INSERT INTO associacoes (produto_id, fornecedor_id) VALUES (?, ?)",
        [produto_id, fornecedor_id],
        function (err) {
            if (err) return res.status(500).json({ erro: err.message });
            res.json({ mensagem: "Associação criada!", id: this.lastID });
        }
    );
});

// LISTAR
router.get("/lista", auth, (req, res) => {
    db.all(
        `SELECT a.id, p.nome AS produto, f.nome AS fornecedor
         FROM associacoes a
         JOIN produtos p ON a.produto_id = p.id
         JOIN fornecedores f ON a.fornecedor_id = f.id`,
        [],
        (err, rows) => {
            if (err) return res.status(500).json({ erro: err.message });
            res.json(rows);
        }
    );
});

// DELETAR
router.delete("/:id", auth, (req, res) => {
    db.run(
        "DELETE FROM associacoes WHERE id = ?",
        [req.params.id],
        (err) => {
            if (err) return res.status(500).json({ erro: err.message });
            res.json({ mensagem: "Associação removida!" });
        }
    );
});

module.exports = router;
