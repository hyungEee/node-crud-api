const express=require('express');
const app=express();
const tasksRouter=require('./routes/tasks');
require('dotenv').config();
const port=process.env.port || 3000;
const morgan=require('morgan');
app.use(morgan('dev'));

app.use(express.json());
app.use('/tasks',tasksRouter);

app.listen(port,()=>{
    console.log(`Server running at http://localhost:${port}`);
});