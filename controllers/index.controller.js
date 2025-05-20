// const fs = require('fs');
// const path = require('path');
// const { createWriteStream } = require('fs');
// const { pipeline } = require('stream');
// const zlib = require('zlib');

// const dataFolderPath = '../data'

// const directoryFiles = fs.readdirSync(dataFolderPath); // 지정한 경로를 읽어서 그 경로에 있는 파일을 모두 표시

// directoryFiles.forEach(filename => {
//   const inputFile = fs.createReadStream(`${dataFolderPath}/${filename}`);
//   const outputFile = fs.createWriteStream(`${dataFolderPath}/${filename.slice(0, filename.indexOf('.'))}.txt`);
//   inputFile.pipe(zlib.createGunzip()).pipe(outputFile)
// })

// 1. 압축파일을 클라이언트에서 업로드 -> multer
// 2. 서버사이드에서 압축파일을 정적 폴더에 저장 -> y
// 3. 저장된 압축파일을 읽은 후 정적 파일 폴더에 압축 풀기
// 4. 압축풀기가 완료되면 클라이언트에 성공 메시지 보내기

const yauzl = require("yauzl");
const path = require("path");
const fs = require("fs");

function unZipFile(req, res, next) {
  if (!path.join(__dirname, "../uploads")) {
    fs.mkdirSync(__dirname, "../uploads", { recursive: true });
  }
  const zipFilePath = path.join(__dirname, "../uploads", req.file.filename);
  const extractPath = path.join(__dirname, "../extracted");

  yauzl.open(zipFilePath, { lazyEntries: true }, function (err, zipfile) {
    zipfile.readEntry();
    zipfile.on("entry", function (entry) {
      const filePath = path.join(extractPath, entry.fileName);

      if (/\/$/.test(entry.fileName)) {
        fs.mkdirSync(filePath, { recursive: true });
        zipfile.readEntry();
      } else {
        zipfile.openReadStream(entry, function (err, readStream) {
          const writeStream = fs.createWriteStream(filePath);
          readStream.on("end", function () {
            zipfile.readEntry();
          });
          readStream.pipe(writeStream);
        });
      }
    });

    zipfile.on("end", function () {
      res.json({ success: true });
    });
  });
}

module.exports = { unZipFile };

