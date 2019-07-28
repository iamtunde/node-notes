const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const database = require('./config/database')

const app = express();
const port = process.env.APP_PORT || 3030;

app.use(bodyParser.urlencoded({ extended: true }))

MongoClient.connect(database.url, { useNewUrlParser: true }, (err, client) => {
    if(err) {
        console.log('Unable to establish database connection: ' + err)
    } else {
        const db = client.db('LearnMongoDB')

        require('./app/routes/')(app, db);
        app.listen(port, () => {
            console.log('Database connection established')
            console.log('We are live on port: ' + port)
        })
    }
})