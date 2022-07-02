const app = require('./app')
const port = 3131;

app.listen(port, () => console.log(`Server running at http:/localhost:${port}`));