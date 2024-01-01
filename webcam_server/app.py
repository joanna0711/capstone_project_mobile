from flask import Flask, request, jsonify
from flask_cors import CORS
import cv2
import numpy as np
import base64
import logging

# Flask 앱 초기화
app = Flask(__name__)
# CORS 설정 - 다른 도메인에서의 요청을 허용하기 위함
CORS(app)

# 로깅 설정 - 디버그 수준의 로그를 출력
logging.basicConfig(level=logging.DEBUG)

# YOLO 설정값
YOLO_CFG = "yolov3.cfg"  # YOLO 구성 파일 경로
YOLO_WEIGHTS = "yolov3.weights"  # YOLO 가중치 파일 경로
YOLO_CLASSES = "coco.names"  # YOLO 클래스 이름 파일 경로
CONFIDENCE_THRESHOLD = 0.7  # 객체를 탐지하기 위한 최소 신뢰도
NMS_THRESHOLD = 0.4  # 비 최대 억제를 위한 임계값

# YOLO 네트워크 로드
net = cv2.dnn.readNet(YOLO_WEIGHTS, YOLO_CFG)
layer_names = net.getLayerNames()
output_layers = [layer_names[i - 1] for i in net.getUnconnectedOutLayers().flatten()]
classes = open(YOLO_CLASSES).read().strip().split("\n")

# 이미지 내 객체를 탐지하는 함수
def detect_objects(image):
    height, width, channels = image.shape

    # 이미지를 YOLO 네트워크 입력 형식에 맞게 변환
    blob = cv2.dnn.blobFromImage(image, 0.00392, (416, 416), (0, 0, 0), True, crop=False)
    net.setInput(blob)
    outs = net.forward(output_layers)

    class_ids = []
    confidences = []
    boxes = []

    # 탐지된 객체들을 분석하여 리스트에 추가
    for out in outs:
        for detection in out:
            scores = detection[5:]
            class_id = np.argmax(scores)
            confidence = scores[class_id]
            if confidence > CONFIDENCE_THRESHOLD:
                center_x = int(detection[0] * width)
                center_y = int(detection[1] * height)
                w = int(detection[2] * width)
                h = int(detection[3] * height)

                x = int(center_x - w / 2)
                y = int(center_y - h / 2)

                boxes.append([x, y, w, h])
                confidences.append(float(confidence))
                class_ids.append(class_id)

    detected_objects = []
    indexes = cv2.dnn.NMSBoxes(boxes, confidences, CONFIDENCE_THRESHOLD, NMS_THRESHOLD)
    
    # indexes를 numpy 배열로 변환하여 flatten 처리
    indexes = np.array(indexes).flatten()
    for i in indexes:
        detected_objects.append(classes[class_ids[i]])

    return detected_objects

# 이미지를 받아 객체를 탐지하는 엔드포인트
@app.route('/detect', methods=['POST'])
def detect():
    image_data = request.form.get("image")
    if not image_data:
        return jsonify(error="no image provided"), 400

    # 로깅을 통해 image_data의 내용 확인
    logging.debug(f"Received image_data: {image_data[:100]}...")  # 처음 100자만 출력

    # 예외 처리 추가
    if "," not in image_data:
        return jsonify(error="Invalid image data format"), 400

    parts = image_data.split(",")
    if len(parts) < 2:
        return jsonify(error="Invalid image data format"), 400

    # base64로 인코딩된 이미지를 디코드
    image_data = base64.b64decode(parts[1])
    image = cv2.imdecode(np.frombuffer(image_data, dtype=np.uint8), cv2.IMREAD_COLOR)

    detected_objects = detect_objects(image)
    return jsonify(detected_objects=detected_objects)

# 메인 실행
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, ssl_context=('192.168.0.5.pem', '192.168.0.5-key.pem'))
