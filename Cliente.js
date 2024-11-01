const mysql = require('mysql2/promise');

async function connect() {

    const connection = await mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: 'usbw',
        database: 'vendased',
        port: 3308
    });
    console.log('Conexão criada com sucesso');
    global.connection = connection;
    return connection;
}

// Obtém todos os clientes
async function getClientes(req, res) {
    const conn = await connect();
    const [rows] = await conn.query('SELECT * FROM cliente');
    res.send(rows);
}

// Obtém um cliente pelo ID
async function getOneCliente(req, res) {
    const conn = await connect();
    const { id } = req.params;
    const [rows] = await conn.query('SELECT * FROM cliente WHERE id = ?', [id]);
    res.send(rows[0]);
}

// Adiciona um novo cliente
async function adicionarCliente(req, res) {
    const conn = await connect();
    const { nome, rg, cpf, email, telefone } = req.body;
    const result = await conn.query(
        'INSERT INTO cliente (nome, rg, cpf, email, telefone) VALUES (?, ?, ?, ?, ?)', 
        [nome, rg, cpf, email, telefone]
    );
    res.send(result);
}

// Atualiza um cliente existente
async function atualizarCliente(req, res) {
    const conn = await connect();
    const { nome, rg, cpf, email, telefone } = req.body;
    const { id } = req.params;
    const result = await conn.query(
        'UPDATE cliente SET nome = ?, rg = ?, cpf = ?, email = ?, telefone = ? WHERE id = ?', 
        [nome, rg, cpf, email, telefone, id]
    );
    res.send(result);
}

// Exclui um cliente pelo ID
async function excluirCliente(req, res) {
    const conn = await connect();
    const { id } = req.params;
    const result = await conn.query('DELETE FROM cliente WHERE id = ?', [id]);
    res.send(result);
}

// Exporta todos os métodos
module.exports = {
    getClientes,
    getOneCliente,
    adicionarCliente,
    atualizarCliente,
    excluirCliente
};
