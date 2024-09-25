import express from "express";
import helmet from "helmet";
import dotenv from "dotenv";
// Routes
import loginRouter from "./src/routes/loginRouter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5500;

app.use(helmet());

app.get("/login", loginRouter);

app.listen(PORT, () => {
    console.log(`It's running at http://localhost:${PORT}/`);
}).on('error', (err) => {
    console.error('Error starting the server:', err);
});
