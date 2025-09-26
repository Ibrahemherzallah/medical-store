import express from "express";
import dotenv from "dotenv";
import path from "path";
import connectMongoDB from "./db/connectDB.js";
import cors from 'cors'
import {fileURLToPath} from "url";
import authRoutes from "./routes/user.routes.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express()
const PORT = process.env.PORT || 3031;
const staticPath = path.join(__dirname, 'static');

app.use(cors({
    origin: ['http://localhost:8080','https://ignite24.top'],
    credentials: true
}));
dotenv.config();


app.use(express.json())
app.use(express.static(staticPath));
app.use('/api/auth',authRoutes)

app.get(/^\/(?!api).*/, (req, res) => {
    res.sendFile(path.join(staticPath, 'index.html'));
});

try {
    app.listen(PORT, () => {
        connectMongoDB();
        console.log(`Server is running on http://localhost:${PORT}`);
    });
} catch (err) {
    console.error('Error starting server:', err);
}