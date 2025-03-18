const express = require('express');
const app = express();
const dotenv = require('dotenv');
const bodyparser = require('body-parser');

dotenv.config()
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}))
const connectDB = require('./models/db');
connectDB()
const routes = require('./routes/index')

const port = process.env.PORT || 3002
app.use('/api',routes)
app.get('/',(req,res,next)=>{
    res.send("project is running");
})
app.listen(port,()=>{
    console.log(`your server is running on port ${port}`)
})