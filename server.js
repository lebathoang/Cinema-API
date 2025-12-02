const express = require("express");
const cors = require("cors");
const app = express();

const usersRoutes = require("./src/routes/users");

app.use(
  cors({
    origin: "http://localhost:3001",
  })
);
app.use(express.json());

app.use("/users", usersRoutes);

app.listen(3000, () => {
  console.log("Server chay tai http://localhost:3000");
});
