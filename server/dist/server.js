const forceDatabaseRefresh = false;
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors'; // Import the CORS middleware
import routes from './routes/index.js';
import { sequelize } from './models/index.js';
const app = express();
const PORT = process.env.PORT || 3001;
// Enable CORS
app.use(cors({
    origin: 'http://localhost:3000', // Allow requests from the client
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    credentials: true, // Allow cookies and credentials
}));
// Serves static files in the entire client's dist folder
app.use(express.static('../client/dist'));
app.use(express.json());
app.use(routes);
sequelize.sync({ force: forceDatabaseRefresh }).then(() => {
    app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
    });
});
