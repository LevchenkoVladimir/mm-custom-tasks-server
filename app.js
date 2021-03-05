const express = require('express');
const app = express();
const pdf = require('html-pdf');
const fs = require('fs');
const cors = require('cors');

app.use(express.json());

app.use(cors({
    origin: true,
    credentials: true
}));


// app.use(function (req, res, next) {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Credentials', 'true');
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
//     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//
//     if (req.method === 'OPTIONS') {
//         return res.status(200).json({});
//     }
//
//     next();
// });

app.post('/event', (req, res) => {
    console.log(req.body);
    res.status(201).end();
});

app.post('/generatePDF', (req, res) => {
    const fileName = `print${Number(new Date())}.pdf`;
    console.log('create pdf');
    pdf.create(req.body.html, {
        border: '10mm'
    }).toFile(`./files/${fileName}`, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            res.status(200).json({
                file: fileName
            });
            const to = setTimeout(() => {
                fs.unlinkSync(result.filename);
                clearTimeout(to);
            }, 5000)
        }
    });
});

app.use('/files', express.static('./files'));


module.exports = app;
