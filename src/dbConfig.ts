import { Pool } from "pg";

const db_config = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port:  parseInt(process.env.DB_PORT || "5432"),
};
const pool = new Pool({
  user: db_config.user,
  host: db_config.host,
  database: db_config.database,
  password: db_config.password,
  port: db_config.port,
});

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
  } catch (error: any) {
    console.error("Error creating todos table:", error.message);
  }
};

export { pool, createTodosTable };
