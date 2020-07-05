require('dotenv').config();
import express from 'express';
import taskRoute from './routes/task';
import userRoute from './routes/user';

const app = express();

app.use(express.json());
app.use('/user', userRoute);
app.use('/task', taskRoute);

export default app;
        

    