import { useState, useRef } from "react";

const GALLERY_IMAGES = [
  // "IMG_0788.JPG",
  // "IMG_0789.JPG",
  // "IMG_0791.JPG",
  // "IMG_0793.JPG",
  // "IMG_0794.JPG",
  // "IMG_0795.JPG",
  // "IMG_0796.JPG",
  // "IMG_0806.JPG",
  // "IMG_0807 3.JPG",
  // "grid1.png"
  "04.png",
  "01.png",
  "02.png",
  "03.png",
  // "05.png",
  "06.png",
  "07.png",
  "08.png",
  "09.png",
  "10.png",
  "11.png",
  "12.png",
  "13.png",
  "14.png",
  "15.JPG",
  "16.JPG",
  "17.jpg",
  "18.JPG",
  "19.JPG",
  "20.jpg",
  "21.jpg",
  "22.JPG",
  "23.JPG",
];

export default function Gallery() {
  const [currentImage, setCurrentImage] = useState(1); // 1부터 시작 (복제된 첫 번째 이미지)
  const [isAnimating, setIsAnimating] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const isDragging = useRef(false);
  
  // 무한 루프를 위해 앞뒤에 이미지 복제
  const extendedImages = [
    GALLERY_IMAGES[GALLERY_IMAGES.length - 1], // 마지막 이미지 복제
    ...GALLERY_IMAGES,
    GALLERY_IMAGES[0] // 첫 번째 이미지 복제
  ];

  const nextImage = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentImage(prev => prev + 1);
    setTimeout(() => {
      setIsAnimating(false);
      // 마지막 복제 이미지에 도달하면 실제 첫 번째로 점프
      setCurrentImage(prev => {
        if (prev === extendedImages.length - 1) {
          return 1; // 실제 첫 번째 이미지 인덱스
        }
        return prev;
      });
    }, 300);
  };

  const prevImage = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentImage(prev => prev - 1);
    setTimeout(() => {
      setIsAnimating(false);
      // 첫 번째 복제 이미지에 도달하면 실제 마지막으로 점프
      setCurrentImage(prev => {
        if (prev === 0) {
          return extendedImages.length - 2; // 실제 마지막 이미지 인덱스
        }
        return prev;
      });
    }, 300);
  };

  // 터치/마우스 시작
  const handleStart = (clientX) => {
    touchStartX.current = clientX;
    touchEndX.current = clientX;
    isDragging.current = false; // 처음에는 드래그 상태가 아님
  };

  // 터치/마우스 이동
  const handleMove = (clientX) => {
    touchEndX.current = clientX;
    const deltaX = Math.abs(touchStartX.current - clientX);
    if (deltaX > 10) { // 10px 이상 이동하면 드래그로 간주
      isDragging.current = true;
    }
  };

  // 터치/마우스 끝
  const handleEnd = (clientX) => {
    const deltaX = touchStartX.current - clientX;
    const minSwipeDistance = 50;

    if (isDragging.current && Math.abs(deltaX) > minSwipeDistance) {
      if (deltaX > 0) {
        // 왼쪽으로 스와이프 - 다음 이미지
        nextImage();
      } else {
        // 오른쪽으로 스와이프 - 이전 이미지
        prevImage();
      }
    } else if (!isDragging.current) {
      // 드래그가 아닌 경우 클릭으로 처리
      const containerWidth = touchEndX.current; // 실제로는 컨테이너 너비 기준으로 계산해야 함
      // 이 부분은 클릭 영역에서 처리
    }
    
    isDragging.current = false;
  };

  // 터치 이벤트
  const handleTouchStart = (e) => {
    handleStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    handleMove(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    handleEnd(e.changedTouches[0].clientX);
  };

  // 마우스 이벤트
  const handleMouseDown = (e) => {
    handleStart(e.clientX);
  };

  const handleMouseMove = (e) => {
    handleMove(e.clientX);
  };

  const handleMouseUp = (e) => {
    handleEnd(e.clientX);
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
          cursor: "pointer",
          overflow: "hidden", // 슬라이딩 애니메이션을 위해 추가
          borderRadius: 18
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp} // 마우스가 영역을 벗어날 때도 처리
      >
        {/* 슬라이딩 컨테이너 */}
        <div
          style={{
            display: "flex",
            width: `${extendedImages.length * 100}%`,
            transform: `translateX(-${currentImage * (100 / extendedImages.length)}%)`,
            transition: isAnimating ? "transform 0.3s ease-in-out" : "none"
          }}
        >
          {extendedImages.map((img, idx) => (
            <img
              key={`${img}-${idx}`}
              src={`./gallery/${img}`}
              alt={`gallery-${idx}`}
              style={{
                width: `${100 / extendedImages.length}%`,
                height: 400,
                objectFit: "contain",
                borderRadius: 18,
                display: "block",
                pointerEvents: "none",
                flexShrink: 0
              }}
            />
          ))}
        </div>

        {/* 왼쪽 클릭 영역 */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "50%",
            height: "100%",
            cursor: "pointer",
            zIndex: 1
          }}
          onClick={() => {
            if (!isDragging.current) {
              prevImage();
            }
          }}
        />

        {/* 오른쪽 클릭 영역 */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "50%",
            height: "100%",
            cursor: "pointer",
            zIndex: 1
          }}
          onClick={() => {
            if (!isDragging.current) {
              nextImage();
            }
          }}
        />
        
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
          {((currentImage - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length) + 1} / {GALLERY_IMAGES.length}
        </div>

        {/* 스와이프 힌트 (첫 번째 이미지에서만 표시) */}
        {/* {currentImage === 0 && (
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
        )} */}
      </div>
      
      {/* 썸네일 */}
      <div 
        className="gallery-thumbnails"
        style={{ 
          display: "flex", 
          gap: "8px", 
          width: "100%", 
          maxWidth: 600, 
          minWidth: 375, 
          margin: "0 auto",
          overflowX: "auto",
          overflowY: "hidden",
          padding: "0 10px",
          height: "80px", // 고정 높이 설정
          alignItems: "center"
        }}>
        {GALLERY_IMAGES.map((img, idx) => {
          const realCurrentIndex = (currentImage - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length;
          return (
            <img
              key={img}
              src={`./gallery/${img}`}
              alt={`thumb-${idx}`}
              onClick={() => setCurrentImage(idx + 1)} // +1 because of the prepended image
              style={{ 
                width: "70px", 
                height: "70px", 
                objectFit: "cover", 
                borderRadius: "12px", 
                cursor: "pointer",
                border: "2px solid #eee",
                opacity: realCurrentIndex === idx ? 1 : 0.6,
                transform: realCurrentIndex === idx ? "scale(1.05)" : "scale(1)",
                transition: "all 0.2s ease",
                flexShrink: 0,
                display: "block" // 인라인 요소로 인한 여백 제거
              }}
            />
          );
        })}
      </div>
    </div>
  );
} 