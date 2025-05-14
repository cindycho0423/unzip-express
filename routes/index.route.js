const express = require('express');
const router = express.Router();
const multer  = require('multer');
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
    cb(null, "uploads/")
    },
    filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname)
    },
  })
});

// GET Home page
router.get('/', (req, res) => {
  res.render('index')
})

// POST
router.post('/', upload.single('file'), function(req, res, next){
const { data } = req.body;
console.log(req.file)
  res.json({
    success: true,
  })
})
module.exports = router;

