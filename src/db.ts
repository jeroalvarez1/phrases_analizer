import { createPool } from "mysql2/promise";

//Funcion para conectarnos a mysql y hacer consultas
export async function connectdb() {
    const connection = await createPool({
        host: 'localhost',
        user: 'root',
        password: '1234',
        database: 'api_emotions',
    });
    return connection;
}