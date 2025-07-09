import { Router } from "express";
import {signup} from "../controller/signup.controller.js";
import Verify from "../controller/verify.controller.js";
import login from "../controller/login.controller.js";
import logout from "../controller/logout.controller.js";
import authMiddleware from "../middleware/islogin.middleware.js";
import Workout_deatils from "../controller/Workout_details.controller.js";
import userage from "../controller/userage.controller.js";
import AdminSignup from "../controller/admin.controller.js";
import Adminlogin from "../controller/adminlogin.controller.js";

const router = Router();

router.post('/signup', signup)
router.post('/verify', Verify)
router.post('/login', login)
router.post('/logout', authMiddleware , logout)
router.post('/admin', AdminSignup)
router.post('/workout',  Workout_deatils)
router.post('/userage',authMiddleware , userage )
router.post('/adminlogin', Adminlogin)
router.post('/Workout_details', Workout_deatils)

export default router