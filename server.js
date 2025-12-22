const express = require("express");
const cors = require("cors");
const app = express();

const authRoutes = require("./src/routes/AuthRouter");

app.use(
  cors({
    origin: "http://localhost:3001",
  })
);
app.use(express.json());

app.use("/api/auth", authRoutes);
app.get("/", (req, res) => res.send("Auth API is running"));

app.listen(3000, () => {
  console.log("Server chay tai http://localhost:3000");
});
