const express = require('express');
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const { isLoggedIn, isOwner, validateListing } = require("../middleware");
const listingsControllers = require("../controllers/listings");
const multer = require('multer');
const { storage } = require("../cloudConfig");
const upload = multer({ storage });

router
  .route("/")
  .get(wrapAsync(listingsControllers.index))
  .post(isLoggedIn, 
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingsControllers.createListings)
  );

//New Route
router.get("/new", isLoggedIn, listingsControllers.renderNewForm);

router
  .route("/:id")
  .get(wrapAsync(listingsControllers.showAllListings))
  .put(isLoggedIn, isOwner, validateListing, wrapAsync(listingsControllers.updateListings))
  .delete(isLoggedIn, isOwner, wrapAsync(listingsControllers.deleteListings));

//Edit Route
router.get("/:id/edit", isLoggedIn, wrapAsync(listingsControllers.renderEditForm));

module.exports = router;