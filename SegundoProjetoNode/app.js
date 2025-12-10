const express = require('express');
const router = express.Router();
const db = require('../database/db');


// ========================
// PRODUTOS
// ========================

// Listar produtos
router.get('/produtos', (req, res) => {
    db.all("SELECT * FROM produtos", [], (err, rows) => {
        if (err) return res.status(500).send(err);
        res.json(rows);
    });
});

// Criar produto
router.post('/produtos', (req, res) => {
    const { nome, descricao, preco, codigo_barras } = req.body;

    db.run(
        "INSERT INTO produtos (nome, descricao, preco, codigo_barras) VALUES (?, ?, ?, ?)",
        [nome, descricao, preco, codigo_barras],
        function (err) {
            if (err) return res.status(500).send(err);
            res.json({ id: this.lastID });
        }
    );
});

// Atualizar produto
router.put('/produtos/:id', (req, res) => {
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
});

// Deletar produto
router.delete('/produtos/:id', (req, res) => {
    const { id } = req.params;

    db.run("DELETE FROM produtos WHERE id=?", [id], function (err) {
        if (err) return res.status(500).send(err);
        res.json({ deletado: this.changes });
    });
});


// ========================
// FORNECEDORES
// ========================

// Listar fornecedores
router.get('/fornecedores', (req, res) => {
    db.all("SELECT * FROM fornecedores", [], (err, rows) => {
        if (err) return res.status(500).send(err);
        res.json(rows);
    });
});

// Criar fornecedor
router.post('/fornecedores', (req, res) => {
    const { nome, cnpj, endereco, contato } = req.body;

    db.run(
        "INSERT INTO fornecedores (nome, cnpj, endereco, contato) VALUES (?, ?, ?, ?)",
        [nome, cnpj, endereco, contato],
        function (err) {
            if (err) return res.status(500).send(err);
            res.json({ id: this.lastID });
        }
    );
});

// Atualizar fornecedor
router.put('/fornecedores/:id', (req, res) => {
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
});

// Deletar fornecedor
router.delete('/fornecedores/:id', (req, res) => {
    const { id } = req.params;

    db.run("DELETE FROM fornecedores WHERE id=?", [id], function (err) {
        if (err) return res.status(500).send(err);
        res.json({ deletado: this.changes });
    });
});


// ========================
// ASSOCIAÇÕES PRODUTO — FORNECEDOR
// ========================

// Associar
router.post('/associar', (req, res) => {
    const { id_produto, id_fornecedor } = req.body;

    db.run(
        "INSERT INTO produto_fornecedor (id_produto, id_fornecedor) VALUES (?, ?)",
        [id_produto, id_fornecedor],
        function (err) {
            if (err) return res.status(500).send(err);
            res.json({ associado: true });
        }
    );
});

// Listar fornecedores de um produto
router.get('/associar/produto/:id', (req, res) => {
    const { id } = req.params;

    db.all(
        `SELECT f.* FROM fornecedores f 
         INNER JOIN produto_fornecedor pf ON pf.id_fornecedor = f.id 
         WHERE pf.id_produto = ?`,
        [id],
        (err, rows) => {
            if (err) return res.status(500).send(err);
            res.json(rows);
        }
    );
});

module.exports = router;

app.get('/', (req, res) => {
    res.send('API funcionando! Use /produtos');
});
