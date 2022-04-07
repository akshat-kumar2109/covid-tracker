import mongoose from "mongoose";

const countryDataSchema = mongoose.Schema({
  country: String,
  confirmed: {
    value: String,
  },
  recovered: {
    value: String,
  },
  deaths: {
    value: String,
  },
  lastUpdate: Date,
});

export default mongoose.model("CountryData", countryDataSchema);
