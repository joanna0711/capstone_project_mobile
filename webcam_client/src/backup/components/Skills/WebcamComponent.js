import React, { useRef, useEffect, useCallback } from 'react';
import Webcam from 'react-webcam';

const WebcamApp = ({ selectedObject, objectCount, shootingInterval }) => {
    // 웹캠 참조 객체를 생성합니다.
    const webcamRef = useRef(null);

    useEffect(() => {
        // 웹캠에 대한 제약사항(constraints)을 정의합니다.
        const constraints = { video: true };

        // 웹캠에 접근하여 스트림을 받아옵니다.
        navigator.mediaDevices.getUserMedia(constraints)
        .then((stream) => {
            // 웹캠 컴포넌트의 스트림에 연결합니다.
            webcamRef.current.stream = stream;
        }).catch((error) => {
            console.error('웹캠 접근 에러: ' + error);
        });
    }, []);

    // 이미지를 저장하는 함수를 생성합니다.
    const saveImageFunction = useCallback(() => {
        const link = document.createElement('a');
        link.href = webcamRef.current.getScreenshot();
        link.download = `capture_${Date.now()}.jpg`;
        link.click();
    }, [webcamRef]);

    // 이미지를 서버로 전송하는 함수를 생성합니다.
    const sendImageToServer = useCallback(async () => {
        if (!webcamRef.current) {
            return;
        }

        // 웹캠으로부터 이미지 스크린샷을 가져옵니다.
        const imageSrc = webcamRef.current.getScreenshot();

        // FormData를 사용하여 이미지를 포함시킵니다.
        const formData = new FormData();
        formData.append('image', imageSrc);

        try {
            // 서버에 이미지를 POST로 전송합니다.
            let response = await fetch("http://localhost:8000/detect", {
                method: "POST",
                body: formData
            });

            // 서버에서 응답 데이터를 JSON 형식으로 파싱합니다.
            let data = await response.json();

            // 감지된 객체 목록을 가져옵니다.
            const detectedObjects = data.detected_objects;

            // 선택된 객체와 객체 수를 비교하여 이미지 저장 함수를 호출합니다.
            const objectOccurrences = detectedObjects.filter(obj => obj === selectedObject).length;
            if (objectOccurrences >= objectCount) {
                saveImageFunction();
            }
        } catch (error) {
            console.error("서버로 이미지 전송 에러: ", error);
        }
    }, [selectedObject, objectCount, saveImageFunction]);

    useEffect(() => {
        // 주기적으로 이미지를 서버로 전송하는 인터벌을 설정합니다.
        const interval = setInterval(() => {
            sendImageToServer();
        }, shootingInterval * 1000);

        // 컴포넌트가 언마운트될 때 인터벌을 클리어합니다.
        return () => clearInterval(interval);
    }, [shootingInterval, sendImageToServer]);

    return (
        <div>
            {/* 웹캠 컴포넌트를 렌더링합니다. */}
            <Webcam
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={{ deviceId: 0 }}
                width={500}
                height="auto"
            />
        </div>
    );
}

export default WebcamApp;
