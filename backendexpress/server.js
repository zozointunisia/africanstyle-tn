import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

// -------------------------------
//  Connexion MongoDB
// -------------------------------
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connecté"))
  .catch(err => console.error(err));

// -------------------------------
//  Modèles MongoDB
// -------------------------------

// Exemple : modèle utilisateur
const User = mongoose.model("User", new mongoose.Schema({
  name: String,
  email: String
}));

// Modèle produit
const Product = mongoose.model("Product", new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  category: String,
  images: [String],
  sizes: [String],
  fabric: String,
  origin: String,
  isNew: Boolean,
  isBestSeller: Boolean,
  culturalInspiration: String
}));

// -------------------------------
//  Routes API
// -------------------------------

// Test route
app.get("/", (req, res) => {
  res.send("API Render en ligne");
});

// Ajouter un utilisateur
app.post("/add-user", async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.json(newUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET : récupérer tous les produits
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST : ajouter un produit
app.post("/api/products", async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// -------------------------------
//  Lancement du serveur
// -------------------------------
app.listen(process.env.PORT || 3000, () => {
  console.log("API running");
});
