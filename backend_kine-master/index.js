const express = require("express");
const app = express();

const mongoose = require("mongoose");
// added by salim
const cors = require('cors');
const PlayerRoute = require("./routes/player.routes");
const QuizRoute = require("./routes/quiz.routes");
const AdminRoute = require("./routes/admin.routes");
const injuriesRoute = require("./routes/injuries.routes");
const AuthRoute = require("./routes/auth.routes");
const PdfRoute=require("./routes/pdf.routes")
const CategroyRoute=require("./routes/category.routes");
const { config } = require("./config/config");
const { signIn } = require('./controllers/auth.controller'); 

const bodyParser = require("body-parser");
const morgan = require("morgan");

const errorHandlers = require("./middleware/errorHandlers");

// Middleware pour permettre les requêtes depuis n'importe quelle origine (CORS)
app.use(cors());

// added by salim
app.use(bodyParser.json());


// added by salim
app.post('/api/auth/signin', signIn);

// set up the view engine to be ejs
app.set("view engine", "ejs");

// DataBase connection
mongoose.set("strictQuery", false);
const url = config.MONGO_URI;
mongoose
  .connect(url)
  .then(() => {
    console.log("DB Connection Successfull!");
  })
  .catch((err) => {
    console.log("DB Connection failed: " + err);
  });

// setup port
const PORT = config.PORT || 5000;

// setup logger
app.use(morgan("dev"));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());

app.use("/admin", AdminRoute);
app.use("/api/player", PlayerRoute);
app.use("/api/quiz", QuizRoute);
app.use("/api/injury", injuriesRoute);
app.use("/api/auth", AuthRoute);
app.use("/api/pdf",PdfRoute);
app.use("/api/category",CategroyRoute);


app.use(errorHandlers);

app.listen(PORT, () => {
  console.log(`Backend server is running at port ${PORT}`);
});
