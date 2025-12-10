const db = require('../database/db');

module.exports = {
    associar: (req, res) => {
        const { id_produto, id_fornecedor } = req.body;

        db.run(
            "INSERT INTO produto_fornecedor (id_produto, id_fornecedor) VALUES (?, ?)",
            [id_produto, id_fornecedor],
            function (err) {
                if (err) return res.status(500).send(err);
                res.json({ associado: true });
            }
        );
    },

    listarFornecedoresPorProduto: (req, res) => {
        const { id } = req.params;

        db.all(
            "SELECT f.* FROM fornecedores f INNER JOIN produto_fornecedor pf ON f.id = pf.id_fornecedor WHERE pf.id_produto = ?",
            [id],
            (err, rows) => {
                if (err) return res.status(500).send(err);
                res.json(rows);
            }
        );
    }
};
