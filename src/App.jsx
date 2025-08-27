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
    if (!varaRef.current) return;
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
  }, [scrollDirection]);

  useEffect(() => {
    function drawVara() {
      const container = document.getElementById("vara-container");
      if (container) container.innerHTML = "";
      const width = varaRef.current
        ? varaRef.current.offsetWidth
        : 320; // 기본값
      new window.Vara(
        "#vara-container",
        "https://raw.githubusercontent.com/akzhy/Vara/master/fonts/Parisienne/Parisienne.json",
        [
          {
            text: "Wedding Invitation",
            fontSize: Math.max(32, width / 10),
            strokeWidth: 2,
            color: "#062ddd",
            y: 50,
            x: 10,
            duration: 4000,
          },
        ],
        {
          width: width,
          height: 110,
          textAlign: "center",
        }
      );
    }
    drawVara();
    window.addEventListener("resize", drawVara);
    return () => window.removeEventListener("resize", drawVara);
  }, []);

  // 초대 문구 Intersection Observer (fadeinup/fadeoutdown)
  useEffect(() => {
    if (!inviteRef.current) return;
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
  }, [scrollDirection]);

  // ceremony+calendar fade 애니메이션
  useEffect(() => {
    if (!ceremonyRef.current) return;
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
  }, [scrollDirection]);

  // 갤러리 fade 애니메이션
  useEffect(() => {
    if (!galleryRef.current) return;
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
  }, [scrollDirection]);

  // 약도 섹션 fade 애니메이션
  useEffect(() => {
    if (!mapSectionRef.current) return;
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
  }, [scrollDirection]);

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

  return (
    <div className="container-html">
      <div
        id="vara-container"
        className="handwriting-title-html"
        ref={varaRef}
        style={{ width: "95vw", maxWidth: 600, minWidth: 200 }}
      ></div>
      <div className="photo-card-html">
        <img src="./IMG_0795.JPG" alt="배경사진" />
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
            <div className="ceremony-place">서울 송파구 문정 루이비스 컨벤션</div>
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
        <div style={{
          fontSize: "1.6rem",
          fontWeight: 700,
          color: "#554c44",
          marginBottom: "10px",
          fontFamily: "'MaruBuri', 'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif",
          letterSpacing: "0.01em"
        }}>
          오시는 길
        </div>
        {/* <div style={{
          width: "80%",
          maxWidth: "500px",
          height: "1px",
          backgroundColor: "#ddd",
          margin: "20px auto 10px auto"
        }}></div> */}
        <div style={{
          display: "flex",
          justifyContent: "center",
          gap: "30px",
          // marginBottom: "20px",
          flexWrap: "wrap"
        }}>
          <div style={{
            fontSize: "0.88rem",
            fontWeight: "600", 
            color: "#554c44",
            fontFamily: "'MaruBuri', 'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif",
            marginTop: "14px"
          }}>
            <span>
              Navigation
            </span>
          </div>
          <div
            onClick={(e) => {
              window.open('https://naver.me/Gctrli34', '_blank');
              // 클릭 후 호버 상태 리셋
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "none";
              e.target.blur(); // 포커스 제거
            }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              cursor: "pointer",
              padding: "8px 12px",
              borderRadius: "8px",
              transition: "all 0.2s ease",
              // boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow = "0 4px 12px rgba(0,0,0,0.2)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "none";
            }}
          >
            <span style={{
              fontSize: "0.88rem",
              fontWeight: "600",
              color: "#333",
              fontFamily: "'MaruBuri', 'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif"
            }}>
              네이버지도
            </span>
            <img
              src="./naver_map.png"
              alt="네이버지도"
              style={{
                height: "40px",
                borderRadius: "6px"
              }}
            />
          </div>
          
          <div
            onClick={(e) => {
              window.open('https://tmap.life/92aad9a9', '_blank');
              // 클릭 후 호버 상태 리셋
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "none";
              e.target.blur(); // 포커스 제거
            }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              cursor: "pointer",
              padding: "8px 12px",
              borderRadius: "8px",
              transition: "all 0.2s ease",
              // boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow = "0 4px 12px rgba(0,0,0,0.2)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "none";
            }}
          >
            <span style={{
              fontSize: "0.88rem",
              fontWeight: "600",
              color: "#333",
              fontFamily: "'MaruBuri', 'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif"
            }}>
              티맵
            </span>
            <img
              src="./tmap.png"
              alt="티맵"
              style={{
                height: "35px",
                borderRadius: "6px"
              }}
            />
          </div>
        </div>
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
