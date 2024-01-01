import React, { useRef, useEffect, useCallback, useState } from 'react';
import Webcam from 'react-webcam';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCameraRotate } from '@fortawesome/free-solid-svg-icons';

function WebcamApp({ selectedObject, objectCount, shootingInterval, detectionMode }) {
    const webcamRef = useRef(null);
    const [indicatorColor, setIndicatorColor] = useState('red');
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const [detectedCount, setDetectedCount] = useState(0);
    const [isRequestInProgress, setIsRequestInProgress] = useState(false);

    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    const [facingMode, setFacingMode] = useState(isMobile ? 'environment' : 'user');

    const switchCamera = useCallback(() => {
        setFacingMode(prev => prev === 'user' ? 'environment' : 'user');
    }, []);

    useEffect(() => {
        if (isMobile) {
            // 모바일에서의 초기화 및 필요한 로직 (필요시 구현)
        } else {
            navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
            if (!webcamRef.current) return;
            const constraints = { audio: false, video: true };
            navigator.getUserMedia(constraints,
                stream => webcamRef.current.srcObject = stream,
                error => console.log("Webcam Error:", error)
            );
        }

        return () => {
            if (!isMobile && webcamRef.current && webcamRef.current.srcObject) {
                const tracks = webcamRef.current.srcObject.getTracks();
                tracks.forEach(track => track.stop());
            }
        };
    }, [webcamRef, isMobile]);

    const saveImageFunction = useCallback(() => {
        downloadImage(webcamRef.current.getScreenshot(), `capture_${Date.now()}.jpg`);
    }, [webcamRef]);

    const sendImageToServer = useCallback(async () => {
        if (!webcamRef.current || isRequestInProgress) {
            return;
        }

        const imageSrc = webcamRef.current.getScreenshot();
        if (!imageSrc) {
            return;
        }

        setIsRequestInProgress(true);

        const formData = new FormData();
        formData.append('image', imageSrc);

        try {
            let response = await fetch("https://192.168.0.5:5000/detect", {
                method: "POST",
                body: formData
            });
            let data = await response.json();
            const detectedObjects = data.detected_objects;
            const objectOccurrences = detectedObjects.filter(obj => obj === selectedObject).length;
            setDetectedCount(objectOccurrences);

            if (detectionMode === "fix" && objectOccurrences === objectCount) {
                saveImageFunction();
                setIndicatorColor('green');
            } else if (detectionMode === "below" && objectOccurrences <= objectCount) {
                saveImageFunction();
                setIndicatorColor('green');
            } else if (detectionMode === "above" && objectOccurrences >= objectCount) {
                saveImageFunction();
                setIndicatorColor('green');
            } else {
                setIndicatorColor('red');
            }
        } catch (error) {
            console.error("Error sending image to server: ", error);
        } finally {
            setIsRequestInProgress(false);
        }
    }, [selectedObject, objectCount, detectionMode, saveImageFunction]);

    useEffect(() => {
        const interval = setInterval(() => {
            sendImageToServer();
        }, shootingInterval * 1000);

        return () => clearInterval(interval);
    }, [shootingInterval, sendImageToServer]);

    useEffect(() => {
        window.addEventListener('online', () => setIsOnline(true));
        window.addEventListener('offline', () => setIsOnline(false));
        return () => {
            window.removeEventListener('online', () => setIsOnline(true));
            window.removeEventListener('offline', () => setIsOnline(false));
        };
    }, []);

    function downloadImage(dataURL, filename) {
        let blob = dataURLtoBlob(dataURL);
        let url = window.URL.createObjectURL(blob);
        let a = document.createElement("a");
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function () {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 0);
    }

    function dataURLtoBlob(dataURL) {
        let binary = atob(dataURL.split(",")[1]);
        let array = [];
        for (let i = 0; i < binary.length; i++) {
            array.push(binary.charCodeAt(i));
        }
        return new Blob([new Uint8Array(array)], { type: "image/jpeg" });
    }

    return (
        <div style={{ position: 'relative', width: '100%', maxWidth: '800px', margin: '0 auto' }}>
            <Webcam
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                style={{ width: '100%', height: 'auto' }}
                videoConstraints={{ facingMode }}
            />
            <div style={{ position: 'absolute', top: 10, right: 10, width: 30, height: 30, borderRadius: '50%', backgroundColor: indicatorColor }}></div>
            {isMobile && <button id="switchButton" style={{ position: 'absolute', bottom: 10, left:100}} onClick={switchCamera}><FontAwesomeIcon icon={faCameraRotate} size="xl" /></button>}
            {!isOnline && <p style={{ color: 'red', textAlign: 'center' }}>No internet connection</p>}
            <p style={{ textAlign: 'center', color: 'white', fontWeight: 'bold', marginTop: '10px' }}>Detected {selectedObject}(s) : {detectedCount}</p>
        </div>
    );
}

export default WebcamApp;