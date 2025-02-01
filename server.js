require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/auth");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ Conectado a MongoDB - LinkUp"))
  .catch(err => console.error(err));

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => res.send("🌍 Bienvenido a LinkUp API"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 LinkUp API corriendo en http://localhost:${PORT}`));
