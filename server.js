const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const apiRoutes = require("./app/routes/routes");
const app = express();

var corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
db.sequelize
  .sync()
  .then(() => {
    console.log("DB conectada");
  })
  .catch((err) => {
    console.log("Falló la conexión a la db: " + err.message);
  });

app.get("/", (req, res) => {
  res.json({ message: "new request" });
});

app.use("/api/libros", apiRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(500).json({
    error: "Internal Server Error",
    message: "Something went wrong. Please try again later.",
  });
});

const port = process.env.port || 3000;
app.listen(port, () => {
  console.log(`App corriendo en port ${port}`);
});
