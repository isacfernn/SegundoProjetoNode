require("dotenv").config();
const express = require("express");
const app = express();

// Para aceitar JSON
app.use(express.json());

// Middleware de logs
const log = require("./middleware/Log");
app.use(log);

// Swagger
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./docs/swagger.json");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Rotas
const routesProdutos = require("./routes/produtos");
const routesFornecedores = require("./routes/fornecedores");
const routesAssociacao = require("./routes/associacoes");
const authRoutes = require("./routes/auth");

// Registrar rotas
app.use("/auth", authRoutes);
app.use("/produtos", routesProdutos);
app.use("/fornecedores", routesFornecedores);
app.use("/associar", routesAssociacao);

// Rota inicial
app.get("/", (req, res) => {
    res.send("API funcionando! Rotas: /auth /produtos /fornecedores /associar /api-docs");
});

// Inicializar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));
