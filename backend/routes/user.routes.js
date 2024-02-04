const router = require("express").Router();
const authController = require("../controllers/auth.controller");
const userController = require("../controllers/user.controller");
//auth
router.post("/register", authController.signUp);
router.post("/login", authController.signIn);
router.get("/logout", authController.logout);
router.delete("/delete/:id", authController.deleteUser);

// user DB
router.get("/:id", userController.userInfo);

// USER INFO CHANGES

router.patch("/emailchange/:id", userController.userEmailChange);
router.patch("/passwordchange/:id", userController.userPasswordChange);

module.exports = router;
