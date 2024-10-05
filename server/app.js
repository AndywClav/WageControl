import express from "express";
import helmet from "helmet";
import dotenv from "dotenv";
import bodyParser from 'body-parser';
// Routes
import createDataBase from "./src/routes/createDataBaseRuter.js";
import loginRouter from "./src/routes/loginRouter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5500;

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/", createDataBase);
app.post("/login", loginRouter);

app.listen(PORT, () => {
    console.log(`It's running at http://localhost:${PORT}/`);
}).on('error', (err) => {
    console.error(`Error starting the server on port ${PORT}:`, err.message);
});
