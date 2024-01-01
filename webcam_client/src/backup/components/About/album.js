import React, { useState } from 'react';

const ImageAlbum = () => {
  const imagePaths = [
    '/path/to/image1.jpg',
    '/path/to/image2.jpg',
    '/path/to/image3.jpg',
    // 다른 이미지 경로들을 추가하세요.
  ];

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const nextImage = () => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex === imagePaths.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex === 0 ? imagePaths.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="image-album">
      <h1>이미지 앨범</h1>
      <div className="image-container">
        <button className="prev-button" onClick={prevImage}>
          이전
        </button>
        <img
          className="album-image"
          src={imagePaths[selectedImageIndex]}
          alt={`Image ${selectedImageIndex + 1}`}
        />
        <button className="next-button" onClick={nextImage}>
          다음
        </button>
      </div>
    </div>
  );
};

export default ImageAlbum;
