import express from "express";
import helmet from "helmet";
import dotenv from "dotenv";

const app = express();
const PORT = process.env.PORT || 5500;

app.use(helmet());
dotenv.config();

app.get("/", (req, res) => {
    try {
        res.status(200).send("Hello server")
    } catch (error) {
        if (error.status >= 400 && error.status < 500) {
            res.status(error.status).send("Client Error - Not Found");
        } else if (error.status >= 500 && error.status < 600) {
            res.status(error.status).send("Server Error");
        } else {
            res.status(500).send("An unknown server error occurred");
        }
    }
});

app.listen(PORT, () => {
    console.log(`It's running at http://localhost:${PORT}/`);
}).on('error', (err) => {
    console.error('Error starting the server:', err);
});
