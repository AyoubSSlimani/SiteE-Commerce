const UserModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const { signUpErrors, signInErrors } = require("../utils/errors.utils");
// 3 jours de durée pour le jwtoken
const maxAge = 3 * 24 * 60 * 60 * 1000;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET, {
    expiresIn: maxAge,
  });
};

module.exports.signUp = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.create({ email, password });
    res.status(201).json({
      message: "Utilisateur : " + user.email + " inscrit avec succès",
      user: user._id,
    });
  } catch (err) {
    console.log(err);
    const errors = signUpErrors(err);
    res.status(400).send({ errors });
  }
};

module.exports.signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.login(email, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, { maxAge, sameSite: "None", secure: true });
    res.status(200).json({
      message: "Utilisateur : " + user.email + " connecté avec succès",
      user: user._id,
    });
  } catch (err) {
    const errors = signInErrors(err);
    res.status(400).json({ errors });
  }
};

module.exports.logout = async (req, res) => {
  res.cookie("jwt", "", { maxAge: 1, sameSite: "None", secure: true });
  res.send({ message: "Déconnecté avec succès" });
};

module.exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedUser = await UserModel.findByIdAndDelete(userId);

    res.send({ message: "Utilisateur supprimé avec succès" });
  } catch (error) {
    return res.status(404).send({ message: "Utilisateur non trouvé" });
  }
};
