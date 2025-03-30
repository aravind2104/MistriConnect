import express from 'express';
import { registerWorker, logoutWorker, loginWorker } from '../controllers/authController.js';
import protectRoute from '../middlewares/protectRoute.js';

const router = express.Router();

router.post('/register', registerWorker);
router.post('/login', loginWorker);
router.post('/logout', logoutWorker);
router.get('/profile', protectRoute, (req, res) => {
    res.json(req.worker);
});

export default router;
