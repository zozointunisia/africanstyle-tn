import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  sizes: [{ type: String, required: true }],

  // 🔹 Champs pour les images :
  image: { type: String },        // image principale
  images: [{ type: String }],     // galerie d’images optionnelle

  isNew: { type: Boolean, default: false },
  isBestSeller: { type: Boolean, default: false },
  fabric: { type: String },
  origin: { type: String },
  culturalInspiration: { type: String },
}, { timestamps: true });

export const Product = mongoose.model("Product", productSchema);
