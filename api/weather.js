// api/weather.js

import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();

export default async function handler(req, res) {
  const { city } = req.query;
  const APIkey = process.env.WEATHER_API_KEY;

  if (!city) {
    return res.status(400).json({ error: "City is required" });
  }

  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${APIkey}&q=${city}&aqi=no`
    );
    const data = await response.json();

    if (!response.ok) {
      return res.status(404).json({ error: "City not found" });
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}
