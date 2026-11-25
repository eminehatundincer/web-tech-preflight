import { Router } from "express";
import { createEvent, deleteEvent, getEventById, getEvents,
  updateEvent,
} from "../controllers/event-controller.js";

// app.js'te "/events" önek verildi; buradaki yollar onun devamı
const router = Router();
router.get("/", getEvents);
router.get("/:id", getEventById);
router.post("/", createEvent);
router.patch("/:id", updateEvent);
router.delete("/:id", deleteEvent);

export default router;
