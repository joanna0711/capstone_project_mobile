const express = require('express');
const { spawn } = require('child_process');

const app = express();
const port = 3000;

app.get('/start', (req, res) => {
  // Python 코드 실행 명령 생성
  const pythonScript = 'detection.py';
  const pythonProcess = spawn('python', [pythonScript]);

  // Python 코드 실행 시의 출력을 처리
  pythonProcess.stdout.on('data', (data) => {
    console.log(`Python Output: ${data}`);
  });

  // Python 코드 실행 종료 시의 처리
  pythonProcess.on('close', (code) => {
    console.log(`Python Process Exited with Code: ${code}`);
  });

  res.send('Started YOLO test');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});