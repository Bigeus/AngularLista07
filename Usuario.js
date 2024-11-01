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
 
async function getUsuarios(req, res) {
    const conn = await connect();
    const [rows] = await conn.query('SELECT * FROM usuario');
    res.send(rows);
}

// Obtém um cliente pelo ID
async function getOneUsuario(req, res) {
    const conn = await connect();
    const { id } = req.params;
    const [rows] = await conn.query('SELECT * FROM usuario WHERE id = ?', [id]);
    res.send(rows[0]);
}

module.exports = {
    getUsuarios,
    getOneUsuario
}