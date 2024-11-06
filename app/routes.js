//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require("govuk-prototype-kit");
const router = govukPrototypeKit.requests.setupRouter();
const axios = require("axios");
const path = require("node:path");

// Add your routes here

// Route index page

router.get("/one-login", function (req, res) {
  req.session.proto_version = req.query.v;
  res.render("one-login/index", {});
});

router.get("/one-login/enter-code", function (req, res) {
  res.render("one-login/enter-code", {
    proto_version: req.session.proto_version,
  });
});

router.post("/supplier-information-v1/org-number", function (req, res) {
  res.redirect("org-location");
});

router.post(
  "/supplier-information-v1/contracting-authority",
  function (req, res) {
    if (req.body.contractingAuthority.toLowerCase() == "yes")
      res.redirect("/supplier-information-v1/contracting-authority-type");
    else res.redirect("/supplier-information-v1/org-number");
  }
);

router.use(
  "/supplier-information-v4",
  require("./views/supplier-information-v4/routes")
);
router.use(
  "/supplier-information-v4/suppliers-c",
  require("./views/supplier-information-v4/suppliers-c/routes")
);
router.use(
  "/supplier-information-v4/connected",
  require("./views/supplier-information-v4/connected/routes")
);
router.use(
  "/supplier-information-v4/mandatory",
  require("./views/supplier-information-v4/mandatory/routes")
);
router.use(
  "/supplier-information-v4/discretionary",
  require("./views/supplier-information-v4/discretionary/routes")
);
router.use(
  "/supplier-information-v4/financial",
  require("./views/supplier-information-v4/financial/routes")
);
router.use(
  "/supplier-information-v4/economical",
  require("./views/supplier-information-v4/economical/routes")
);
router.use(
  "/supplier-information-v4/user",
  require("./views/supplier-information-v4/user/routes")
);
router.use(
  "/supplier-information-v4/download",
  require("./views/supplier-information-v4/download/routes")
);

router.use(
  "/supplier-information-v5",
  require("./views/supplier-information-v5/routes")
);
router.use(
  "/supplier-information-v5/suppliers-c",
  require("./views/supplier-information-v5/suppliers-c/routes")
);
router.use(
  "/supplier-information-v5/connected",
  require("./views/supplier-information-v5/connected/routes")
);
router.use(
  "/supplier-information-v5/mandatory",
  require("./views/supplier-information-v5/mandatory/routes")
);
router.use(
  "/supplier-information-v5/exclusions",
  require("./views/supplier-information-v5/exclusions/routes")
);
router.use(
  "/supplier-information-v5/discretionary",
  require("./views/supplier-information-v5/discretionary/routes")
);
router.use(
  "/supplier-information-v5/financial",
  require("./views/supplier-information-v5/financial/routes")
);
router.use(
  "/supplier-information-v5/economical",
  require("./views/supplier-information-v5/economical/routes")
);
router.use(
  "/supplier-information-v5/user",
  require("./views/supplier-information-v5/user/routes")
);
router.use(
  "/supplier-information-v5/download",
  require("./views/supplier-information-v5/download/routes")
);
router.use(
  "/supplier-information-v5/manage-api-key",
  require("./views/supplier-information-v5/manage-api-key/routes")
);

router.use(
  "/supplier-information-v5/connected-person",
  require("./views/supplier-information-v5/connected-person/routes")
);



router.use(
  "/supplier-information-v6",
  require("./views/supplier-information-v6/routes")
);
router.use(
  "/supplier-information-v6/suppliers-c",
  require("./views/supplier-information-v6/suppliers-c/routes")
);

router.use(
  "/supplier-information-v6/mandatory",
  require("./views/supplier-information-v6/mandatory/routes")
);
router.use(
  "/supplier-information-v6/exclusions",
  require("./views/supplier-information-v6/exclusions/routes")
);
router.use(
  "/supplier-information-v6/discretionary",
  require("./views/supplier-information-v6/discretionary/routes")
);
router.use(
  "/supplier-information-v6/financial",
  require("./views/supplier-information-v6/financial/routes")
);
router.use(
  "/supplier-information-v6/economical",
  require("./views/supplier-information-v6/economical/routes")
);
router.use(
  "/supplier-information-v6/user",
  require("./views/supplier-information-v6/user/routes")
);
router.use(
  "/supplier-information-v6/download",
  require("./views/supplier-information-v6/download/routes")
);
router.use(
  "/supplier-information-v6/manage-api-key",
  require("./views/supplier-information-v6/manage-api-key/routes")
);

router.use(
  "/supplier-information-v6/connected-person",
  require("./views/supplier-information-v6/connected-person/routes")
);


router.use(
  "/supplier-information-v7",
  require("./views/supplier-information-v7/routes")
);

router.use(
  "/supplier-information-v7/suppliers-c",
  require("./views/supplier-information-v7/suppliers-c/routes")
);

router.use(
  "/supplier-information-v7/mandatory",
  require("./views/supplier-information-v7/mandatory/routes")
);
router.use(
  "/supplier-information-v7/exclusions",
  require("./views/supplier-information-v7/exclusions/routes")
);
router.use(
  "/supplier-information-v7/discretionary",
  require("./views/supplier-information-v7/discretionary/routes")
);
router.use(
  "/supplier-information-v7/financial",
  require("./views/supplier-information-v7/financial/routes")
);
router.use(
  "/supplier-information-v7/economical",
  require("./views/supplier-information-v7/economical/routes")
);
router.use(
  "/supplier-information-v7/user",
  require("./views/supplier-information-v7/user/routes")
);
router.use(
  "/supplier-information-v7/download",
  require("./views/supplier-information-v7/download/routes")
);

router.use(
  "/supplier-information-v7/manage-api-key",
  require("./views/supplier-information-v7/manage-api-key/routes")
);

router.use(
  "/supplier-information-v7/connected-person",
  require("./views/supplier-information-v7/connected-person/routes")
);

router.use(
  "/supplier-information-v7/consortiums",
  require("./views/supplier-information-v7/consortiums/routes")
);

router.use(
  "/supplier-information-v7/consortium",
  require("./views/supplier-information-v7/consortium/routes")
);
