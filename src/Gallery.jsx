import { useState, useRef } from "react";

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
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const isDragging = useRef(false);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % GALLERY_IMAGES.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length);
  };

  // 터치 시작
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    isDragging.current = true;
  };

  // 터치 이동
  const handleTouchMove = (e) => {
    if (!isDragging.current) return;
    touchEndX.current = e.touches[0].clientX;
  };

  // 터치 끝
  const handleTouchEnd = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    
    const deltaX = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50; // 최소 스와이프 거리

    if (Math.abs(deltaX) > minSwipeDistance) {
      if (deltaX > 0) {
        // 왼쪽으로 스와이프 - 다음 이미지
        nextImage();
      } else {
        // 오른쪽으로 스와이프 - 이전 이미지
        prevImage();
      }
    }
  };

  // 마우스 이벤트 (데스크톱용)
  const handleMouseDown = (e) => {
    touchStartX.current = e.clientX;
    isDragging.current = true;
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    touchEndX.current = e.clientX;
  };

  const handleMouseUp = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    
    const deltaX = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (Math.abs(deltaX) > minSwipeDistance) {
      if (deltaX > 0) {
        nextImage();
      } else {
        prevImage();
      }
    }
  };

  return (
    <div className="gallery-wrap">
      {/* 메인 이미지 */}
      <div 
        style={{ 
          position: "relative", 
          width: "100%", 
          maxWidth: 600, 
          minWidth: 375, 
          margin: "0 auto 12px auto",
          userSelect: "none", // 드래그 시 텍스트 선택 방지
          cursor: "grab"
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp} // 마우스가 영역을 벗어날 때도 처리
      >
        <img
          src={`./gallery/${GALLERY_IMAGES[currentImage]}`}
          alt={`gallery-${currentImage}`}
          style={{ 
            width: "100%", 
            height: 400, 
            objectFit: "contain", 
            borderRadius: 18,
            display: "block",
            pointerEvents: "none" // 이미지 드래그 방지
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
            backgroundColor: "rgba(255,255,255,0.8)",
            border: "none",
            borderRadius: "50%",
            width: "40px",
            height: "40px",
            cursor: "pointer",
            fontSize: "18px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            zIndex: 2
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
            backgroundColor: "rgba(255,255,255,0.8)",
            border: "none",
            borderRadius: "50%",
            width: "40px",
            height: "40px",
            cursor: "pointer",
            fontSize: "18px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            zIndex: 2
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
          fontSize: "11px",
          zIndex: 2
        }}>
          {currentImage + 1} / {GALLERY_IMAGES.length}
        </div>

        {/* 스와이프 힌트 (첫 번째 이미지에서만 표시) */}
        {currentImage === 0 && (
          <div style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            backgroundColor: "rgba(0,0,0,0.6)",
            color: "white",
            padding: "6px 12px",
            borderRadius: "20px",
            fontSize: "10px",
            opacity: 0.7,
            zIndex: 2,
            animation: "fadeInOut 3s ease-in-out"
          }}>
            ← 스와이프 →
          </div>
        )}
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