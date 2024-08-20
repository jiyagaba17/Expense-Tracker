const express = require('express')
const cors = require('cors');
const { db } = require('./db/db');
const {readdirSync}= require('fs') //routes require (fs- file system)

//create app
const app = express()

require('dotenv').config()

//create port variable
const PORT = process.env.PORT


//middlewares

app.use(express.json())
app.use(cors())


//routes
 
// - require read directory synchronously line by line

readdirSync('./routes').map((route)=> app.use('/api/v1' , require('./routes/' + route))) //base api




//testing API

app.get('/', (req,res) => {
    res.send('Hello world')
})

//creating basic server

const server =() => {

    //connecting database

    db()
    // console.log('You are listening to port:', PORT);
    app.listen(PORT, () => {
        console.log('listening to port:', PORT)
    })
}
//run this func

server()