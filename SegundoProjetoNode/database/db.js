const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS produtos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT,
            descricao TEXT,
            preco REAL,
            codigo_barras TEXT
        );
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS fornecedores (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT,
            cnpj TEXT,
            endereco TEXT,
            contato TEXT
        );
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS produto_fornecedor (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            id_produto INTEGER,
            id_fornecedor INTEGER,
            FOREIGN KEY(id_produto) REFERENCES produtos(id),
            FOREIGN KEY(id_fornecedor) REFERENCES fornecedores(id)
        );
    `);
});

module.exports = db;
