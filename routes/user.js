const express = require('express');
const wrapAsync = require('../utils/wrapAsync');
const router = express.Router();
const passport = require('passport');
const { saveRedirectUrl } = require('../middleware');
const usersController = require("../controllers/users")

router
  .route("/signup")
  .get(usersController.renderSignupForms)
  .post(wrapAsync(usersController.signup));

router
  .route("/login")
  .get(usersController.renderLoginForm)
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: '/login', failureFlash: true
    }),
    usersController.login
  );

router.get("/logout", usersController.logout);

module.exports = router