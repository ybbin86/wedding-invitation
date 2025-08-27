# Wedding Invitation

모바일 웨딩 초대장 웹사이트입니다.

## 기능

- 반응형 디자인 (모바일 최적화)
- 부드러운 fade 애니메이션
- 손글씨 타이틀 (Vara.js)
- 포토 갤러리 (Swiper)
- 배경음악 자동재생
- 네이버지도/티맵 연동

## 개발 실행

```bash
npm install
npm run dev
```

## 빌드

```bash
npm run build
```

## GitHub Pages 배포

### 1. 리포지토리 설정
1. GitHub에서 `wedding-invitation` 이름으로 리포지토리 생성
2. 코드 푸시

### 2. GitHub Pages 활성화
1. 리포지토리 → Settings → Pages
2. Source: "GitHub Actions" 선택

### 3. 자동 배포
- `main` 브랜치에 푸시하면 자동으로 배포됩니다
- 배포 URL: `https://USERNAME.github.io/wedding-invitation/`

### 4. 커스텀 도메인 (선택사항)
- Settings → Pages → Custom domain에서 도메인 설정 가능

## 리소스 파일

다음 파일들을 `public/` 폴더에 추가하세요:

- `IMG_0795.JPG` - 메인 사진
- `wedding_clippart.jpg` - 초대장 클립아트
- `wedding_clippart_middle.png` - 중간 클립아트
- `sketch_map.png` - 약도 이미지
- `naver_map.png` - 네이버지도 버튼 이미지
- `tmap.png` - 티맵 버튼 이미지
- `bgm.mp3` - 배경음악
- `bgm.png` - 음악 아이콘
- `bgm-mute.png` - 음소거 아이콘
- `gallery/` 폴더에 갤러리 이미지들

## 기술 스택

- React 19
- Vite
- Swiper
- Vara.js
