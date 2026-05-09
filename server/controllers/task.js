/*****************
TASK CONTROLLER
******************/
const Task = require("../models/Task");

const { errorHandler } = require("../auth");

/**
 * Create new task
 * 
 * @param {*} req
 * @param {*} res
 * 
 * @returns Task success message or validation errors
 */
module.exports.createTask = (req, res) => {

    const newTask = new Task({
        title: req.body.title,
        description: req.body.description,
        status: req.body.status || "Pending",
        userId: req.user.id
    });

    return newTask.save()
    .then(task => {
        return res.status(201).send({
            message: "Task created successfully",
            task
        });
    })
    .catch(error => errorHandler(error, req, res));
};

/**
 * Get all tasks of logged in user
 * 
 * @param {*} req
 * @param {*} res
 * 
 * @returns Task success message or validation errors
 */
module.exports.getMyTasks = (req, res) => {

    return Task.find({ userId: req.user.id })
    .then(tasks => {

        if(tasks.length === 0){
            return res.status(200).send({
                message: "No tasks found",
                tasks: []
            });
        }

        return res.status(200).send(tasks);

    })
    .catch(error => errorHandler(error, req, res));
};

/**
 * Get single task
 * 
 * @param {*} req
 * @param {*} res
 * 
 * @returns Task success message or validation errors
 */
module.exports.getTask = (req, res) => {

    return Task.findOne({
        _id: req.params.taskId,
        userId: req.user.id
    })

    .then(task => {

        if(!task){
            return res.status(404).send({
                error: "Task not found"
            });
        }

        return res.status(200).send(task);

    })

    .catch(error => errorHandler(error, req, res));
};

/**
 * Update single task
 * 
 * @param {*} req
 * @param {*} res
 * 
 * @returns Task success message or validation errors
 */
module.exports.updateTask = (req, res) => {

    const updatedTask = {
        title: req.body.title,
        description: req.body.description,
        status: req.body.status
    };

    return Task.findOneAndUpdate(
        {
            _id: req.params.taskId,
            userId: req.user.id
        },
        updatedTask,
        { new: true }
    )

    .then(task => {

        if(!task){
            return res.status(404).send({
                error: "Task not found"
            });
        }

        return res.status(200).send({
            message: "Task updated successfully",
            task
        });

    })

    .catch(error => errorHandler(error, req, res));
};

/**
 * Delete single task
 * 
 * @param {*} req
 * @param {*} res
 * 
 * @returns Task success message or validation errors
 */
module.exports.deleteTask = (req, res) => {

    return Task.findOneAndDelete({
        _id: req.params.taskId,
        userId: req.user.id
    })

    .then(task => {

        if(!task){
            return res.status(404).send({
                error: "Task not found"
            });
        }

        return res.status(200).send({
            message: "Task deleted successfully"
        });

    })

    .catch(error => errorHandler(error, req, res));
};