const express = require('express')
const router = express.Router()
const verify = require('./verifyToken')
const Task = require('../models/Task')
const upload = require('../multer/singleUpload')

router.get('/', verify, async (req, res) => {
    try {
        const tasks = await Task.find()
        res.json(tasks)
    } catch (err) {
        res.status(500).send(err)
    }
})

router.get('/:id', getTask, (req, res) => {
    res.send(res.task)
})

router.post('/', upload.single('taskImage'), verify, async (req, res) => {

    const task = new Task({
        task: req.body.task,
        description: req.body.description,
        taskImage: req.file.path,
        author:req.user._id

    })
    try {
        const newTask = await task.save()
        res.status(201).send(newTask)
    } catch (err) {
        res.status(400).send(err)
    }
})

router.patch('/:id', getTask, async (req, res) => {
    if (req.body.task != null) {
        res.task.task = req.body.task
    }
    if (req.body.description != null) {
        res.task.description = req.body.description
    }
    if (req.body.completed != null) {
        res.task.completed = req.body.completed
    }
    try {
        const updateTask = await res.task.save()
        res.json(updateTask)
    } catch (err) {
        res.status(400).send(err)
    }
})

router.delete('/:id', getTask, async (req, res) => {
    try {
        await res.task.remove()
        res.json({ message: 'Deleted Task' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

async function getTask(req, res, next) {
    let task
    try {
        task = await Task.findById(req.params.id)
        if (task == null) {
            return res.status(404).json({ message: 'Cannot find task' })
        }
    } catch (err) {
        res.json(err)
        return res.status(500).json({ message: err.message })
    }
    res.task = task
    next()
}

module.exports = router