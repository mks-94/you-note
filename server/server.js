const express = require("express");
const mongoose = require("mongoose");
const note = require("./models/note");
const auth = require("./middleware/auth");
const app = express();

const API_PORT = process.env.API_PORT || 8080;

app.use(express.json());

//Connect mongoose with local mongodb
mongoose
  .connect("mongodb://127.0.0.1:27017/you_note", {
    dbName: "you_note",
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("DB connected successfully.");
  })
  .catch((err) => {
    console.log("Error connecting to the database!");
  });

app.all("api/*", auth);

app.use("/api/notes", require("./routes/notes"));
app.use("/api/auth", require("./routes/auth"));

app.listen(API_PORT, () => console.log(`Listening on port:${API_PORT}`));
