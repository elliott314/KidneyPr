const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');
const patientRoutes = require('./routes/patient.router');
const userRouter = require('./routes/userRouter');
const verifyUser = require('./routes/auth');
const { verify } = require('jsonwebtoken');
const app = express();
mongoose.connect(process.env.DbURI,{
    useNewUrlParser: true ,
    useUnifiedTopology: true,
    useFindAndModify:true,
    useCreateIndex:true
}).then(()=>{
    console.log('Connected to Database Server');
});
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.get('/',(req, res)=>{
    res.send('Welcome to my New App');
});

app.use('/api/users', userRouter);
app.use('/api/patient', patientRoutes);


app.listen(process.env.Port, ()=>{
    console.log(`Server is running in localhost:${process.env.Port}`);
});