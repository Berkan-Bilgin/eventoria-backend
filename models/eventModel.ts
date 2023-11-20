import mongoose from "mongoose";
import { slugifyMiddleware } from "../middleware/slugifyMiddleware";

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    titleSlug: {
      type: String,
    },
    category: {
      type: String,
    },
    coords: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
    },
    description: {
      type: String,
    },
    location: {
      type: String,
    },
    place: {
      type: String,
    },
    placeSlug: {
      type: String,
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    images: [
      {
        type: String,
      },
    ],
    ticketPrice: {
      type: String,
    },
    user_id: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

slugifyMiddleware(eventSchema);

const Event = mongoose.model("Event", eventSchema);

export default Event;
