const fs = require('fs');
const path = require('path');
const { createWriteStream } = require('fs');
const { pipeline } = require('stream');
const zlib = require('zlib');

const dataFolderPath = '../data'

const directoryFiles = fs.readdirSync(dataFolderPath); // 지정한 경로를 읽어서 그 경로에 있는 파일을 모두 표시

directoryFiles.forEach(filename => {
  const inputFile = fs.createReadStream(`${dataFolderPath}/${filename}`);
  const outputFile = fs.createWriteStream(`${dataFolderPath}/${filename.slice(0, filename.indexOf('.'))}.txt`);
  inputFile.pipe(zlib.createGunzip()).pipe(outputFile)
})

// 1. 압축파일을 클라이언트에서 업로드
// 2. 서버사이드에서 압축파일을 정적 폴더에 저장
// 3. 저장된 압축파일을 읽은 후 정적 파일 폴더에 압축 풀기
// 4. 압축풀기가 완료되면 클라이언트에 성공 메시지 보내기