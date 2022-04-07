import mongoose from "mongoose";

const countriesSchema = mongoose.Schema({
  name: String,
  iso2: String,
  iso3: String,
});

export default mongoose.model("Countries", countriesSchema);
