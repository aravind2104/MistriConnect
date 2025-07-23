import express from 'express';
import { searchServices,bookService,viewBookings,leaveReview, viewCustomer, deleteBooking } from '../controllers/custController.js';
import protectRoute from '../middleware/protectRoute.js';

const router=express.Router()
router.get("/search",protectRoute,searchServices);
router.get("/viewBookings",protectRoute,viewBookings);
router.post("/book",protectRoute,bookService);
router.post("/review",protectRoute,leaveReview);
router.get("/profile",protectRoute,viewCustomer);
router.put("/deleteBooking/:id",deleteBooking);

export default router;