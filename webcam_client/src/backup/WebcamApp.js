import React, { useRef, useEffect, useCallback, useState } from 'react';
import Webcam from 'react-webcam';

function WebcamApp({ selectedObject, objectCount, shootingInterval }) {
    const webcamRef = useRef(null);
    const [indicatorColor, setIndicatorColor] = useState('red'); // 추가

    const saveImageFunction = useCallback(() => {
        const link = document.createElement('a');
        link.href = webcamRef.current.getScreenshot();
        link.download = `capture_${Date.now()}.jpg`;
        link.click();
    }, [webcamRef]);

    const sendImageToServer = useCallback(async () => {
        if (!webcamRef.current) {
            return;
        }

        const imageSrc = webcamRef.current.getScreenshot();
        const formData = new FormData();
        formData.append('image', imageSrc);

        try {
            let response = await fetch("http://localhost:5000/detect", {
                method: "POST",
                body: formData
            });
            let data = await response.json();
            const detectedObjects = data.detected_objects;
            const objectOccurrences = detectedObjects.filter(obj => obj === selectedObject).length;
            if (objectOccurrences >= objectCount) {
                saveImageFunction();
                setIndicatorColor('green'); // 추가
            } else {
                setIndicatorColor('red'); // 추가
            }
        } catch (error) {
            console.error("Error sending image to server: ", error);
        }
    }, [selectedObject, objectCount, saveImageFunction]);

    useEffect(() => {
        const interval = setInterval(() => {
            sendImageToServer();
        }, shootingInterval * 1000);

        return () => clearInterval(interval);
    }, [shootingInterval, sendImageToServer]);

    return (
        <div style={{ position: 'relative' }}>
            <Webcam 
                ref={webcamRef} 
                screenshotFormat="image/jpeg"
                videoConstraints={{ deviceId: 0 }}
                width={1920}
                height={1080}
            />
            <div style={{ position: 'absolute', top: 10, right: 10, width: 30, height: 30, borderRadius: '50%', backgroundColor: indicatorColor }}></div> {/* 추가 */}
        </div>
    );
}

export default WebcamApp;
