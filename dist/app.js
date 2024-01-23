"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const todoRoutes_1 = __importDefault(require("./routers/todoRoutes"));
const dbConfig_1 = require("./dbConfig");
const app = (0, express_1.default)();
const port = 8080;
app.use((0, cors_1.default)());
dbConfig_1.pool
    .connect()
    .then(() => {
    console.log("Connected to PostgreSQL");
    (0, dbConfig_1.createTodosTable)();
})
    .catch((err) => console.error("Error connecting to PostgreSQL:", err));
app.use("/todos", todoRoutes_1.default);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
