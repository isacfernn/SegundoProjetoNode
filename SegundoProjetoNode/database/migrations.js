const db = require('./db');

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
            telefone TEXT,
            email TEXT
        );
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS produto_fornecedor (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            id_produto INTEGER,
            id_fornecedor INTEGER
        );
    `);
});

console.log("Migrations executadas!");
