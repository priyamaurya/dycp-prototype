const express = require("express");
const router = express.Router();
const path = require("node:path");

var oRoute = {
  "/registered-company-name-1": "registered-company-address-1",
  "/registered-company-address-1": "is-registered-company-address-same-1",
  "/registered-company-address-1-non-uk": "is-registered-company-address-same-1",
  "/registered-company-service-address-1": "registered-company-legal-form-1",
  "/registered-company-service-address-1-non-uk": "registered-company-legal-form-1",
  "/registered-company-legal-form-1": "registered-company-ch-number-1",
  "/registered-company-ch-number-1": "registered-company-nature-of-control-1",
  "/registered-company-nature-of-control-1": "registered-company-registration-date-1",
  "/registered-company-registration-date-1": "registered-company-register-1",
  "/registered-company-register-1": "check-answers",

  "/director-name-1": "director-address-1",
  "/director-address-1": "is-director-address-same-1",
  "/director-address-1-non-uk": "is-director-address-same-1",
  "/director-service-address-1": "director-legal-form-1",
  "/director-service-address-1-non-uk": "director-legal-form-1",
  "/director-legal-form-1": "director-ch-number-1",
  "/director-ch-number-1": "check-answers",

  "/parent-company-name-1": "parent-company-address-1",
  "/parent-company-address-1": "is-parent-company-address-same-1",
  "/parent-company-address-1-non-uk": "is-parent-company-address-same-1",
  "/parent-company-service-address-1": "parent-company-ch-number-1",
  "/parent-company-service-address-1-non-uk": "parent-company-ch-number-1",
  "/parent-company-ch-number-1": "check-answers",

  "/taken-over-company-name-1": "taken-over-company-address-1",
  "/taken-over-company-address-1": "taken-over-company-ch-number-1",
  "/taken-over-company-address-1-non-uk": "taken-over-company-ch-number-1",
  "/taken-over-company-ch-number-1": "taken-over-company-insolvent-date-1",
  "/taken-over-company-insolvent-date-1": "check-answers",

  "/other-org-with-control-name-1": "other-org-with-control-address-1",
  "/other-org-with-control-address-1": "is-other-org-with-control-address-same-1",
  "/other-org-with-control-address-1-non-uk": "is-other-org-with-control-address-same-1",
  "/other-org-with-control-service-address-1": "other-org-with-control-ch-number-1",
  "/other-org-with-control-service-address-1-non-uk": "other-org-with-control-ch-number-1",
  "/other-org-with-control-ch-equivalent-overseas-1": "other-org-with-control-nature-of-control-1",
  "/other-org-with-control-nature-of-control-1": "other-org-with-control-registration-date-1",
  "/other-org-with-control-registration-date-1": "other-org-with-control-legal-form-1",
  "/other-org-with-control-legal-form-1": "check-answers",

  "/category-other-psc-details-1": "category-other-psc-address-1",
  "/category-other-psc-address-1": "category-other-psc-nature-of-control-1",
  "/category-other-psc-address-1-non-uk": "category-other-psc-nature-of-control-1",
  "/category-other-psc-nature-of-control-1": "category-other-psc-registration-date-1",
  "/category-other-psc-registration-date-1": "category-other-psc-register-1",
  "/category-other-psc-register-1": "check-answers",

  "/category-other-director-details-1": "category-other-director-residency-1",
  "/category-other-director-residency-1": "category-other-director-address-1",
  "/category-other-director-address-1": "check-answers",

  "/category-other-indvidual-with-control-name-1": "category-other-indvidual-with-control-adress-1",
  "/category-other-indvidual-with-control-adress-1": "category-other-indvidual-with-control-nature-of-control-1",
  "/category-other-indvidual-with-control-nature-of-control-1": "category-other-indvidual-with-control-registration-date-1",
  "/category-other-indvidual-with-control-registration-date-1": "check-answers",

  //-------------------------

  "/registered-company-name-2": "registered-company-address-2",
  "/registered-company-address-2": "is-registered-company-address-same-2",
  "/registered-company-address-2-non-uk": "is-registered-company-address-same-2",
  "/registered-company-service-address-2": "has-registered-company-legal-form-2",
  "/registered-company-legal-form-2": "registered-company-ch-number-2",
  "/registered-company-service-address-2-non-uk": "has-registered-company-legal-form-2",
  "/registered-company-ch-equivalent-overseas-2": "registered-company-nature-of-control-2",
  "/registered-company-nature-of-control-2": "registered-company-registration-date-2",
  "/registered-company-register-2": "check-answers",

  "/director-name-2": "director-address-2",
  "/director-address-2": "is-director-address-same-2",
  "/director-address-2-non-uk": "is-director-address-same-2",
  "/director-service-address-2": "has-director-legal-form-2",
  "/director-service-address-2-non-uk": "has-director-legal-form-2",
  "/director-legal-form-2": "director-ch-number-2",
  "/director-ch-equivalent-overseas-2": "check-answers",

  "/parent-company-name-2": "parent-company-address-2",
  "/parent-company-address-2": "is-parent-company-address-same-2",
  "/parent-company-address-2-non-uk": "is-parent-company-address-same-2",
  "/parent-company-service-address-2": "parent-company-ch-number-2",
  "/parent-company-service-address-2-non-uk": "parent-company-ch-number-2",
  "/parent-company-ch-equivalent-overseas-2": "check-answers",

  "/taken-over-company-name-2": "taken-over-company-address-2",
  "/taken-over-company-address-2": "taken-over-company-ch-number-2",
  "/taken-over-company-address-2-non-uk": "taken-over-company-ch-number-2",
  "/taken-over-company-ch-equivalent-overseas-2": "taken-over-company-insolvent-date-2",
  "/taken-over-company-insolvent-date-2": "check-answers",

  "/other-org-with-control-name-2": "other-org-with-control-address-2",
  "/other-org-with-control-address-2": "is-other-org-with-control-address-same-2",
  "/other-org-with-control-address-2-non-uk": "is-other-org-with-control-address-same-2",
  "/other-org-with-control-service-address-2": "other-org-with-control-ch-number-2",
  "/other-org-with-control-service-address-2-non-uk": "other-org-with-control-ch-number-2",
  "/other-org-with-control-ch-equivalent-overseas-2": "other-org-with-control-nature-of-control-2",
  "/other-org-with-control-nature-of-control-2": "other-org-with-control-registration-date-2",
  "/other-org-with-control-register-2": "has-other-org-with-control-legal-form-2",
  "/other-org-with-control-legal-form-2": "check-answers",

  "/category-other-psc-details-2": "category-other-psc-address-2",
  "/category-other-psc-address-2": "category-other-psc-nature-of-control-2",
  "/category-other-psc-address-2-non-uk": "category-other-psc-nature-of-control-2",
  "/category-other-psc-nature-of-control-2": "category-other-psc-registration-date-2",
  "/category-other-psc-register-2": "check-answers",

  "/category-other-director-details-2": "category-other-director-residency-2",
  "/category-other-director-residency-2": "category-other-director-address-2",
  "/category-other-director-address-2": "check-answers",
  "/category-other-director-address-2-non-uk": "check-answers",

  "/category-other-indvidual-with-control-name-2": "category-other-indvidual-with-control-adress-2",
  "/category-other-indvidual-with-control-adress-2": "category-other-indvidual-with-control-nature-of-control-2",
  "/category-other-indvidual-with-control-adress-2-non-uk": "category-other-indvidual-with-control-nature-of-control-2",
  "/category-other-indvidual-with-control-nature-of-control-2": "category-other-indvidual-with-control-registration-date-2",
  "/category-other-indvidual-with-control-registration-date-2": "check-answers",

  //-------------------------

  "/check-answers": "add-another-connected-person",
  "/remove-connected-person": "add-another-connected-person",
};

var oViews = {
  "/cp-type-1": "type.html",
  "/category-org-1": "category.html",

  "/registered-company-name-1": "name.html",
  "/registered-company-address-1": "address.html",
  "/registered-company-address-1-non-uk": "address-non-uk.html",
  "/is-registered-company-address-same-1": "is-same-address.html",
  "/registered-company-service-address-1": "address.html",
  "/registered-company-service-address-1-non-uk": "address-non-uk.html",
  "/registered-company-legal-form-1": "legal-formation.html",
  "/registered-company-ch-number-1": "companies-house-number.html",
  "/registered-company-ch-equivalent-overseas-2": "companies-house-number.html",
  "/registered-company-nature-of-control-1": "nature-of-control.html",
  "/registered-company-registration-date-1": "date.html",
  "/registered-company-register-1": "register-name.html",

  "/director-name-1": "name.html",
  "/director-address-1": "address.html",
  "/director-address-1-non-uk": "address-non-uk.html",
  "/is-director-address-same-1": "is-same-address.html",
  "/director-service-address-1": "address.html",
  "/director-service-address-1-non-uk": "address-non-uk.html",
  "/director-legal-form-1": "legal-formation.html",
  "/director-ch-number-1": "companies-house-number.html",

  "/parent-company-name-1": "name.html",
  "/parent-company-address-1": "address.html",
  "/parent-company-address-1-non-uk": "address-non-uk.html",
  "/is-parent-company-address-same-1": "is-same-address.html",
  "/parent-company-service-address-1": "address.html",
  "/parent-company-service-address-1-non-uk": "address-non-uk.html",
  "/parent-company-ch-number-1": "companies-house-number.html",
  "/parent-company-ch-equivalent-overseas-2": "companies-house-number.html",

  "/taken-over-company-name-1": "name.html",
  "/taken-over-company-address-1": "address.html",
  "/taken-over-company-address-1-non-uk": "address-non-uk.html",
  "/taken-over-company-ch-number-1": "companies-house-number.html",
  "/taken-over-company-insolvent-date-1": "date.html",

  "/other-org-with-control-name-1": "name.html",
  "/other-org-with-control-address-1": "address.html",
  "/other-org-with-control-address-1-non-uk": "address-non-uk.html",
  "/is-other-org-with-control-address-same-1": "is-same-address.html",
  "/other-org-with-control-service-address-1": "address.html",
  "/other-org-with-control-service-address-1-non-uk": "address-non-uk.html",
  "/other-org-with-control-ch-number-1": "companies-house-number.html",
  "/other-org-with-control-nature-of-control-1": "nature-of-control.html",
  "/other-org-with-control-ch-equivalent-overseas-1": "companies-house-number.html",
  "/other-org-with-control-registration-date-1": "date.html",
  "/other-org-with-control-legal-form-1": "legal-formation.html",

  "/category-other-1": "category.html",

  "/category-other-psc-details-1": "person.html",
  "/category-other-psc-address-1": "address.html",
  "/category-other-psc-address-1-non-uk": "address-non-uk.html",
  "/category-other-psc-nature-of-control-1": "nature-of-control.html",
  "/category-other-psc-registration-date-1": "date.html",
  "/category-other-psc-register-1": "register-name.html",

  "/category-other-11": "category.html",

  "/category-other-psc-details-1": "trust.html",
  "/category-other-psc-address-1": "address.html",
  "/category-other-psc-address-1-non-uk": "address-non-uk.html",
  "/category-other-psc-nature-of-control-1": "nature-of-control.html",
  "/category-other-psc-registration-date-1": "date.html",
  "/category-other-psc-register-1": "register-name.html",

  //-------

  "/cp-type-2": "type.html",
  "/category-org-2": "category.html",

  "/category-other-director-details-1": "person.html",
  "/category-other-director-residency-1": "residency.html",
  "/category-other-director-address-1": "address.html",

  "/category-other-indvidual-with-control-name-1": "person.html",
  "/category-other-indvidual-with-control-adress-1": "address.html",
  "/category-other-indvidual-with-control-nature-of-control-1": "nature-of-control.html",
  "/category-other-indvidual-with-control-registration-date-1": "date.html",
  "/category-other-indvidual-with-control-register-1": "register-name.html",

  //-------
  //"/cp-type-2": "type.html",
  //"/category-org-2": "category.html",

  "/registered-company-name-2": "name.html",
  "/registered-company-address-2": "address.html",
  "/registered-company-address-2-non-uk": "address-non-uk.html",
  "/is-registered-company-address-same-2": "is-same-address.html",
  "/registered-company-service-address-2": "address.html",
  "/registered-company-service-address-2-non-uk": "address-non-uk.html",
  "/has-registered-company-legal-form-2": "has-legal-form.html",
  "/registered-company-legal-form-2": "name.html",
  "/registered-company-ch-number-2": "companies-house-number.html",
  "/registered-company-nature-of-control-2": "nature-of-control.html",
  "/registered-company-registration-date-2": "is-required-to-register.html",
  "/registered-company-register-2": "register-name.html",

  "/director-name-2": "name.html",
  "/director-address-2": "address.html",
  "/director-address-2-non-uk": "address-non-uk.html",
  "/is-director-address-same-2": "is-same-address.html",
  "/director-service-address-2": "address.html",
  "/director-service-address-2-non-uk": "address-non-uk.html",
  "/has-director-legal-form-2": "has-legal-form.html",
  "/director-legal-form-2": "name.html",
  "/director-ch-number-2": "companies-house-number.html",
  "/director-ch-equivalent-overseas-2": "companies-house-number.html",

  "/parent-company-name-2": "name.html",
  "/parent-company-address-2": "address.html",
  "/parent-company-address-2-non-uk": "address-non-uk.html",
  "/is-parent-company-address-same-2": "is-same-address.html",
  "/parent-company-service-address-2": "address.html",
  "/parent-company-service-address-2-non-uk": "address-non-uk.html",
  "/parent-company-ch-number-2": "companies-house-number.html",

  "/taken-over-company-name-2": "name.html",
  "/taken-over-company-address-2": "address.html",
  "/taken-over-company-address-2-non-uk": "address-non-uk.html",
  "/taken-over-company-ch-number-2": "companies-house-number.html",
  "/taken-over-company-ch-equivalent-overseas-2": "companies-house-number.html",
  "/taken-over-company-insolvent-date-2": "date.html",

  "/other-org-with-control-name-2": "name.html",
  "/other-org-with-control-ch-number-2": "companies-house-number.html",
  "/other-org-with-control-address-2": "address.html",
  "/other-org-with-control-address-2-non-uk": "address-non-uk.html",
  "/is-other-org-with-control-address-same-2": "is-same-address.html",
  "/other-org-with-control-service-address-2": "address.html",
  "/other-org-with-control-service-address-2-non-uk": "address-non-uk.html",
  "/other-org-with-control-ch-number-2": "companies-house-number.html",
  "/other-org-with-control-nature-of-control-2": "nature-of-control.html",
  "/other-org-with-control-ch-equivalent-overseas-2": "companies-house-number",
  "/other-org-with-control-registration-date-2": "is-required-to-register.html",
  "/other-org-with-control-register-2": "register-name.html",
  "/has-other-org-with-control-legal-form-2": "has-legal-form.html",
  "/other-org-with-control-legal-form-2": "name.html",

  "/category-other-2": "category.html",

  "/category-other-psc-details-2": "person.html",
  "/category-other-psc-address-2": "address.html",
  "/category-other-psc-address-2-non-uk": "address-non-uk.html",
  "/category-other-psc-nature-of-control-2": "nature-of-control.html",
  "/category-other-psc-registration-date-2": "is-required-to-register.html",
  "/category-other-psc-register-2": "register-name.html",

  "/category-other-director-details-2": "person.html",
  "/category-other-director-residency-2": "residency.html",
  "/category-other-director-address-2": "address.html",
  "/category-other-director-address-2-non-uk": "address-non-uk.html",

  "/category-other-indvidual-with-control-name-2": "person.html",
  "/category-other-indvidual-with-control-adress-2": "address.html",
  "/category-other-indvidual-with-control-adress-2-non-uk": "address-non-uk.html",
  "/category-other-indvidual-with-control-ch-equivalent-overseas-2": "companies-house-number",
  "/category-other-indvidual-with-control-nature-of-control-2": "nature-of-control.html",
  "/category-other-indvidual-with-control-registration-date-2": "is-required-to-register.html",
  "/category-other-indvidual-with-control-legal-form-2": "legal-formation.html",

  "/category-other-22": "category.html",

  "/category-other-psc-details-2": "trust.html",
  "/category-other-psc-address-2": "address.html",
  "/category-other-psc-address-2-non-uk": "address-non-uk.html",
  "/category-other-psc-nature-of-control-2": "nature-of-control.html",
  "/category-other-psc-registration-date-2": "is-required-to-register.html",
  "/category-other-psc-register-2": "register-name.html",

  "/category-other-director-details-2": "trust.html",
  "/category-other-director-residency-2": "residency.html",
  "/category-other-director-address-2": "address.html",
  "/category-other-director-address-2-non-uk": "address-non-uk.html",

  "/category-other-indvidual-with-control-name-2": "trust.html",
  "/category-other-indvidual-with-control-adress-2": "address.html",
  "/category-other-indvidual-with-control-adress-2-non-uk": "address-non-uk.html",
  "/category-other-indvidual-with-control-ch-equivalent-overseas-2": "companies-house-number",
  "/category-other-indvidual-with-control-nature-of-control-2": "nature-of-control.html",
  "/category-other-indvidual-with-control-registration-date-2": "is-required-to-register.html",
  "/category-other-indvidual-with-control-legal-form-2": "legal-formation.html",

  //-------

  "/add-another-connected-person": "add-another.html",
  "/remove-connected-person": "remove.html",
};

var listOfCountries = require("../../../data/data").nationalities;

router.post("/is-registered-with-companies-house", function (req, res, next) {
  if (req.body.isRegisteredWithCompaniesHouse == "No") res.redirect("cp-type-2");
  else res.redirect("cp-type-1");
});

router.post("/has-connected-person", function (req, res, next) {
  if (req.body.hasConnectedPerson == "No") res.redirect("../supplier-information");
  else res.redirect("is-registered-with-companies-house");
});

router.post("/cp-type-1", function (req, res, next) {
  switch (req.body.typeOfConnectedPerson) {
    case "Individual":
      res.redirect("category-other-1");
      break;
    case "Trustee":
      res.redirect("category-other-1");
      break;
    case "Trust":
        res.redirect("category-other-11");
      break;
    default:
      res.redirect("category-org-1");
  }
});

router.post("/cp-type-2", function (req, res, next) {
  switch (req.body.typeOfConnectedPerson) {
    case "Individual":
      res.redirect("category-other-2");
      break;
    case "Trustee":
      res.redirect("category-other-2");
      break;
    case "Trust":
      res.redirect("category-other-22");
      break;
    default:
      res.redirect("category-org-2");
  }
});

router.post("/category-org-1", function (req, res, next) {
  switch (req.body.categoryOfConnectedPerson) {
    case "director or organisation with the same responsibilities":
      res.redirect("director-name-1");
      break;
    case "parent or subsidiary company":
      res.redirect("parent-company-name-1");
      break;
    case "a company your organisation has taken over":
      res.redirect("taken-over-company-name-1");
      break;
    case "any other organisation with significant influence or control":
      res.redirect("other-org-with-control-name-1");
      break;
    default:
      res.redirect("registered-company-name-1");
  }
});

router.post("/is-registered-company-address-same-1", function (req, res, next) {
  if (req.body.isSameAddress == "No") res.redirect("registered-company-legal-form-1");
  else res.redirect("registered-company-service-address-1");
});

router.post("/is-director-address-same-1", function (req, res, next) {
  if (req.body.isSameAddress == "No") res.redirect("director-legal-form-1");
  else res.redirect("director-service-address-1");
});

router.post("/is-parent-company-address-same-1", function (req, res, next) {
  if (req.body.isSameAddress == "No") res.redirect("parent-company-ch-number-1");
  else res.redirect("parent-company-service-address-1");
});

router.post("/is-other-org-with-control-address-same-1", function (req, res, next) {
  if (req.body.isSameAddress == "No") res.redirect("other-org-with-control-ch-number-1");
  else res.redirect("other-org-with-control-service-address-1");
});

router.post("/other-org-with-control-ch-number-1", function (req, res, next) {
  if (req.body.hasCompaniesHouseNumber == "No") res.redirect("other-org-with-control-ch-equivalent-overseas-1");
  else res.redirect("other-org-with-control-nature-of-control-1");
});

router.post("/category-other-1", function (req, res, next) {
  switch (req.body.categoryOfConnectedPerson) {
    case "director or individual with the same responsibilities":
      res.redirect("category-other-director-details-1");
      break;
    case "any other individual with significant influence or control":
      res.redirect("category-other-indvidual-with-control-name-1");
      break;
    default:
      res.redirect("category-other-psc-details-1");
  }
});

router.post("/category-other-11", function (req, res, next) {
  switch (req.body.categoryOfConnectedPerson) {
    case "director or individual with the same responsibilities":
      res.redirect("category-other-director-details-1");
      break;
    case "any other individual with significant influence or control":
      res.redirect("category-other-indvidual-with-control-name-1");
      break;
    default:
      res.redirect("category-other-psc-details-1");
  }
});

router.post("/category-org-2", function (req, res, next) {
  switch (req.body.categoryOfConnectedPerson) {
    case "director or organisation with the same responsibilities":
      res.redirect("director-name-2");
      break;
    case "parent or subsidiary company":
      res.redirect("parent-company-name-2");
      break;
    case "a company your organisation has taken over":
      res.redirect("taken-over-company-name-2");
      break;
    case "any other organisation with significant influence or control":
      res.redirect("other-org-with-control-name-2");
      break;
    default:
      res.redirect("registered-company-name-2");
  }
});

router.post("/is-registered-company-address-same-2", function (req, res, next) {
  if (req.body.isSameAddress == "No") res.redirect("has-registered-company-legal-form-2");
  else res.redirect("registered-company-service-address-2");
});

router.post("/has-registered-company-legal-form-2", function (req, res, next) {
  if (req.body.hasLegalForm == "No") res.redirect("registered-company-ch-number-2");
  else res.redirect("registered-company-legal-form-2");
});

router.post("/registered-company-ch-number-2", function (req, res, next) {
  if (req.body.hasCompaniesHouseNumber == "No") res.redirect("registered-company-ch-equivalent-overseas-2");
  else res.redirect("registered-company-nature-of-control-2");
});

router.post("/is-director-address-same-2", function (req, res, next) {
  if (req.body.isSameAddress == "No") res.redirect("has-director-legal-form-2");
  else res.redirect("director-service-address-2");
});

router.post("/has-director-legal-form-2", function (req, res, next) {
  if (req.body.hasLegalForm == "No") res.redirect("director-ch-number-2");
  else res.redirect("director-legal-form-2");
});

router.post("/director-ch-number-2", function (req, res, next) {
  if (req.body.hasCompaniesHouseNumber == "No") res.redirect("director-ch-equivalent-overseas-2");
  else res.redirect("check-answers");
});

router.post("/is-parent-company-address-same-2", function (req, res, next) {
  if (req.body.isSameAddress == "No") res.redirect("parent-company-ch-number-2");
  else res.redirect("parent-company-service-address-2");
});

router.post("/parent-company-ch-number-2", function (req, res, next) {
  if (req.body.hasCompaniesHouseNumber == "No") res.redirect("parent-company-ch-equivalent-overseas-2");
  else res.redirect("check-answers");
});

router.post("/taken-over-company-ch-number-2", function (req, res, next) {
  if (req.body.hasCompaniesHouseNumber == "No") res.redirect("taken-over-company-ch-equivalent-overseas-2");
  else res.redirect("taken-over-company-insolvent-date-2");
});

router.post("/is-other-org-with-control-address-same-2", function (req, res, next) {
  if (req.body.isSameAddress == "No") res.redirect("other-org-with-control-ch-number-2");
  else res.redirect("other-org-with-control-service-address-2");
});

router.post("/other-org-with-control-ch-number-2", function (req, res, next) {
  if (req.body.hasCompaniesHouseNumber == "No") res.redirect("other-org-with-control-ch-equivalent-overseas-2");
  else res.redirect("other-org-with-control-nature-of-control-2");
});

router.post("/has-other-org-with-control-legal-form-2", function (req, res, next) {
  if (req.body.hasLegalForm == "No") res.redirect("check-answers");
  else res.redirect("other-org-with-control-legal-form-2");
});

router.post("/category-other-2", function (req, res, next) {
  switch (req.body.categoryOfConnectedPerson) {
    case "director or individual with the same responsibilities":
      res.redirect("category-other-director-details-2");
      break;
    case "any other individual with significant influence or control":
      res.redirect("category-other-indvidual-with-control-name-2");
      break;
    default:
      res.redirect("category-other-psc-details-2");
  }
});

router.post("/category-other-22", function (req, res, next) {
  switch (req.body.categoryOfConnectedPerson) {
    case "director or individual with the same responsibilities":
      res.redirect("category-other-director-details-2");
      break;
    case "any other individual with significant influence or control":
      res.redirect("category-other-indvidual-with-control-name-2");
      break;
    default:
      res.redirect("category-other-psc-details-2");
  }
});

router.post("/registered-company-registration-date-2", function (req, res, next) {
  if (req.body.isRequiredToRegisterAsPSC == "No") res.redirect("check-answers");
  else res.redirect("registered-company-register-2");
});

router.post("/category-other-psc-registration-date-2", function (req, res, next) {
  if (req.body.isRequiredToRegisterAsPSC == "No") res.redirect("check-answers");
  else res.redirect("category-other-psc-register-2");
});

router.post("/other-org-with-control-registration-date-2", function (req, res, next) {
  if (req.body.isRequiredToRegisterAsPSC == "No") res.redirect("has-other-org-with-control-legal-form-2");
  else res.redirect("other-org-with-control-register-2");
});

router.post("/add-another-connected-person", function (req, res, next) {
  if (req.body.addAnother == "No") res.redirect("../supplier-information");
  else res.redirect("start");
});

router.get("/*", function (req, res, next) {
  if (!req.session.data.listOfCountries) req.session.data.listOfCountries = listOfCountries;

  if (oViews[req.url]) res.render(path.resolve(__dirname, oViews[req.url]), { page: req.url });
  else
    res.render(path.resolve(__dirname, `${req.url.substring(1)}.html`), {
      page: req.url,
    });
});

router.post("/*", function (req, res, next) {
  res.redirect(oRoute[req.url]);
});

module.exports = router;
