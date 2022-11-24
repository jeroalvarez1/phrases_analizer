const mysql = require('mysql2');

export async function connect() {
    const connection = {
        host: 'localhost',
        user: 'root',
        password: '1234',
        database: 'api_emotions',
    };
    return mysql.createPool(connection);
}