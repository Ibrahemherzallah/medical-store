import express from "express";
import dotenv from "dotenv";

dotenv.config();
const app = express()
const PORT = process.env.PORT || 3031;

app.use(express.json())

app.get('/', (req, res) => {
    res.send("HELLO world")
})

app.listen(PORT => {
    console.log(`Listening on ${PORT}`);
})