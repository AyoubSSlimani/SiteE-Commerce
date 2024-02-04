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

server.post(
  "/webhook",
  bodyParser.raw({ type: "application/json" }),
  (request, response) => {
    const payload = request.body;
    const sig = request.headers["stripe-signature"];

    console.log("hello");
    let event;

    try {
      event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
    } catch (err) {
      return response.status(400).send(`Webhook Error: ${err.message}`);
    }

    response.status(200).end();
  }
);

server.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur le port ${port}`);
});

module.exports = server;
