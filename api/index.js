const express = require('express')
const dotenv = require('dotenv')
const bodyparser = require('body-parser')
const cors = require('cors')
const { MongoClient } = require('mongodb');
const app = express()


dotenv.config()
app.use(bodyparser.json())
app.use(cors())
const port =  3000
// Connection URL
const url = process.env.MONGO_URI;
const client = new MongoClient(url);

// Database Name
const dbName = 'PasswordManager';
client.connect();
const db = client.db(dbName);
const collection = db.collection('Passwords');

//get all the passwords
app.get('/', async (req, res) => {
    const findResult = await collection.find({}).toArray();
    res.send(findResult)
})

//add a new password
app.post('/', async (req, res) => {
    const password = req.body;
    const findResult = await collection.insertOne(password);
    res.send(findResult)
})

//delete a password
app.delete('/', async (req, res) => {
    let password = req.body
    delete password._id
    const findResult = await collection.deleteOne(password);
    res.send(findResult)
})

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})

module.exports = app