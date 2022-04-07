import fetch from "node-fetch";
import Countries from "../models/countries.js";
import CountryData from "../models/countryData.js";
import Summary from "../models/summary.js";

const url = "https://covid19.mathdro.id/api";

export const fetchData = async (req, res) => {
  try {
    let data = await CountryData.findOne({ country: req.query.country });

    if (!data) {
      const response = await fetch(`${url}/countries/${req.query.country}`);
      const json = await response.json();

      await CountryData.create({
        country: req.query.country,
        confirmed: json.confirmed,
        recovered: json.recovered,
        deaths: json.deaths,
        lastUpdate: json.lastUpdate,
      });
    }

    data = await CountryData.findOne({ country: req.query.country });

    res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};

export const fetchDailyData = async (req, res) => {
  try {
    const response = await fetch(
      "https://api.covidtracking.com/v1/us/daily.json"
    );
    const data = await response.json();

    res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};

export const fetchCountries = async (req, res) => {
  try {
    let data = await Countries.find();

    if (data.length === 0) {
      const response = await fetch(`${url}/countries`);
      const { countries } = await response.json();
      countries.map(async (country) => {
        await Countries.create({
          name: country.name,
          iso2: country.iso2,
          iso3: country.iso3,
        });
      });
    }

    data = await Countries.find().sort({ name: 1 });

    res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};
