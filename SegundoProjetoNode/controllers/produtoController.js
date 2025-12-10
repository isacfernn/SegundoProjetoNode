const db = require('../database/db');

module.exports = {
    listar: (req, res) => {
        db.all("SELECT * FROM produtos", [], (err, rows) => {
            if (err) return res.status(500).send(err);
            res.json(rows);
        });
    },

    criar: (req, res) => {
        const { nome, descricao, preco, codigo_barras } = req.body;

        db.run(
            "INSERT INTO produtos (nome, descricao, preco, codigo_barras) VALUES (?, ?, ?, ?)",
            [nome, descricao, preco, codigo_barras],
            function (err) {
                if (err) return res.status(500).send(err);
                res.json({ id: this.lastID });
            }
        );
    },

    atualizar: (req, res) => {
        const { id } = req.params;
        const { nome, descricao, preco, codigo_barras } = req.body;

        db.run(
            "UPDATE produtos SET nome=?, descricao=?, preco=?, codigo_barras=? WHERE id=?",
            [nome, descricao, preco, codigo_barras, id],
            function (err) {
                if (err) return res.status(500).send(err);
                res.json({ atualizado: this.changes });
            }
        );
    },

    deletar: (req, res) => {
        const { id } = req.params;

        db.run("DELETE FROM produtos WHERE id=?", [id], function (err) {
            if (err) return res.status(500).send(err);
            res.json({ deletado: this.changes });
        });
    }
};
