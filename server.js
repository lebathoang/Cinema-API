const express = require("express");
const cors = require("cors");
const app = express();

const authRoutes = require("./src/routes/AuthRouter");
const userRoutes = require("./src/routes/UserRouter");

app.use(
  cors({
    origin: "http://localhost:3001",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.get("/", (req, res) => res.send("Auth API is running"));

app.listen(3000, () => {
  console.log("Server chay tai http://localhost:3000");
});
