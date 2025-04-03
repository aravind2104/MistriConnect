import express from 'express';
import { registerWorker, logoutWorker, loginWorker, updateWorkerProfile, forgotPassword, resetPassword } from '../controllers/authController.js';
import protectRoute from '../middlewares/protectRoute.js';

const router = express.Router();

router.post('/login', loginWorker);
router.post('/logout', logoutWorker);
router.post('/forgot-password',forgotPassword)
router.post('/reset-password',resetPassword)
router.get('/profile', protectRoute, (req, res) => {
    res.json(req.worker);
});
router.put('/profile', protectRoute, updateWorkerProfile);


export default router;
