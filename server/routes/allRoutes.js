import express from "express";
import {
  fetchData,
  fetchDailyData,
  fetchCountries,
} from "../controllers/allController.js";

const router = express.Router();

router.get("/data", fetchData);
router.get("/dailydata", fetchDailyData);
router.get("/countries", fetchCountries);

export default router;
