module.exports.signUpErrors = (err) => {
  let errors = { email: "", password: "" };

  if (err.message.includes("email")) errors.email = "Cet email est déjà pris";

  if (err.message.includes("password"))
    errors.password = "Le mot de passe doit faire 4 caractères minimum";

  return errors;
};

module.exports.signInErrors = (err) => {
  let errors = { email: "", password: "" };

  if (err.message.includes("Email")) errors.email = "Email inconnu";

  if (err.message.includes("Mot de passe"))
    errors.password = "Le mot de passe ne correspond pas";

  return errors;
};
