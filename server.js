const app = require('./app');
const port = 3800;

app.listen(port, () => {
    console.log(`Server has been started at port ${port}`);
})
