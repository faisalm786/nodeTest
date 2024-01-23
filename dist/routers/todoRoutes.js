"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dbConfig_1 = require("../dbConfig");
const router = express_1.default.Router();
router.use(express_1.default.json());
// Get all todos
router.get("/", async (req, res) => {
    try {
        const result = await dbConfig_1.pool.query("SELECT * FROM todos");
        const todos = result.rows;
        res.json({
            message: "Todos fetched successfully",
            todos,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            error: error.message,
        });
    }
});
// Add a new todo
router.post("/add_todo", async (req, res) => {
    const { description } = req.body;
    try {
        const result = await dbConfig_1.pool.query("INSERT INTO todos (description) VALUES ($1) RETURNING *", [description]);
        const createdTodo = result.rows[0];
        res.json({
            message: "Todo added successfully",
            todo: createdTodo,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            error: error.message,
        });
    }
});
// Update a todo by ID
router.put("/update_todo", async (req, res) => {
    const id = req.query.id;
    const { description } = req.body;
    try {
        const result = await dbConfig_1.pool.query("UPDATE todos SET description = $1 WHERE id = $2 RETURNING *", [description, id]);
        if (result.rows.length > 0) {
            res.json({
                message: "Todo updated successfully",
                todo: result.rows[0],
            });
        }
        else {
            res.status(404).json({
                error: "Todo not found",
            });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            error: error.message,
        });
    }
});
// Delete a todo by ID
router.delete("/delete_todo", async (req, res) => {
    const id = req.query.id;
    try {
        const result = await dbConfig_1.pool.query("DELETE FROM todos WHERE id = $1 RETURNING *", [id]);
        if (result.rows.length > 0) {
            res.json({
                message: "Todo deleted successfully",
                todo: result.rows[0],
            });
        }
        else {
            res.status(404).json({
                error: "Todo not found",
            });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            error: error.message,
        });
    }
});
exports.default = router;
