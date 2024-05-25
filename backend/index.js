const express = require('express');
const bodyParser = require('body-parser');
const redis = require('redis');
const { v4: uuidv4 } = require('uuid');
const cors = require('cors');

const app = express();
const client = redis.createClient();

app.use(bodyParser.json());
app.use(cors());

// client.on('error', (err) => {
//   console.error('Redis error:', err);
// });

(async () => {
    await client.connect();
})();

client.on('connect', () => console.log('Redis Client Connected'));
client.on('error', (err) => console.log('Redis Client Connection Error', err));

app.get('/tasks', async (req, res) => {
    try {
      const tasks = await client.hGetAll('tasks');
      const taskList = tasks ? Object.values(tasks).map(task => JSON.parse(task)) : [];
      console.log(taskList); // Logging the raw tasks object to the console
      res.send(taskList); // Sending the raw tasks object as the response
    } catch (err) {
      console.error('Error fetching tasks from Redis:', err);
      res.status(500).send(err);
    }
  });
  
  app.get('/tasks/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const task = await client.hGet('tasks', id);
      if (task) {
        res.send(JSON.parse(task));
      } else {
        res.status(404).send({ error: 'Task not found' });
      }
    } catch (err) {
      console.error('Error fetching tasks from Redis:', err);
      res.status(500).send(err);
    }
  });
  

app.post('/tasks', async(req, res) => {
  const id = uuidv4();
  const task = { id, ...req.body };
  try{
    await client.hSet('tasks', id, JSON.stringify(task))
    res.status(201).send(task);
  }
  catch(err){
    console.log(err)
    return res.status(500).send(err);
  }
});

app.put('/tasks/:id', async (req, res) => {
    const { id } = req.params;
    const updatedTask = { id, ...req.body };
  
    try {
      await client.hSet('tasks', id, JSON.stringify(updatedTask));
      res.send(updatedTask);
    } catch (err) {
      console.error('Error updating task in Redis:', err);
      res.status(500).send(err);
    }
  });
  
  app.delete('/tasks/:id', async (req, res) => {
    const { id } = req.params;
    try {
      await client.hDel('tasks', id);
      res.status(204).send();
    } catch (err) {
      console.error('Error deleting task from Redis:', err);
      res.status(500).send(err);
    }
  });
  

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
