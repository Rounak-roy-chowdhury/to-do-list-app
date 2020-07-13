"use strict"

const HttpResponse = require('../models/http-response');
const Todo = require('../models/todoModel');
var url = require('url');


const showTask = async(req, res) => {
    var a = url.parse(req.url, true).query;
    var q = a.sort
    if(q==="all1")
    {
        let list = [];
        try {
            list = await Todo.find({ userId: 1, isDone: false }).sort({ deadline: 'asc'});
        } catch (err) {
            const error = new HttpResponse(
                'Something went wrong while checking user email',
                500
            );
            return res.status(500).json({ response: error })
        }
        res.status(200).json(list)
    }
    else if(q==="all2")
    {
        let list = [];
        try {
            list = await Todo.find({ userId: 1, isDone: true }).sort({ deadline: 'asc'});
        } catch (err) {
            const error = new HttpResponse(
                'Something went wrong while checking user email',
                500
            );
            return res.status(500).json({ response: error })
        }
        res.status(200).json(list)
    }
    else if(q==="taskName1")
    {
        let list = [];
        try {
            list = await Todo.find({ userId: 1, isDone: false }).sort({ taskName: 'asc'});
        } catch (err) {
            const error = new HttpResponse(
                'Something went wrong while checking user email',
                500
            );
            return res.status(500).json({ response: error })
        }
        res.status(200).json(list)
    }
    else if(q==="taskName2")
    {
        let list = [];
        try {
            list = await Todo.find({ userId: 1, isDone: true }).sort({ taskName: 'asc'});
        } catch (err) {
            const error = new HttpResponse(
                'Something went wrong while checking user email',
                500
            );
            return res.status(500).json({ response: error })
        }
        res.status(200).json(list)
    }
    else if(q==="priority1")
    {
        let list = [];
        try {
            list = await Todo.find({ userId: 1, isDone: false, priority:true });
        } catch (err) {
            const error = new HttpResponse(
                'Something went wrong while checking user email',
                500
            );
            return res.status(500).json({ response: error })
        }
        res.status(200).json(list)
    }
    else if(q==="priority2")
    {
        let list = [];
        try {
            list = await Todo.find({ userId: 1, isDone: true, priority:true  });
        } catch (err) {
            const error = new HttpResponse(
                'Something went wrong while checking user email',
                500
            );
            return res.status(500).json({ response: error })
        }
        res.status(200).json(list)
    }
    else if(q==="noDeadline")
    {
        let list = [];
        try {
            list = await Todo.find({ userId: 1, isDone: false, deadline:undefined  });
        } catch (err) {
            const error = new HttpResponse(
                'Something went wrong while checking user email',
                500
            );
            return res.status(500).json({ response: error })
        }
        res.status(200).json(list)
    }
    // else if(q==="overdue")
    // {
    //     let list = [];
    //     try {
    //         list = await Todo.find({ userId: 1, isDone: false }).sort({ deadline: 'asc'});
    //     } catch (err) {
    //         const error = new HttpResponse(
    //             'Something went wrong while checking user email',
    //             500
    //         );
    //         return res.status(500).json({ response: error })
    //     }
    //     res.status(200).json(list)
    // }
    else if(q==="isDoneDate")
    {
        let list = [];
        try {
            list = await Todo.find({ userId: 1, isDone: true }).sort({ dateTaskDone: 'asc'});
        } catch (err) {
            const error = new HttpResponse(
                'Something went wrong while checking user email',
                500
            );
            return res.status(500).json({ response: error })
        }
        res.status(200).json(list)
    }
   
}

const addTask = async(req, res) => {
    const data = req.body;
    console.log(req.body)

    var createdTask;
    createdTask = new Todo(data);

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
    try {
        await Todo.findByIdAndDelete(id);
        res.send({ success: true });
    } catch (error) {
        console.error(error);
        res.send({ success: false });
    }
}

const queryTask = async(req, res) => {
    let query = [];
    var a = url.parse(req.url, true).query;
    var q = a.taskName
    console.log(q)
    try {
        query = await Todo.find({ taskName: q })
    } catch (err) {
        const error = new HttpResponse(
            'Something went wrong while checking user email',
            500
        );
        return res.status(500).json({ response: error })
    }
    res.status(200).json(query)
    console.log(query)

}



exports.showTask = showTask
exports.addTask = addTask
exports.editTask = editTask
exports.deleteTask = deleteTask
exports.queryTask = queryTask