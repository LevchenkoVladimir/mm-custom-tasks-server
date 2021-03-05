const express = require('express');
const app = express();
const pdf = require('html-pdf');
const fs = require('fs');

app.use(express.json());
app.use(require('cors')({
    origin: ['http://192.168.1.179:8090']
}));

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
