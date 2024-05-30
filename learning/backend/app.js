import express from "express";
import { getProduct, getProductById } from "./api/product.js";
import Redis from "ioredis";
import { getCatchedData } from "./middleware/redis.js";
import dotenv from "dotenv";
dotenv.config();


const app = express();

export const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: 13336,
  password: process.env.REDIS_PASSWORD,
});

redis.on("connect", () => {
  console.log("redis Connected SuccessFully");
});

app.get("/", (req, res, next) => {
  res.json({ Success: "true" });
});

app.get("/products", getCatchedData("products"), async (req, res) => {

  const products = await getProduct();
  await redis.setex("products",20, JSON.stringify(products.products));
  res.json({
    products,
  });
});
app.get("/products/:id", async (req, res) => {
  const id = req.params.id;
  const key = `product/${id}`;
  try {
    // Try to get the product from Redis
    let product = await redis.get(key);
    
    if (!product) {
      // If not found in Redis, fetch from database
      product = await getProductById(id);
      // Store the fetched product in Redis
      await redis.set(key, JSON.stringify(product));
    }

    res.json({
      product,
    });
  } catch (error) {
    // Handle any errors that occur
    console.error('Error fetching product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.get("/order/:id", async (req, res) => {
  const productId = req.params.id;
  const key = `product/${productId}`;

await redis.del(key)

    res.json({
   message:"Order Placed"
    });
 
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
