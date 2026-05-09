/*****************
TASK ROUTE
******************/
const express = require("express");

const taskController = require("../controllers/task");

const { verify } = require("../auth");

const router = express.Router();

// CREATE TASK
router.post("/", verify, taskController.createTask);

// GET ALL TASKS
router.get("/", verify, taskController.getMyTasks);

// GET SINGLE TASK
router.get("/:taskId", verify, taskController.getTask);

// UPDATE TASK
router.patch("/:taskId", verify, taskController.updateTask);

// DELETE TASK
router.delete("/:taskId", verify, taskController.deleteTask);

module.exports = router;