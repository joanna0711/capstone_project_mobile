import React, { useEffect, useState } from 'react';
import WebcamComponent from './WebcamComponent'; // WebcamComponent를 가져옴
import './index.scss';
// import ReactDOM from 'react-dom';



const cocoObjects = [
  "person", "bicycle", "car", "motorcycle", "airplane", "bus", "train", "truck", "boat", "traffic light",
  "fire hydrant", "stop sign", "parking meter", "bench", "bird", "cat", "dog", "horse", "sheep", "cow",
  "elephant", "bear", "zebra", "giraffe", "backpack", "umbrella", "handbag", "tie", "suitcase", "frisbee",
  "skis", "snowboard", "sports ball", "kite", "baseball bat", "baseball glove", "skateboard", "surfboard", 
  "tennis racket", "bottle", "wine glass", "cup", "fork", "knife", "spoon", "bowl", "banana", "apple",
  "sandwich", "orange", "broccoli", "carrot", "hot dog", "pizza", "donut", "cake", "chair", "couch",
  "potted plant", "bed", "dining table", "toilet", "tv", "laptop", "mouse", "remote", "keyboard", 
  "cell phone", "microwave", "oven", "toaster", "sink", "refrigerator", "book", "clock", "vase", 
  "scissors", "teddy bear", "hair drier", "toothbrush"
];

function Skills() {
  const [selectedObject, setSelectedObject] = useState('dog');
  const [objectCount, setObjectCount] = useState(1);
  const [shootingInterval, setShootingInterval] = useState(1);
  const [isCameraActive, setIsCameraActive] = useState(false);

  return (
    <div className="Skills">
      <h1>Webcam Application</h1>

      <label htmlFor="objectSelect">Choose an object:</label>
      <select 
        id="objectSelect" 
        name="objectSelect" 
        value={selectedObject} 
        onChange={(e) => setSelectedObject(e.target.value)}
      >
        {cocoObjects.map(obj => <option key={obj} value={obj}>{obj.charAt(0).toUpperCase() + obj.slice(1)}</option>)}
      </select>

      <label htmlFor="objectCount">Number of objects:</label>
      <input 
        type="number" 
        id="objectCount" 
        name="objectCount" 
        min="1" 
        max="10" 
        value={objectCount} 
        onChange={(e) => setObjectCount(e.target.value)}
      />

      <label htmlFor="shootingInterval">Shooting interval (seconds):</label>
      <input 
        type="number" 
        id="shootingInterval" 
        name="shootingInterval" 
        min="1" 
        max="60" 
        value={shootingInterval} 
        onChange={(e) => setShootingInterval(e.target.value)}
      />

      <button onClick={() => setIsCameraActive(true)}>Complete Settings</button>

      {isCameraActive && (
        <WebcamComponent></WebcamComponent>
      )}
    </div>
  );
}

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <Skills />
//   </React.StrictMode>
// ); 이 새끼의 정체를알아내라

export default Skills;
