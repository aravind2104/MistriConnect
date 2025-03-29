import express from 'express';
import { searchServices,bookService,viewBookings,leaveReview } from '../controllers/custController';

const router=express.Router()
router.post("/search",searchServices);
router.post("/viewBookings",viewBookings);
router.post("/book",bookService);
router.post("/review",leaveReview);


export default router;