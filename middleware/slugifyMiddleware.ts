import slugify from "slugify";
import { Schema } from "mongoose";

export const slugifyMiddleware = (schema: Schema) => {
  schema.pre("save", function (next) {
    // place alanı için slug oluşturma
    if (this.place && this.isModified("place")) {
      this.placeSlug = slugify(this.place, {
        lower: true,
        strict: true,
      });
    }

    // title alanı için slug oluşturma
    if (this.title && this.isModified("title")) {
      this.titleSlug = slugify(this.title, {
        lower: true,
        strict: true,
      });
    }

    next();
  });
};
