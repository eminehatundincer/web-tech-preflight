import { Router } from "express";
import { getEvents, getEventById } from "../controllers/event-controller.js";

// app.js'te "/events" önek verildi; buradaki yollar onun devamı
const router = Router();
router.get("/", getEvents);
router.get("/:id", getEventById);
export default router;
