import express from "express";
import mongoose from "mongoose";

const app = express();
app.use(express.json());

// Connexion à MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connecté"))
  .catch(err => console.error(err));

// Exemple Model
const User = mongoose.model("User", new mongoose.Schema({
  name: String,
  email: String
}));

// Route test
app.get("/", (req, res) => {
  res.send("API Render en ligne");
});

// Route POST
app.post("/add-user", async (req, res) => {
  const newUser = new User(req.body);
  await newUser.save();
  res.json(newUser);
});

// Render port
app.listen(process.env.PORT || 3000, () => console.log("API running"));
