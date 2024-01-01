# Webcam App

이 프로젝트는 백엔드 서버와 프론트엔드 클라이언트로 구성되어 있습니다. 백엔드 서버는 `app.py` 파일을 통해 실행되며, 프론트엔드 클라이언트는 React를 사용하여 구현되어 있습니다.

## 프로젝트 설정 및 실행

### 백엔드 서버 설정 및 실행
cmd 창을 열고
1. 먼저, 프로젝트의 `webcam_server` 디렉토리에서 가상 환경을 생성하고 활성화합니다. (선택 사항)
   ```bash
   python -m venv venv
   source venv/bin/activate  # Windows에서는 venv\Scripts\activate
   ```

2. 필요한 패키지를 설치합니다. `requirements.txt` 파일에 명시된 의존성을 설치합니다.
(webcam_server 디렉토리에서 아래 코드 실행)
   ```bash
   pip install -r requirements.txt
   ```
app.py 파일 내에서 cfg파일, weights 파일, coco.names파일이 절대경로로 설정되어있는데, 본인에 맞게 수정하기
3. 백엔드 서버를 실행합니다.
   ```bash
   python webcam_server/app.py
   ```
   이제 백엔드 서버가 로컬 호스트의 5000번 포트에서 실행되고 있습니다: [http://localhost:5000](http://localhost:5000)

### 프론트엔드 클라이언트 설정 및 실행
새로운 cmd 창을 열고
1. `webcam_client` 디렉토리로 이동합니다.
   ```bash
   cd webcam_client
   ```

2. 필요한 npm 패키지를 설치합니다.
   ```bash
   npm install
   ```

3. React 앱을 실행합니다.
   ```bash
   npm start
   ```
   이제 웹 브라우저가 자동으로 열리고, React 앱이 로컬 호스트의 3000번 포트에서 실행되고 있습니다: [http://localhost:3000](http://localhost:3000)

이제 백엔드 서버와 프론트엔드 클라이언트 모두 실행되고 있으며, 웹 앱을 사용할 준비가 되었습니다!
# capstone_project_mobile
