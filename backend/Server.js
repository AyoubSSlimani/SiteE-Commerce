const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config({ path: "./config/.env" });
require("./config/db");
const { checkUser, requireAuth } = require("./middleware/auth.middleware.js");
const { shop } = require("./controllers/shop.controller.js");
const userRoutes = require("./routes/user.routes.js");
const bodyParser = require("body-parser");

const server = express();
const port = process.env.SERVER_PORT;

const corsOptions = {
  origin: [process.env.CLIENT_URL],
  credentials: true,
  allowedHeaders: ["sessionId", "Content-Type"],
  exposedHeaders: ["sessionId"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
};

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(cookieParser());
server.use(cors(corsOptions));
server.use("/images", express.static("./utils/images"));

server.get("*", checkUser);
server.get("/jwtid", requireAuth, (req, res) => {
  res.status(200).send(res.locals.user._id);
});
server.post("/create-checkout-session", shop);

server.use("/api/user/", userRoutes);

server.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur le port ${port}`);
});

module.exports = server;
