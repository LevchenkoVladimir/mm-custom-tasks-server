const app = require('./app');
const port = process.env.PORT || 3800;

app.listen(port, () => {
    console.log(`Server has been started at port ${port}`);
})
