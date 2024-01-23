import express, { Request, Response } from "express";
import { pool } from "../dbConfig";
const router = express.Router();

router.use(express.json());

// Get all todos
router.get("/", async (req: Request, res: Response) => {
  try {
    const result = await pool.query("SELECT * FROM todos");
    const todos = result.rows;

    res.json({
      message: "Todos fetched successfully",
      todos,
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      error: error.message,
    });
  }
});

// Add a new todo
router.post("/add_todo", async (req: Request, res: Response) => {
  const { description } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO todos (description) VALUES ($1) RETURNING *",
      [description]
    );

    const createdTodo = result.rows[0];

    res.json({
      message: "Todo added successfully",
      todo: createdTodo,
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      error: error.message,
    });
  }
});

// Update a todo by ID
router.put("/update_todo", async (req: Request, res: Response) => {
  const id = req.query.id as string;
  const { description } = req.body;
  try {
    const result = await pool.query(
      "UPDATE todos SET description = $1 WHERE id = $2 RETURNING *",
      [description, id]
    );

    if (result.rows.length > 0) {
      res.json({
        message: "Todo updated successfully",
        todo: result.rows[0],
      });
    } else {
      res.status(404).json({
        error: "Todo not found",
      });
    }
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      error: error.message,
    });
  }
});

// Delete a todo by ID
router.delete("/delete_todo", async (req: Request, res: Response) => {
  const id = req.query.id as string;
  try {
    const result = await pool.query(
      "DELETE FROM todos WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length > 0) {
      res.json({
        message: "Todo deleted successfully",
        todo: result.rows[0],
      });
    } else {
      res.status(404).json({
        error: "Todo not found",
      });
    }
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      error: error.message,
    });
  }
});

export default router;
