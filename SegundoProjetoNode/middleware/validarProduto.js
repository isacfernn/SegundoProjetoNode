module.exports = (req, res, next) => {
    const { nome, preco } = req.body;

    if (!nome) return res.status(400).json({ erro: "Nome é obrigatório" });
    if (!preco) return res.status(400).json({ erro: "Preço é obrigatório" });

    next();
};
