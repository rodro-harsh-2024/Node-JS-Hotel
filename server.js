const express = require('express')
const app = express()
const db = require('./db')
require('dotenv').config();

 const bodyParser = require('body-parser')
app.use(bodyParser.json());
// const PORT = process.env.PORT || 3000

const personRoutes = require('./routes/personRoutes');
app.use('/person',personRoutes); 

const menuItemRoutes = require('./routes/menuItemRoutes');
app.use('/menuItem',menuItemRoutes); 



app.listen(3000,()=>{
    console.log('Server is runnign on port 3000');
    
})