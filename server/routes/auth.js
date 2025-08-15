import express from 'express';
import { login } from '../controllers/authController.js'

const router = express.Router();


router.post('/login', login);
// router.get('/me', protectAdmin, (req, res) => res.json(req.admin));

export default router;
