import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { Product } from "./models/Product.js"; // adapte le chemin si besoin

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Connexion MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connecté"))
  .catch((err) => console.error("❌ Erreur MongoDB :", err));

// Route test
app.get("/", (req, res) => {
  res.send("API AfricanStyle TN OK");
});

// ✅ GET tous les produits
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    console.error("Erreur GET /api/products :", err);
    res.status(500).json({ error: "Error fetching products" });
  }
});

// ✅ POST créer un produit (avec image + images)
app.post("/api/products", async (req, res) => {
  try {
    const {
      name,
      price,
      category,
      description,
      sizes,
      image,
      images,
      isNew,
      isBestSeller,
      fabric,
      origin,
      culturalInspiration,
    } = req.body;

    const product = new Product({
      name,
      price,
      category,
      description,
      sizes,
      // 🔹 on accepte les deux formats envoyés depuis Postman :
      image: image || undefined,
      images: images && images.length ? images : [],
      isNew: !!isNew,
      isBestSeller: !!isBestSeller,
      fabric,
      origin,
      culturalInspiration,
    });

    await product.save();
    console.log("✅ Produit créé :", product);
    res.status(201).json(product);
  } catch (err) {
    console.error("Erreur POST /api/products :", err);
    res.status(500).json({ error: "Error creating product" });
  }
});

// Lancement serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 API running on port ${PORT}`);
});
