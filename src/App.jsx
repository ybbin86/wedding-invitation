import { useEffect, useRef, useState } from "react";
import "./App.css";
import Gallery from "./Gallery";

const INVITE_TEXT = `함께 있기만 해도\n세상이 즐겁고 웃음이 멈추지 않는 두 사람,\n그 순간들이 너무 소중해서\n평생을 함께하기로 약속했습니다.\n\n저희의 첫 시작에 오셔서\n따뜻한 마음으로 자리를 빛내주세요.`;

export default function App() {
  const varaRef = useRef(null);
  const audioRef = useRef(null);
  const [muted, setMuted] = useState(false);
  const inviteRef = useRef(null);
  const [inviteAnim, setInviteAnim] = useState("hidden"); // 'fadeinup', 'fadeoutdown', 'hidden'
  const mapRef = useRef(null);
  const [ceremonyAnim, setCeremonyAnim] = useState("hidden");
  const ceremonyRef = useRef(null);
  const galleryRef = useRef(null);
  const [galleryAnim, setGalleryAnim] = useState("hidden");
  const mapSectionRef = useRef(null);
  const [mapSectionAnim, setMapSectionAnim] = useState("hidden");
  const accountRef = useRef(null);
  const [accountAnim, setAccountAnim] = useState("hidden");
  
  // 로딩 상태 관리
  const [isLoading, setIsLoading] = useState(true);
  const [mainImageLoaded, setMainImageLoaded] = useState(false);
  
  // main.png 이미지 로딩 완료 핸들러
  const handleMainImageLoad = () => {
    console.log('Main image loaded!'); // 디버깅용
    setMainImageLoaded(true);
    
    // 최소 1초는 로딩 화면을 보여준 후 종료 (로컬에서도 로딩 화면을 볼 수 있도록)
    setTimeout(() => {
      setIsLoading(false);
      // handwriting 애니메이션 시작
      setTimeout(() => {
        const handwritingText = document.querySelector('.handwriting-text');
        if (handwritingText) {
          handwritingText.classList.add('animate');
        }
      }, 200); // 페이지 표시 후 0.2초 뒤에 애니메이션 시작
    }, 1000); // 1초 후 로딩 화면 종료
  };

  // 컴포넌트 마운트 시 이미지가 이미 로딩되어 있는지 확인
  useEffect(() => {
    let timeoutId;
    
    const img = new Image();
    img.onload = () => {
      console.log('Image preloaded!'); // 디버깅용
      if (timeoutId) clearTimeout(timeoutId);
      handleMainImageLoad();
    };
    img.onerror = () => {
      console.log('Image load error, proceeding anyway'); // 디버깅용
      if (timeoutId) clearTimeout(timeoutId);
      handleMainImageLoad();
    };
    
    // 3초 후에도 로딩이 안 끝나면 강제로 진행
    timeoutId = setTimeout(() => {
      console.log('Loading timeout, proceeding anyway'); // 디버깅용
      handleMainImageLoad();
    }, 3000);

    img.src = './main.png';
    
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);
  
  // 계좌번호 팝업 상태
  const [showGroomAccount, setShowGroomAccount] = useState(false);
  const [showBrideAccount, setShowBrideAccount] = useState(false);
  
  // 스크롤 방향 감지
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState("down");
  
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY) {
        setScrollDirection("down");
      } else {
        setScrollDirection("up");
      }
      setLastScrollY(currentScrollY);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);
  // 갤러리 관련 import, 상수, 상태, useRef, useEffect, JSX 블록 등 전체 삭제

  useEffect(() => {
    if (isLoading || !varaRef.current) return; // 로딩 완료 후에만 실행
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInviteAnim("fadeinup");
        } else if (scrollDirection === "up") {
          // 위로 스크롤할 때만 사라짐
          setInviteAnim("fadeoutdown");
        }
        // 아래로 스크롤할 때는 아무것도 하지 않음 (그대로 유지)
      },
      { threshold: 0.2 }
    );
    observer.observe(varaRef.current);
    return () => observer.disconnect();
  }, [scrollDirection, isLoading]); // isLoading 의존성 추가

  // Cherolina 폰트를 사용한 정적 텍스트로 변경

  // 초대 문구 Intersection Observer (fadeinup/fadeoutdown)
  useEffect(() => {
    if (isLoading || !inviteRef.current) return; // 로딩 완료 후에만 실행
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInviteAnim("fadeinup");
        } else if (scrollDirection === "up") {
          // 위로 스크롤할 때만 사라짐
          setInviteAnim("fadeoutdown");
        }
        // 아래로 스크롤할 때는 아무것도 하지 않음 (그대로 유지)
      },
      { threshold: 0.2 }
    );
    observer.observe(inviteRef.current);
    return () => observer.disconnect();
  }, [scrollDirection, isLoading]); // isLoading 의존성 추가

  // ceremony+calendar fade 애니메이션
  useEffect(() => {
    if (isLoading || !ceremonyRef.current) return; // 로딩 완료 후에만 실행
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCeremonyAnim("fadeinup");
        } else if (scrollDirection === "up") {
          // 위로 스크롤할 때만 사라짐
          setCeremonyAnim("fadeoutdown");
        }
        // 아래로 스크롤할 때는 아무것도 하지 않음 (그대로 유지)
      },
      { threshold: 0.2 }
    );
    observer.observe(ceremonyRef.current);
    return () => observer.disconnect();
  }, [scrollDirection, isLoading]); // isLoading 의존성 추가

  // 갤러리 fade 애니메이션
  useEffect(() => {
    if (isLoading || !galleryRef.current) return; // 로딩 완료 후에만 실행
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setGalleryAnim("fadeinup");
        } else if (scrollDirection === "up") {
          // 위로 스크롤할 때만 사라짐
          setGalleryAnim("fadeoutdown");
        }
        // 아래로 스크롤할 때는 아무것도 하지 않음 (그대로 유지)
      },
      { threshold: 0.2 }
    );
    observer.observe(galleryRef.current);
    return () => observer.disconnect();
  }, [scrollDirection, isLoading]); // isLoading 의존성 추가

  // 약도 섹션 fade 애니메이션
  useEffect(() => {
    if (isLoading || !mapSectionRef.current) return; // 로딩 완료 후에만 실행
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMapSectionAnim("fadeinup");
        } else if (scrollDirection === "up") {
          // 위로 스크롤할 때만 사라짐
          setMapSectionAnim("fadeoutdown");
        }
        // 아래로 스크롤할 때는 아무것도 하지 않음 (그대로 유지)
      },
      { threshold: 0.2 }
    );
    observer.observe(mapSectionRef.current);
    return () => observer.disconnect();
  }, [scrollDirection, isLoading]); // isLoading 의존성 추가

  // 계좌번호 섹션 fade 애니메이션
  useEffect(() => {
    if (isLoading || !accountRef.current) return; // 로딩 완료 후에만 실행
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAccountAnim("fadeinup");
        } else if (scrollDirection === "up") {
          // 위로 스크롤할 때만 사라짐
          setAccountAnim("fadeoutdown");
        }
        // 아래로 스크롤할 때는 아무것도 하지 않음 (그대로 유지)
      },
      { threshold: 0.2 }
    );
    observer.observe(accountRef.current);
    return () => observer.disconnect();
  }, [scrollDirection, isLoading]); // isLoading 의존성 추가

  // BGM 자동재생 (음소거 상태 반영)
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = muted;
      if (!audioRef.current.paused && muted) {
        audioRef.current.muted = true;
      }
    }
  }, [muted]);

  // 모바일 자동재생 정책 대응 (최초 사용자 상호작용 시 play)
  useEffect(() => {
    const handler = () => {
      if (audioRef.current) {
        audioRef.current.play().catch(() => {});
      }
      window.removeEventListener("touchstart", handler);
      window.removeEventListener("click", handler);
    };
    window.addEventListener("touchstart", handler);
    window.addEventListener("click", handler);
    return () => {
      window.removeEventListener("touchstart", handler);
      window.removeEventListener("click", handler);
    };
  }, []);

  // 네이버 지도 생성 (지도 스크립트가 이미 index.html에 포함되어 있다고 가정)
  useEffect(() => {
    if (!window.naver || !mapRef.current) return;
    // 이미 생성된 경우 중복 방지
    if (mapRef.current._naver_map) return;
    const map = new window.naver.maps.Map(mapRef.current, {
      center: new window.naver.maps.LatLng(37.3595704, 127.105399),
      zoom: 14,
    });
    mapRef.current._naver_map = map;
  }, []);

  // 로딩 화면 렌더링
  if (isLoading) {
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: '#f8f8f8',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999
      }}>
        <div style={{
          width: '60px',
          height: '60px',
          border: '4px solid #e0e0e0',
          borderTop: '4px solid #385b85',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          marginBottom: '20px'
        }}></div>
        <div style={{
          fontSize: '1rem',
          color: '#666',
          fontFamily: "'MaruBuri', 'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif"
        }}>
          로딩 중...
        </div>
      </div>
    );
  }

  return (
    <div className="container-html">
      
      <div className="photo-card-html" style={{ marginBottom: "-10px" }}>
        <img 
          src="./main.png" 
          alt="배경사진" 
          onLoad={handleMainImageLoad}
          style={{ display: mainImageLoaded ? 'block' : 'none' }}
        />
      </div>
      <div
        className="handwriting-title-html"
        ref={varaRef}
        style={{ width: "100vw", maxWidth: 600, minWidth: 200, height: "100px", marginBottom: "-5px" }}
      >
        <svg className="handwriting-svg" viewBox="0 0 400 200">
          <text x="50%" y="60%" className="handwriting-text" textAnchor="middle" dominantBaseline="middle">
            Happy Wedding Day
          </text>
        </svg>
      </div>
      <div style={{
          textAlign: "center",
          marginTop: "5px",
          fontSize: "1rem",
          color: "#333",
          fontFamily: "'MaruBuri', 'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif"
        }}>
        2025.11.29 Saturday 12:20
      </div>
      {/* 초대 문구 + 클립아트 */}
      <div
        ref={inviteRef}
        className={`invite-fadeanim ${inviteAnim}`}
        style={{
          margin: "48px auto 0 auto",
          textAlign: "center",
          width: "100%",
          maxWidth: 600,
          minWidth: 375,
        }}
      >
        <img
          src="./wedding_clippart.jpg"
          alt="wedding clippart"
          style={{
            width: 300,
            maxWidth: "100%",
            margin: "0px auto 40px auto",
            display: "block",
            borderRadius: 16,
            // boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
            background: "#fff"
          }}
        />
        <span style={{
          display: "inline-block",
          textAlign: "left",
          whiteSpace: "pre-line",
          fontSize: "0.92rem",
          color: "#222",
          fontFamily: "inherit",
          fontWeight: 400,
          lineHeight: 1.7,
          letterSpacing: "0.01em",
        }}>
          {INVITE_TEXT}
        </span>
        <hr className="invite-divider" />
        <div className="invite-names">
          <div><span className="invite-parent">조길현 · 김인옥</span>의&nbsp;&nbsp;&nbsp;&nbsp;아들&nbsp;&nbsp;<span className="invite-mainname">조영빈</span></div>
          <div><span className="invite-parent">김상진 · 최경선</span>의&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;딸&nbsp;&nbsp;&nbsp; <span className="invite-mainname">김효영</span></div>
        </div>
        {/* 예식 안내+달력 fade 애니메이션 */}
        <div
          ref={ceremonyRef}
          className={`ceremony-fadeanim ${ceremonyAnim}`}
          style={{ width: "100%", maxWidth: 600, minWidth: 375, margin: "0 auto" }}
        >
          <img
            src="./wedding_clippart_middle.png"
            alt="wedding clippart"
            style={{
              width: 200,
              maxWidth: "100%",
              margin: "60px auto 40px auto",
              display: "block",
              borderRadius: 16,
              // boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              background: "#fff"
            }}
          />
          <div className="ceremony-info">
            <div className="ceremony-place">서울 송파구 문정 루이비스 컨벤션 아모리스홀</div>
            <div className="ceremony-datetime">2025년 11월 29일 토요일 오후 12시 20분</div>
          </div>
          <div className="calendar-wrap">
            <Calendar202511 />
          </div>
        </div>
      </div>

      {/* 포토 갤러리 */}
      <div
        ref={galleryRef}
        className={`gallery-fadeanim ${galleryAnim}`}
        style={{
          width: "100%",
          maxWidth: 600,
          minWidth: 375,
          margin: "10px auto 10px auto",
          textAlign: "center"
        }}
      >
        <img
          src="./wedding_clippart_middle.png"
          alt="wedding clippart"
          style={{
            width: 200,
            maxWidth: "100%",
            margin: "0 auto 40px auto",
            display: "block",
            borderRadius: 16,
            background: "#fff"
          }}
        />
        <div style={{
          fontSize: "1.6rem",
          fontWeight: 700,
          color: "#554c44",
          marginBottom: "40px",
          fontFamily: "'MaruBuri', 'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif",
          letterSpacing: "0.01em"
        }}>
          우리의 순간들
        </div>
        <Gallery />
      </div>

      {/* 약도 섹션 */}
      <div
        ref={mapSectionRef}
        className={`map-section-fadeanim ${mapSectionAnim}`}
        style={{
          width: "100%",
          maxWidth: 600,
          minWidth: 375,
          margin: "10px auto 10px auto",
          textAlign: "center"
        }}
      >
        <img
          src="./wedding_clippart_middle.png"
          alt="wedding clippart"
          style={{
            width: 200,
            maxWidth: "100%",
            margin: "0 auto 40px auto",
            display: "block",
            borderRadius: 16,
            background: "#fff"
          }}
        />
        {/* <div style={{
          fontSize: "1.6rem",
          fontWeight: 700,
          color: "#554c44",
          marginBottom: "10px",
          fontFamily: "'MaruBuri', 'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif",
          letterSpacing: "0.01em"
        }}>
          오시는 길
        </div> */}
        {/* <div style={{
          width: "80%",
          maxWidth: "500px",
          height: "1px",
          backgroundColor: "#ddd",
          margin: "20px auto 10px auto"
        }}></div> */}

        
        <img
          src="./sketch_map.png"
          alt="약도"
          style={{
            width: "100%",
            maxWidth: 500,
            height: "auto",
            borderRadius: 12,
            // boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            display: "block",
            margin: "30px auto 0px auto"
          }}
        />

        {/* 네비게이션 링크 */}
        <div style={{
          // marginTop: "12px",
          display: "flex",
          borderRadius: "8px",
          overflow: "hidden",
          // border: "1px solid #e5e7eb",
          backgroundColor: "white",
          // boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
          maxWidth: "400px",
          margin: "0px auto 10px auto"
        }}>
          <a
            href="https://naver.me/Gctrli34"
            target="_blank"
            rel="noreferrer noopener"
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
              padding: "8px",
              fontSize: "13px",
              fontWeight: "500",
              textDecoration: "none",
              color: "#333",
              transition: "transform 0.1s ease",
              fontFamily: "'MaruBuri', 'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif"
            }}
            onMouseDown={(e) => {
              e.target.style.transform = "scale(0.98)";
            }}
            onMouseUp={(e) => {
              e.target.style.transform = "scale(1)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "scale(1)";
            }}
          >
            <img 
              src="./navermap_logo.png" 
              alt="네이버지도" 
              style={{ width: "16px", height: "16px", objectFit: "contain" }}
            />
            <span>네이버지도</span>
          </a>
          
          <div style={{
            width: "1px",
            backgroundColor: "#e5e7eb"
          }}></div>
          
          <a
            href="https://kko.kakao.com/uP5nwoZ3FZ"
            target="_blank"
            rel="noreferrer noopener"
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
              padding: "8px",
              fontSize: "13px",
              fontWeight: "500",
              textDecoration: "none",
              color: "#333",
              transition: "transform 0.1s ease",
              fontFamily: "'MaruBuri', 'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif"
            }}
            onMouseDown={(e) => {
              e.target.style.transform = "scale(0.98)";
            }}
            onMouseUp={(e) => {
              e.target.style.transform = "scale(1)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "scale(1)";
            }}
          >
            <img 
              src="./kakaomap_logo.png" 
              alt="카카오맵" 
              style={{ width: "16px", height: "16px", objectFit: "contain" }}
            />
            <span>카카오맵</span>
          </a>
          
          <div style={{
            width: "1px",
            backgroundColor: "#e5e7eb"
          }}></div>
          
          <a
            href="https://tmap.life/92aad9a9"
            target="_blank"
            rel="noreferrer noopener"
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
              padding: "8px",
              fontSize: "13px",
              fontWeight: "500",
              textDecoration: "none",
              color: "#333",
              transition: "transform 0.1s ease",
              fontFamily: "'MaruBuri', 'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif"
            }}
            onMouseDown={(e) => {
              e.target.style.transform = "scale(0.98)";
            }}
            onMouseUp={(e) => {
              e.target.style.transform = "scale(1)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "scale(1)";
            }}
          >
            <img 
              src="./tmap_logo.png" 
              alt="티맵" 
              style={{ width: "16px", height: "16px", objectFit: "contain" }}
            />
            <span>티맵</span>
          </a>
        </div>

        {/* 오시는 길 상세 정보 */}
        <div style={{
          width: "100%",
          maxWidth: 500,
          margin: "0 auto",
          padding: "0 20px",
          textAlign: "left"
        }}>
          {/* 오시는 길 */}
          <div style={{
            padding: "20px"
          }}>
            <h3 style={{
              fontSize: "1.1rem",
              fontWeight: "700",
              color: "#333",
              margin: "0 0 15px 0",
              fontFamily: "'MaruBuri', 'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif"
            }}>
              | 오시는 길 |
            </h3>
            <div style={{
              fontSize: "0.9rem",
              lineHeight: "1.6",
              color: "#333",
              fontFamily: "'MaruBuri', 'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif"
            }}>
              <div style={{ fontWeight: "600", marginBottom: "5px"}}>루이비스컨벤션 송파문정</div>
              <div>서울시 송파구 법원로9길 26 </div>
              <div style={{ color: "#666", fontSize: "0.85rem" }}>(서울시 송파구 문정동 645-2)</div>
            </div>
          </div>

          {/* 셔틀버스 */}
          <div style={{
            padding: "20px"
          }}>
            <h3 style={{
              fontSize: "1.1rem",
              fontWeight: "700",
              color: "#333",
              margin: "0 0 15px 0",
              fontFamily: "'MaruBuri', 'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif"
            }}>
              | 문정역<span style={{ fontSize: "0.9rem" }}>↔</span>식장 셔틀버스 |
            </h3>
            <div style={{
              fontSize: "0.9rem",
              lineHeight: "1.6",
              color: "#333",
              fontFamily: "'MaruBuri', 'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif"
            }}>
              <div>8호선 문정역 4번출구 앞 셔틀버스 10분 배차 운행</div>
              <div style={{ color: "#e74c3c", fontSize: "0.85rem", marginTop: "5px" }}>
                ※ 수서역은 셔틀버스가 없습니다.
              </div>
            </div>
          </div>

          {/* 주차 안내 */}
          <div style={{
            marginBottom: "40px",
            padding: "20px",
          }}>
            <h3 style={{
              fontSize: "1.1rem",
              fontWeight: "700",
              color: "#333",
              margin: "0 0 15px 0",
              fontFamily: "'MaruBuri', 'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif"
            }}>
              | 주차 안내 |
            </h3>
            <div style={{
              fontSize: "0.9rem",
              lineHeight: "1.6",
              color: "#333",
              fontFamily: "'MaruBuri', 'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif"
            }}>
              <div style={{ marginBottom: "8px" }}>
                웨딩홀 건물(H비지니스파크) 내 C, D동
              </div>
              <div>
                B1~ B4층 1300여대 주차 가능
              </div>
            </div>
          </div>
        </div>
        
      </div>

      {/* 계좌번호 섹션 */}
      <div
        ref={accountRef}
        className={`account-fadeanim ${accountAnim}`}
        style={{
          width: "100%",
          maxWidth: 600,
          minWidth: 375,
          margin: "0px auto 40px auto",
          textAlign: "center"
        }}
      >
        <img
          src="./wedding_clippart_middle.png"
          alt="wedding clippart"
          style={{
            width: 200,
            maxWidth: "100%",
            margin: "0 auto 40px auto",
            display: "block",
            borderRadius: 16,
            background: "#fff"
          }}
        />
        <div style={{
          fontSize: "1.4rem",
          fontWeight: "700",
          color: "#554c44",
          marginBottom: "30px",
          fontFamily: "'MaruBuri', 'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif",
          letterSpacing: "0.01em"
        }}>
          마음 전하실 곳(계좌번호)
        </div>
        
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          alignItems: "center"
        }}>
          <button
            onClick={() => setShowGroomAccount(true)}
            style={{
              padding: "12px 24px",
              backgroundColor: "#385b85",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "0.9rem",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.2s ease",
              fontFamily: "'MaruBuri', 'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif",
              minWidth: "200px"
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "#2a4a6b";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "#385b85";
            }}
          >
            신랑측 계좌번호 확인하기
          </button>
          
          <button
            onClick={() => setShowBrideAccount(true)}
            style={{
              padding: "12px 24px",
              backgroundColor: "#d4a574",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "0.9rem",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.2s ease",
              fontFamily: "'MaruBuri', 'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif",
              minWidth: "200px"
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "#c49660";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "#d4a574";
            }}
          >
            신부측 계좌번호 확인하기
          </button>
        </div>
      </div>

      {/* 신랑측 계좌번호 팝업 */}
      {showGroomAccount && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0,0,0,0.5)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: "white",
            borderRadius: "12px",
            padding: "30px",
            maxWidth: "350px",
            width: "90%",
            textAlign: "center",
            position: "relative"
          }}>
            <button
              onClick={() => setShowGroomAccount(false)}
              style={{
                position: "absolute",
                top: "15px",
                right: "15px",
                background: "none",
                border: "none",
                fontSize: "20px",
                cursor: "pointer",
                color: "#999",
                zIndex: 10
              }}
            >
              ×
            </button>
            
            <h3 style={{
              fontSize: "1.2rem",
              fontWeight: "700",
              color: "#385b85",
              marginTop: "12px",
              marginBottom: "20px",
              fontFamily: "'MaruBuri', 'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif",
              position: "absolute",
              top: "15px",
              left: "30px",
              right: "30px"
            }}>
              신랑측 계좌번호
            </h3>
            
            <div style={{
              fontSize: "0.9rem",
              lineHeight: "1.6",
              color: "#333",
              fontFamily: "'MaruBuri', 'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: "50px"
            }}>
              <div style={{ marginBottom: "15px" }}>
                <div style={{ fontWeight: "600", marginBottom: "5px", textAlign: "center" }}>신랑 조영빈</div>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <span>카카오뱅크 3333-08-5827233</span>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText("카카오뱅크 3333085827233");
                      alert("계좌번호가 복사되었습니다!");
                    }}
                    style={{
                      background: "none",
                      border: "1px solid #ddd",
                      borderRadius: "4px",
                      padding: "4px 6px",
                      cursor: "pointer",
                      fontSize: "10px",
                      color: "#666"
                    }}
                    title="복사하기"
                  >
                    복사
                  </button>
                </div>
              </div>
              <div style={{ marginBottom: "15px" }}>
                <div style={{ fontWeight: "600", marginBottom: "5px", textAlign: "center" }}>아버지 조길현</div>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <span>국민은행 304-21-0580-952</span>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText("국민은행 304-21-0580-952");
                      alert("계좌번호가 복사되었습니다!");
                    }}
                    style={{
                      background: "none",
                      border: "1px solid #ddd",
                      borderRadius: "4px",
                      padding: "4px 6px",
                      cursor: "pointer",
                      fontSize: "10px",
                      color: "#666"
                    }}
                    title="복사하기"
                  >
                    복사
                  </button>
                </div>
              </div>
              <div>
                <div style={{ fontWeight: "600", marginBottom: "5px", textAlign: "center" }}>어머니 김인옥</div>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <span>농협 251-12-256604</span>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText("농협 251-12-256604");
                      alert("계좌번호가 복사되었습니다!");
                    }}
                    style={{
                      background: "none",
                      border: "1px solid #ddd",
                      borderRadius: "4px",
                      padding: "4px 6px",
                      cursor: "pointer",
                      fontSize: "10px",
                      color: "#666"
                    }}
                    title="복사하기"
                  >
                    복사
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 신부측 계좌번호 팝업 */}
      {showBrideAccount && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0,0,0,0.5)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: "white",
            borderRadius: "12px",
            padding: "30px",
            maxWidth: "350px",
            width: "90%",
            textAlign: "center",
            position: "relative"
          }}>
            <button
              onClick={() => setShowBrideAccount(false)}
              style={{
                position: "absolute",
                top: "15px",
                right: "15px",
                background: "none",
                border: "none",
                fontSize: "20px",
                cursor: "pointer",
                color: "#999",
                zIndex: 10
              }}
            >
              ×
            </button>
            
            <h3 style={{
              fontSize: "1.2rem",
              fontWeight: "700",
              color: "#d4a574",
              marginTop: "12px",
              marginBottom: "20px",
              fontFamily: "'MaruBuri', 'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif",
              position: "absolute",
              top: "15px",
              left: "30px",
              right: "30px"
            }}>
              신부측 계좌번호
            </h3>
            
            <div style={{
              fontSize: "0.9rem",
              lineHeight: "1.6",
              color: "#333",
              fontFamily: "'MaruBuri', 'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: "50px"
            }}>
              <div style={{ marginBottom: "15px" }}>
                <div style={{ fontWeight: "600", marginBottom: "5px", textAlign: "center" }}>신부 김효영</div>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <span>기업은행 469-038025-01-018</span>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText("기업은행 469-038025-01-018");
                      alert("계좌번호가 복사되었습니다!");
                    }}
                    style={{
                      background: "none",
                      border: "1px solid #ddd",
                      borderRadius: "4px",
                      padding: "4px 6px",
                      cursor: "pointer",
                      fontSize: "10px",
                      color: "#666"
                    }}
                    title="복사하기"
                  >
                    복사
                  </button>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      )}

      {/* 캐릭터 이미지 */}
      <div style={{
        width: "100%",
        textAlign: "center",
        // marginTop: "0px",
        // marginBottom: "40px"
      }}>
        <img
          src="./wedding_character.jpg"
          alt="웨딩 캐릭터"
          style={{
            width: "60%",
            maxWidth: 600,
            minWidth: 375,
            height: "auto",
            borderRadius: 16,
            display: "block",
            margin: "0 auto"
          }}
        />
      </div>
      <div style={{
        width: "100%",
        textAlign: "center",
        marginTop: "-40px",
        marginBottom: "40px"
      }}>
        <img
          src="./hyb.png"
          alt="웨딩 캐릭터"
          style={{
             width: "60%",
             maxWidth: 200,
             height: "auto",
             borderRadius: 16,
             display: "block",
             margin: "0 auto"
           }}
        />
      </div>

      {/* BGM 오디오 */}
      <audio ref={audioRef} src="./bgm.mp3" autoPlay loop preload="auto" />
      {/* 오른쪽 상단 고정 음소거 버튼 */}
      <button
        className="bgm-mute-btn"
        onClick={() => setMuted((m) => !m)}
        aria-label={muted ? "음소거 해제" : "음소거"}
      >
        <img
          src={muted ? "./bgm-mute.png" : "./bgm.png"}
          alt={muted ? "음소거" : "소리"}
          style={{ width: 28, height: 28, objectFit: "contain" }}
        />
      </button>
    </div>
  );
}

// --- 달력 컴포넌트 ---
function Calendar202511() {
  // 2025년 11월: 1일은 토요일, 30일까지
  const days = ["일", "월", "화", "수", "목", "금", "토"];
  const dates = Array(30).fill(0).map((_, i) => i + 1);
  // 1일이 토요일이므로, 앞에 6칸 비움
  const blanks = Array(6).fill(null);
  const cells = [...blanks, ...dates];
  // 7일씩 나누기
  const weeks = [];
  for (let i = 0; i < cells.length; i += 7) {
    weeks.push(cells.slice(i, i + 7));
  }
  return (
    <div className="calendar-outer">
      <div className="calendar-title">2025년 11월</div>
      <table className="calendar-table">
        <thead>
          <tr>
            {days.map((d) => (
              <th key={d}>{d}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {weeks.map((week, i) => (
            <tr key={i}>
              {week.map((date, j) => {
                const isSunday = j === 0;
                const is29 = date === 29;
                let tdClass = "";
                if (is29) tdClass = "calendar-circle";
                else if (date) tdClass = "calendar-date";
                else tdClass = "calendar-blank";
                if ((is29 || tdClass === "calendar-date") && isSunday) tdClass += " sunday";
                return (
                  <td key={j} className={tdClass}>
                    {date || ""}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
