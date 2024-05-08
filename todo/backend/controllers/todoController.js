const Todo = require('../models/todoSchema');

// GET all todos
exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST a new todo
exports.createTodo = async (req, res) => {
  const { title } = req.body;
  const newTodo = new Todo({ title });
  try {
    const savedTodo = await newTodo.save();
    res.json(savedTodo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// PUT update a todo
exports.updateTodo = async (req, res) => {
  const { title } = req.body;
  const id = req.params.id;
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(id, { title }, { new: true });
    if (!updatedTodo) return res.status(404).json({ message: 'Todo not found' });
    res.json(updatedTodo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE a todo
exports.deleteTodo = async (req, res) => {
  const id = req.params.id;
  try {
    const deletedTodo = await Todo.findByIdAndDelete(id);
    if (!deletedTodo) return res.status(404).json({ message: 'Todo not found' });
    res.json({ message: 'Todo deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
