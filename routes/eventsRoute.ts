import express, { Request, Response } from "express";
import Event from "../models/eventModel"; // Event modelinizi nerede tanımladıysanız, uygun yolu sağlayın.

import requireAuth from "../middleware/requireAuth";

const protectEventRouter = express.Router();

const eventRouter = express.Router();

//require auth for all workout routes
protectEventRouter.use(requireAuth);

// Event listesi alma route'u
protectEventRouter.get("/", async (req: Request, res: Response) => {
  try {
    const user_id = req.user._id;

    const events = await Event.find({ user_id }).sort({ createdAt: -1 });
    res.json(events);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

eventRouter.get("/summary", async (req: Request, res: Response) => {
  try {
    const events = await Event.find(
      {},
      "id title location category images description startDate endDate ticketPrice"
    ).sort({ createdAt: -1 });
    res.json(events);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

eventRouter.get("/category/:category", async (req: Request, res: Response) => {
  const { category } = req.params;
  try {
    const events = await Event.find(
      { category: category },
      "id title location category images description startDate endDate ticketPrice"
    ).sort({ createdAt: -1 });
    res.json(events);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

eventRouter.get("/all", async (req: Request, res: Response) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });
    res.json(events);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

eventRouter.get("/events/:id", async (req: Request, res: Response) => {
  const eventId = req.params.id;
  try {
    const event = await Event.findById(eventId);
    if (event) {
      res.json(event);
    } else {
      res.status(404).send("Event not found");
    }
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

// Yeni bir event oluşturma route'u
protectEventRouter.post("/", async (req: Request, res: Response) => {
  try {
    const user_id = req.user._id;
    const newEvent = new Event({ ...req.body, user_id }); // req.body'den gelen verileri kullanarak yeni bir Event oluşturuluyor.
    await newEvent.save(); // Event veritabanına kaydediliyor.
    res.status(201).json(newEvent);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

// Geçmiş Etkinlikleri Alma
eventRouter.get("/previous-events", async (req: Request, res: Response) => {
  try {
    const currentDate = new Date();
    const events = await Event.find(
      {
        startDate: { $lt: currentDate }, // $lt (less than) operatörü, şu anki tarihten önce olan startDate'leri bulur
      },
      "id title location category images description startDate endDate ticketPrice"
    ).sort({ startDate: -1 }); // Geçmiş etkinlikleri startDate'e göre tersten sıralar
    res.json(events);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

// Belirli bir event'i alma route'u
protectEventRouter.get("/:id", async (req: Request, res: Response) => {
  const eventId = req.params.id;
  try {
    const event = await Event.findById(eventId);
    if (event) {
      res.json(event);
    } else {
      res.status(404).send("Event not found");
    }
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

// Belirli bir event'i güncelleme route'u
protectEventRouter.put("/:id", async (req: Request, res: Response) => {
  const eventId = req.params.id;
  try {
    const updatedEvent = await Event.findByIdAndUpdate(eventId, req.body, {
      new: true,
    });
    if (updatedEvent) {
      res.json(updatedEvent);
    } else {
      res.status(404).send("Event not found");
    }
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

// Belirli bir event'i silme route'u
protectEventRouter.delete("/:id", async (req: Request, res: Response) => {
  const eventId = req.params.id;
  try {
    const deletedEvent = await Event.findByIdAndDelete(eventId);
    if (deletedEvent) {
      res.json(deletedEvent);
    } else {
      res.status(404).send("Event not found");
    }
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

export { eventRouter, protectEventRouter };
