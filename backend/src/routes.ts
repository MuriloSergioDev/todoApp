import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

interface user {
  username: string,
  password: string
}

interface task {
  id: number
  title: string,
  status: string,
  deadline: string,
  description: string,
  checklist: string[],
}

const routes = express.Router();

const users: user[] = [];
let tasks: task[] = [];
const secret = <string>process.env.ACESS_TOKEN_SECRET;


routes.get('/users', function (req, res) {
  res.send(users);
});

routes.get('/tasks', function (req, res) {
  res.send(tasks);
});

routes.put('/updateTask/:id', function (req, res) {

  const updateTask = {
    id : parseInt(req.params.id),
    title: req.body.title,
    status: req.body.status,
    deadline: req.body.deadline,
    description: req.body.description,
    checklist: req.body.checklist,
  }

  const newTasks = tasks.map((task) => {
    if (task.id === parseInt(req.params.id))
      return updateTask;

    return task
  });

  tasks = newTasks;

  res.send(tasks);
})

routes.delete('/deleteTask/:id', function (req, res) {

  const newTasks = tasks.filter((task) => {
    if (task.id === parseInt(req.params.id))
      return false;

    return true;
  });
  tasks = newTasks;

  res.send(tasks);
});

routes.post('/newTask', function (req, res) {
  
  let newTask = {
    id: tasks.length + 1,
    title: req.body.title,
    status: req.body.status,
    deadline: req.body.deadline,
    description: req.body.description,
    checklist: req.body.checklist
  };

  tasks.push(newTask);

  res.status(201).send('A tarefa foi criada');
});

routes.post('/verifyToken', function (req, res) {
  jwt.verify(req.body.token, secret, function (err: any, decoded: any) {
    res.status(200).send('token autorizado');
  });

})

routes.post('/signIn', async function (req, res) {
  const user = users.find(user => user.username === req.body.username);

  if (user == null) {
    return res.status(400).send('Cannot find user');
  }
  try {
    const checkPassword = await bcrypt.compare(req.body.password, user.password);

    if (checkPassword) {
      jwt.sign(user, secret, { expiresIn: "1h" }, function (err, token) {
        res.json({ token });
      });

    } else {
      res.status(403).send('Incorrect password')
    }

  } catch (error) {
    res.status(500).send();
  }
});

routes.post('/signUp', async function (req, res) {

  const username = req.body.username;
  const password = await bcrypt.hash(req.body.password, 10);

  const newUser = {
    username,
    password
  }

  users.push(newUser);
  res.status(201).send();
});

export default routes;