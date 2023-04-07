const asyncHandler = require('express-async-handler');
const Todo = require('../Models/Todo');
const ModelService = require('../Services/ModelService');

exports.index = asyncHandler(async (req, res) => {
    const TodoServices = new ModelService(Todo.find({}), req.query);
    const todos = await TodoServices.search().get();
    // const todos = await Todo.find({});
    res.json({
        results: todos.length,
        data: {
            todos,
        },
    });
});

exports.store = asyncHandler(async (req, res) => {
    const newTodo = await Todo.create(req.body);
    res.status(201).json({
        message: 'Todo created successfully',
        data: {
            todo: newTodo,
        },
    });
});

exports.update = asyncHandler(async (req, res) => {
    const todo = await Todo.findById(req.params.todoId);
    if (!todo) {
        res.status(403);
        throw new Error('Todo not found');
    }
    const updatedTodo = await Todo.findByIdAndUpdate(
        req.params.todoId,
        req.body,
        { new: true }
    );
    res.json({
        message: 'Todo updated!',
        data: {
            todo: updatedTodo,
        },
    });
});

exports.delete = asyncHandler(async (req, res) => {
    const todo = await Todo.findById(req.params.todoId);
    if (!todo) {
        res.status(403);
        throw new Error('Todo not found');
    }
    const deletedId = await Todo.findByIdAndDelete(req.params.todoId).select(
        '_id'
    );
    res.json({
        message: 'Todo Deleted',
        id: deletedId,
    });
});
