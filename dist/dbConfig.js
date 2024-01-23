"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTodosTable = exports.pool = void 0;
const pg_1 = require("pg");
const db_config = {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT || "5432"),
};
const pool = new pg_1.Pool({
    user: db_config.user,
    host: db_config.host,
    database: db_config.database,
    password: db_config.password,
    port: db_config.port,
});
exports.pool = pool;
const createTodosTable = async () => {
    try {
        const createTableQuery = `
        CREATE TABLE IF NOT EXISTS todos (
          id SERIAL PRIMARY KEY,
          description VARCHAR(255) NOT NULL
        );
      `;
        await pool.query(createTableQuery);
        console.log("Todos table created successfully");
    }
    catch (error) {
        console.error("Error creating todos table:", error.message);
    }
};
exports.createTodosTable = createTodosTable;
