const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const path = require("path");
const isEmail = validator.isEmail;

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      validate: isEmail,
      lowercase: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      max: 1024,
      minLength: 4,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("Mot de passe incorrect");
  }
  throw Error("Email incorrect");
};

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;
