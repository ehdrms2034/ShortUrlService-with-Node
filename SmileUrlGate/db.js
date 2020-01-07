let mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/shortURL', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

const db = mongoose.connection;

const handleOpen = () => console.log("mongodb is connected succesfully!");
const handleError = (err) => console.log(`Error on DB Connection : ${err}`);

db.once("open", handleOpen);
db.on("error", handleError);

module.exports = db;