const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
// app.use(cors())
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:8090');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Credentials', 'true');

    if (req.method === 'OPTIONS') {
        return res.status(200).json({});
    }

    next();
});

app.post('/event', (req, res) => {
    console.log(req.body);
    res.status(201).end();
});

module.exports = app;
