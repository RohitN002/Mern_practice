// server/index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv')
const app = express();


dotenv.config()
const PORT = process.env.PORT || 5000;
const MONGO = process.env.MONGOURI
// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB (replace with your MongoDB connection string)
mongoose.connect(MONGO, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define a task schema and model
const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
});

const Task = mongoose.model('Task', taskSchema);

// API routes
app.get('/api/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/tasks', async (req, res) => {
  try {
    const { title, description } = req.body;
    const task = new Task({ title, description });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ error: 'Bad request' });
  }
});

// Add routes for updating and deleting tasks

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
