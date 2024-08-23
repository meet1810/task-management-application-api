require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
var cors = require('cors')
const swaggerDocument = require('./src/api-doc/swagger.json');
const userRoutes = require('./src/routes/user');
const path = require('path');

const projectRoutes = require('./src/routes/project');
const taskRoutes = require('./src/routes/task');

const app = express();
app.use(cors())
app.use(bodyParser.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(userRoutes);
app.use(projectRoutes);
app.use(taskRoutes);


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'src/views', 'home.html'));
});

app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'src/views', 'error.html'));
});



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} , http://localhost:${PORT}`);
});
