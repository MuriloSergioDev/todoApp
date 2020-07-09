require('dotenv').config();
import express from 'express';
import cors from 'cors';
import taskRoute from './routes/task';
import userRoute from './routes/user';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/user', userRoute);
app.use('/task', taskRoute);

export default app;
        

    