import express from "express";
import Task from "../models/Task.js";

const router = express.Router();

// CREATE TASK
router.post("/", async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET TASKS
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find().populate("projectId");
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE TASK
router.put("/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;