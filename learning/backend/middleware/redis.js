import { redis } from "../app.js";

export const getCatchedData = (key) => async (req, res, next) => {
  try {
    let data = await redis.get(key);

    if (data) {
      return res.json(JSON.parse(data));
    }
    next();
  } catch (error) {
    console.error(`Error fetching cached data for key ${key}:`, error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
