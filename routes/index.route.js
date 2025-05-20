const express = require('express');
const router = express.Router();
const multer  = require('multer');
const fs = require("fs");
const { unZipFile } = require("../controllers/index.controller");

let dir = "./uploads/";
if (!fs.existsSync(dir)) fs.mkdirSync(dir);

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname);
    },
  }),
});

// GET Home page
router.get("/", (req, res) => {
  res.render("index");
});

// POST
router.post("/", upload.single("file"), unZipFile);
module.exports = router;

