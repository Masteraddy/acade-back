const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 3030;

// import the api routes
const roleRoutes = require("./routes/role.routes");
const firstRoutes = require("./routes/first.routes");
const staffRoutes = require("./routes/user/staff.routes");

//MongoDB Options
const db = require("./configs/keys").MONGO_URI;
const option = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};

//Middle Wares
/** For Cross Origin Resource Sharing (CORS)*/
app.use(cors());

app.use(bodyParser.json());

//Connect to Database
mongoose
  .connect(db, option)
  .then(() => console.log("MongoDb Connected..."))
  .catch((err) => console.log(err));

//Connect to routes
app.use("/api/role", roleRoutes);
app.use("/api/first", firstRoutes);
app.use("/api/staff", staffRoutes);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.use("*", (req, res) => {
  res
    .status(404)
    .json({ status: false, message: "Sorry, Api Does Not Exist!!!" });
});

app.listen(PORT, () =>
  console.log(`The server is running at http://localhost:${PORT}`)
);
