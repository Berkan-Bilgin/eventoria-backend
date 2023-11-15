import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import { connectDatabase } from "./database";
import Event from "./models/eventModel";
import slugify from "slugify";

async function updateSlugs() {
  try {
    await connectDatabase();
    console.log("MongoDB bağlantısı başarılı.");

    const events = await Event.find(); // Tüm event'leri al

    for (const event of events) {
      if (event.place) {
        const placeSlug = slugify(event.place, { lower: true, strict: true });
        await Event.updateOne({ _id: event._id }, { $set: { placeSlug } });
      }
    }

    console.log("Sluglar başarıyla güncellendi.");
  } catch (error) {
    console.error("Slug güncelleme sırasında hata oluştu:", error);
  } finally {
    mongoose.disconnect();
  }
}

updateSlugs();
