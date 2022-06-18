const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');

const checkPayloadExists = require('./middleware/checkPayloadExists');
const fileExtLimiter = require('./middleware/fileExtLimiter');
const fileSizeLimiter = require('./middleware/fileSizeLimiter');

const app = express();

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.post(
  '/upload',
  fileUpload({ createParentPath: true }),
  checkPayloadExists,
  fileExtLimiter(['.jpg', '.jpeg', '.png', '.gif']),
  fileSizeLimiter,
  (req, res) => {
    const files = req.files;
    console.log(files);

    Object.keys(files).forEach((key) => {
      const filepath = path.join(__dirname, 'files', files[key].name);
      files[key].mv(filepath, (err) => {
        if (err) return res.status(500).json({ status: 'error', message: err });
      });
    });

    return res.json({
      status: 'success',
      message: Object.keys(files).toString(),
    });
  }
);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
