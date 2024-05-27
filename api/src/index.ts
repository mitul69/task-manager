// src/index.ts
import express from 'express';
import bodyParser from 'body-parser';
import sequelize from './config/database';
import taskRoutes from './routes/taskRoutes';


const app = express();
const port = process.env.PORT || 5001;

app.use(bodyParser.json());

// Connect to the database
sequelize.sync({ force: false }).then(() => {
    console.log('Database connected');
});

// API endpoints
app.use('/api', taskRoutes);

// Add more API endpoints for update and delete
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
