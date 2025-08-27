import { useState } from "react";

const GALLERY_IMAGES = [
  "IMG_0788.JPG",
  "IMG_0789.JPG",
  "IMG_0791.JPG",
  "IMG_0793.JPG",
  "IMG_0794.JPG",
  "IMG_0795.JPG",
  "IMG_0796.JPG",
  "IMG_0806.JPG",
  "IMG_0807 3.JPG"
];

export default function Gallery() {
  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % GALLERY_IMAGES.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length);
  };

  return (
    <div className="gallery-wrap">
      {/* 메인 이미지 */}
      <div style={{ 
        position: "relative", 
        width: "100%", 
        maxWidth: 600, 
        minWidth: 375, 
        margin: "0 auto 12px auto"
      }}>
        <img
          src={`./gallery/${GALLERY_IMAGES[currentImage]}`}
          alt={`gallery-${currentImage}`}
          style={{ 
            width: "100%", 
            height: 400, 
            objectFit: "contain", 
            borderRadius: 18,
            display: "block"
          }}
        />
        
        {/* 이전/다음 버튼 */}
        <button
          onClick={prevImage}
          style={{
            position: "absolute",
            left: "10px",
            top: "50%",
            transform: "translateY(-50%)",
            backgroundColor: "rgba(255,255,255,0.7)",
            border: "none",
            borderRadius: "50%",
            width: "40px",
            height: "40px",
            cursor: "pointer",
            fontSize: "18px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
          }}
        >
          ‹
        </button>
        
        <button
          onClick={nextImage}
          style={{
            position: "absolute",
            right: "10px",
            top: "50%",
            transform: "translateY(-50%)",
            backgroundColor: "rgba(255,255,255,0.7)",
            border: "none",
            borderRadius: "50%",
            width: "40px",
            height: "40px",
            cursor: "pointer",
            fontSize: "18px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
          }}
        >
          ›
        </button>
        
        {/* 이미지 카운터 */}
        <div style={{
          position: "absolute",
          bottom: "10px",
          left: "50%",
          transform: "translateX(-50%)",
          backgroundColor: "rgba(0,0,0,0.5)",
          color: "white",
          padding: "4px 12px",
          borderRadius: "12px",
          fontSize: "14px"
        }}>
          {currentImage + 1} / {GALLERY_IMAGES.length}
        </div>
      </div>
      
      {/* 썸네일 */}
      <div style={{ 
        display: "flex", 
        gap: "8px", 
        width: "100%", 
        maxWidth: 600, 
        minWidth: 375, 
        margin: "0 auto",
        overflowX: "auto",
        padding: "0 10px"
      }}>
        {GALLERY_IMAGES.map((img, idx) => (
          <img
            key={img}
            src={`./gallery/${img}`}
            alt={`thumb-${idx}`}
            onClick={() => setCurrentImage(idx)}
            style={{ 
              width: "60px", 
              height: "60px", 
              objectFit: "cover", 
              borderRadius: 8, 
              cursor: "pointer",
              border: currentImage === idx ? "2px solid #3a7cff" : "2px solid #eee",
              opacity: currentImage === idx ? 1 : 0.6,
              transition: "all 0.2s ease",
              flexShrink: 0
            }}
          />
        ))}
      </div>
    </div>
  );
} 