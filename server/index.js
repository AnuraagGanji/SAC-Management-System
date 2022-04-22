const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

const PORT = 2000;

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "password",
  database: "sacdb",
});

// Routers
app.use("/api", require("./routes/Routes"));

// app.get("/", (req, res) => {});

// app.post("/checkin", (req, res) => {
//   // CHECKIN INTO ROOM
//   const { bitsID, room } = req.body;
//   console.log(`${bitsID} checked into ${room}`);
// });

// app.post("/login", (req, res) => {
//   // Login
//   const { bitsID, password, room } = req.body;
//   console.log(`${bitsID}  ${password}  ${room}`);
// });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
