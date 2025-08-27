import { useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

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
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <div className="gallery-wrap">
      <Swiper
        style={{ width: "100%", maxWidth: 600, minWidth: 375, borderRadius: 0, margin: "0 auto 12px auto" }}
        modules={[Navigation, Thumbs]}
        navigation
        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
        spaceBetween={10}
        slidesPerView={1}
        className="gallery-main-swiper"
      >
        {GALLERY_IMAGES.map((img, idx) => (
          <SwiperSlide key={img}>
            <img
              src={`./gallery/${img}`}
              alt={`gallery-${idx}`}
              style={{ width: "100%", height: 400, objectFit: "contain", borderRadius: 0 }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        modules={[Thumbs]}
        spaceBetween={8}
        slidesPerView={Math.min(GALLERY_IMAGES.length, 5)}
        watchSlidesProgress
        className="gallery-thumbs-swiper"
        style={{ width: "100%", maxWidth: 600, minWidth: 375, margin: "0 auto" }}
      >
        {GALLERY_IMAGES.map((img, idx) => (
          <SwiperSlide key={img} style={{ height: 80, cursor: "pointer" }}>
            <img
              src={`./gallery/${img}`}
              alt={`thumb-${idx}`}
              style={{ width: "100%", height: 80, objectFit: "cover", borderRadius: 10, border: "2px solid #eee" }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
} 