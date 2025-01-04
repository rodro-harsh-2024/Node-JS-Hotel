const mongoose = require('mongoose')
require('dotenv').config();
//Define the MongoDB connection url

// const mongoURL = process.env.MONGO_DB_URL_LOCAL;
const mongoURL = process.env.DB_URL;

mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    ssl: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

const db = mongoose.connection;

db.on('connected',()=>{
    console.log('Connected to MongoDB Server');
    
});

db.on('disconnected',()=>{
    console.log('MongoDB connection disconnected!!!');
    
});

db.on('error',()=>{
    console.log('MongoDB connection error!!!');
    
});

module.exports = db;