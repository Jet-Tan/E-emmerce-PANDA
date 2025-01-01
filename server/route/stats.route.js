import { Router } from "express";
import {
  getStarsChart,
  getStarsTotal,
} from "../controllers/stars.controller.js";
import { admin } from "../middleware/Admin.js";
import auth from "../middleware/auth.js";

const starsRouter = Router();

starsRouter.get("/stars-total", auth, admin, getStarsTotal);
starsRouter.get("/stars-chart", auth, admin, getStarsChart);
export default starsRouter;
