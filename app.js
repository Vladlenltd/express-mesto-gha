const express = require("express");
const mongoose = require("mongoose");
// const usersRouter = require("./routes/users");
// const cardsRouter = require("./routes/cards");

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect("mongodb://localhost:27017/mestodb", {
  useNewUrlParser: true,
  // useCreateIndex: true,
  // useFindAndModify: false,
});

app.listen(PORT, () => {
  console.log(`App works at port ${PORT}`);
});

app.use(express.json());
app.use("/users", require("./routes/users"));
app.use("/cards", require("./routes/cards"));

app.use((req, res, next) => {
  req.user = {
    _id: "62ea405344c8069c77d5e06e",
  };
  next();
});
