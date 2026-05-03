import express from "express";
import Task from "../models/Task.js";

const router = express.Router();

// DASHBOARD STATS
router.get("/", async (req, res) => {
  try {
    const totalTasks = await Task.countDocuments();

    const completedTasks = await Task.countDocuments({
      status: "Done"
    });

    const pendingTasks = await Task.countDocuments({
      status: "Pending"
    });

    const overdueTasks = await Task.countDocuments({
      dueDate: { $lt: new Date() },
      status: { $ne: "Done" }
    });

    res.json({
      totalTasks,
      completedTasks,
      pendingTasks,
      overdueTasks
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;