const express = require('express');
const cors = require('cors');
const {
    getClientes,
    getOneCliente,
    adicionarCliente,
    atualizarCliente,
    excluirCliente
} = require('./Cliente'); // Importa o módulo Cliente
const { getUsuarios, getOneUsuario } = require('./Usuario');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json()); // Middleware para interpretar JSON
app.use(express.urlencoded({ extended: true })); // Middleware para interpretar URL-encoded

// Rotas para a API de clientes
app.get('/cliente', getClientes); // Rota para obter todos os clientes
app.get('/cliente/:id', getOneCliente); // Rota para obter um cliente específico
app.post('/cliente', adicionarCliente); // Rota para adicionar um cliente
app.put('/cliente/:id', atualizarCliente); // Rota para atualizar um cliente
app.delete('/cliente/:id', excluirCliente); // Rota para excluir um cliente

app.get('/usuario', getUsuarios);
app.get('/usuario/:id', getOneUsuario);

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
