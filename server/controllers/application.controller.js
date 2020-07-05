"use strict"

const HttpResponse = require('../models/http-response');
const Todo = require('../models/todoModel');


const showTask = async(req, res) => {
    let list = [];
    try {
        list = await Todo.find({ userId: 1, isDone: false })
    } catch (err) {
        const error = new HttpResponse(
            'Something went wrong while checking user email',
            500
        );
        return res.status(500).json({ response: error })
    }
    res.status(200).json(list)
}

const addTask = async(req, res) => {
    const data = req.body;
    console.log(req.body)

    var createdTask;
    createdTask = new Todo(data);
    console.log("ko")

    try {
        await createdTask.save();

    } catch (err) {
        console.log(err)
        const error = new HttpResponse(
            err,
            500
        );
        return res.status(500).json({ response: error })
    }

    res.status(201).json({
        data
    });

}

const editTask = async(req, res) => {
    const id = req.params.id;
    console.log(req.params.id)
    const data = req.body;
    console.log("hi")
    console.log(data)
    try {
        await Todo.findByIdAndUpdate(id, data, { new: true });
        res.send({ success: true });
    } catch (error) {
        console.error(error);
        res.send({ success: false });
    }

}
const deleteTask = async(req, res) => {
    const { id } = req.params;
    // const data = req.body;
    try {
        await Todo.findByIdAndDelete(id);
        // console.log(data)
        res.send({ success: true });
    } catch (error) {
        console.error(error);
        res.send({ success: false });
    }
}

const queryTask = async(req, res) => {
    let query = [];
    console.log(req.body.taskName)
    try {
        query = await Todo.find({ taskName: req.body.taskName })
    } catch (err) {
        const error = new HttpResponse(
            'Something went wrong while checking user email',
            500
        );
        return res.status(500).json({ response: error })
    }
    res.status(200).json(query)

}



exports.showTask = showTask
exports.addTask = addTask
exports.editTask = editTask
exports.deleteTask = deleteTask
exports.queryTask = queryTask