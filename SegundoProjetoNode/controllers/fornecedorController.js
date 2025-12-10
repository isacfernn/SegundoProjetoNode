const db = require('../database/db');

module.exports = {
    listar: (req, res) => {
        db.all("SELECT * FROM fornecedores", [], (err, rows) => {
            if (err) return res.status(500).send(err);
            res.json(rows);
        });
    },

    criar: (req, res) => {
        const { nome, cnpj, endereco, contato } = req.body;

        db.run(
            "INSERT INTO fornecedores (nome, cnpj, endereco, contato) VALUES (?, ?, ?, ?)",
            [nome, cnpj, endereco, contato],
            function (err) {
                if (err) return res.status(500).send(err);
                res.json({ id: this.lastID });
            }
        );
    },

    atualizar: (req, res) => {
        const { id } = req.params;
        const { nome, cnpj, endereco, contato } = req.body;

        db.run(
            "UPDATE fornecedores SET nome=?, cnpj=?, endereco=?, contato=? WHERE id=?",
            [nome, cnpj, endereco, contato, id],
            function (err) {
                if (err) return res.status(500).send(err);
                res.json({ atualizado: this.changes });
            }
        );
    },

    deletar: (req, res) => {
        const { id } = req.params;

        db.run("DELETE FROM fornecedores WHERE id=?", [id], function (err) {
            if (err) return res.status(500).send(err);
            res.json({ deletado: this.changes });
        });
    }
};
