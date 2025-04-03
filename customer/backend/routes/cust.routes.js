import express from 'express';
import { searchServices,bookService,viewBookings,leaveReview } from '../controllers/custController.js';
import protectRoute from '../middleware/protectRoute.js';

const router=express.Router()
router.get("/search",protectRoute,searchServices);
router.get("/viewBookings",protectRoute,viewBookings);
router.post("/book",protectRoute,bookService);
router.post("/review",protectRoute,leaveReview);


export default router;