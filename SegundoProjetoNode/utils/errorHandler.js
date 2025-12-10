module.exports = (err, req, res, next) => {
    console.error("Erro:", err);
    res.status(500).json({ erro: err.message });
};
