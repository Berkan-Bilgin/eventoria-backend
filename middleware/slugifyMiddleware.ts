import slugify from "slugify";
import { Schema } from "mongoose";

export const slugifyMiddleware = (schema: Schema) => {
  schema.pre("save", function (next) {
    if (this.place && this.isModified("place")) {
      this.placeSlug = slugify(this.place, {
        lower: true,
        remove: /[*+~.()'"!:@]/g,
      });
    }
    next();
  });
};
