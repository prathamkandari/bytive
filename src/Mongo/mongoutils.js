const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const app = express();
app.use(express.json());

MongoClient.connect('mongodb+srv://prathamkandari123:gA0kxfbbtH8XNjzf@cluster0.g6au8si.mongodb.net/', { useNewUrlParser: true }, (error, result) => {
    if (error) throw error;
    
    const database = result.db('ByTive');
    console.log('Connection successful!');

    // Define routes after the connection is established
    app.get('/', (req, resp) => {
        resp.send('Welcome to mongodb Api');
    });

    app.get('/api/bytive', (req, resp) => {
        database.collection('DatabaseBackend').find({}).toArray((err, result) => {
            if (err) throw err;
            resp.send(result);
        });
    });

    // Start the Express server
    app.listen(8080, () => {
        console.log('Server is running on port 8080');
    });
});
