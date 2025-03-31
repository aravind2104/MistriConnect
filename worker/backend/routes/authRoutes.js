import express from 'express';
import { registerWorker, logoutWorker, loginWorker, updateWorkerProfile } from '../controllers/authController.js';
import protectRoute from '../middlewares/protectRoute.js';

const router = express.Router();

router.post('/register', registerWorker);
router.post('/login', loginWorker);
router.post('/logout', logoutWorker);
router.get('/profile', protectRoute, (req, res) => {
    res.json(req.worker);
});
router.put('/profile', protectRoute, updateWorkerProfile);


export default router;
