const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");

module.exports.checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        console.log("erreur lors de la vérification du token");
        res.cookie("jwt", "", { maxAge: 1 });
        next();
      } else {
        let user = await UserModel.findById(decodedToken.id);
        console.log("token ok pour checkuser : " + decodedToken.id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    console.log("pas de token pour checkuser");
    next();
  }
};

module.exports.requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decodedToken) => {
      if (err) {
        console.log("noo?" + err);
        res.status(400).send({ message: "token pas bon!" });
      } else {
        console.log("token ok pour requireAuth" + decodedToken.id);
        next();
      }
    });
  } else {
    res.locals.user = null;
    res.status(400).send({ message: "pas de token!" });
  }
};
