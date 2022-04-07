import express from "express";
import mongoose from "mongoose";
import dataRoutes from "./routes/allRoutes.js";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/", dataRoutes);

const PORT = process.env.PORT || 5000;
const CONNECTION_URL =
  "mongodb+srv://covidtracker:covidtracker@cluster0.sjrbj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
