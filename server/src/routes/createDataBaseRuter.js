import express from 'express';
import { createDb } from '../controllers/createDbController.js';

const router = express.Router();

router.post('/', createDb);

export default router;
