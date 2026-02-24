# 🚀 Project APEX-STUDIO — Claude Code 프롬프트 세트
> 홈페이지 앱 & 웹 에이전시 홍보용 | nofaildesign.com 레퍼런스 기반
> 각 Phase를 순서대로 Claude Code에 붙여넣어 실행하세요.

---

## ⚡ PHASE 1 — 프로젝트 셋업

```
Next.js 14 (App Router) 프로젝트를 새로 생성해줘.

프로젝트명: apex-studio
요구사항:
- Next.js 14 App Router
- TypeScript
- Tailwind CSS
- Framer Motion 설치
- Swiper.js 설치
- Google Fonts: Noto Sans KR (weights: 400, 700, 900)
- 기본 폴더 구조 생성:
  - app/page.tsx (메인 페이지)
  - app/layout.tsx (루트 레이아웃)
  - app/globals.css (전역 스타일)
  - components/layout/Navbar.tsx
  - components/layout/StickyBanner.tsx
  - components/sections/ (빈 폴더)
  - lib/constants.ts (색상, 텍스트 상수)

globals.css에 CSS 변수 정의:
  --color-bg: #000000
  --color-primary: #8B00FF
  --color-primary-light: #9933FF
  --color-accent: #CC44FF
  --color-text: #FFFFFF
  --color-text-sub: #CCCCCC

package.json scripts에 dev, build, start 포함.
모든 파일 생성 후 npm install 실행해줘.
```

---

## ⚡ PHASE 2 — 디자인 시스템 & 공통 컴포넌트

```
apex-studio 프로젝트에서 다음 공통 컴포넌트들을 만들어줘.

1. components/layout/Navbar.tsx
- 배경: 완전 투명 (스크롤 시 backdrop-blur + bg-black/60 전환)
- 왼쪽: 흰색 왕관 아이콘 SVG + "APEX STUDIO" 텍스트 (흰색, bold)
- 오른쪽: 햄버거 아이콘 (≡) 버튼
- 클릭 시 전체화면 오버레이 메뉴 (검정 배경, 흰색 메뉴항목)
- 메뉴 항목: 홈, 포트폴리오, 서비스, 제작후기, 문의하기
- position: fixed, z-index: 1000

2. components/layout/StickyBanner.tsx
- position: fixed, bottom: 0, z-index: 999
- 배경: 보라색 그라디언트 (#8B00FF → #6600CC)
- 왼쪽 텍스트: "내 사업에 맞춘" (줄바꿈) "홈페이지 전략, 솔루션 받기" (흰색, bold)
- 오른쪽: "신청하기" 버튼 (bg-purple-400, 흰색 텍스트, rounded-lg)
- 클릭 시 문의 섹션으로 스크롤 이동 (#contact)
- 모바일 대응 (px-4 py-3)

3. lib/constants.ts
- SITE_NAME: "APEX STUDIO"
- TAGLINE: "실패없는 디자인으로 매출을 만드는 에이전시"
- STATS: { projects: 50, maintenance: 20, satisfaction: 4.9 }
- NAV_ITEMS: 배열

4. app/layout.tsx
- Noto Sans KR 폰트 적용
- Navbar + StickyBanner 포함
- 검정 배경 기본 설정
- pb-20 (StickyBanner 공간 확보)
```

---

## ⚡ PHASE 3 — Hero 섹션

```
components/sections/HeroSection.tsx 를 만들어줘.

디자인 참고: 검정 배경에 그라디언트 세로 직사각형 이미지(보라/파랑/핑크) + 텍스트

구현 내용:
- 전체 높이: min-h-screen, 검정 배경
- 중앙 세로 직사각형: width 200px, height 400px
  - 배경: linear-gradient(135deg, #FF00FF, #8800FF, #0044FF, #FF6600)
  - border-radius: 4px
  - Framer Motion: 페이지 로드 시 fadeIn (opacity 0→1, y: 20→0, duration: 1s)
- 타이틀: "APEX STUDIO" (흰색, 52px, ExtraBold, 가운데 정렬)
- 서브타이틀: "실패없는 디자인으로 매출을 만드는 에이전시" (흰색, 20px, 가운데 정렬)
- Framer Motion: 타이틀과 서브타이틀 순차 등장 (staggerChildren)
- 하단 여백 pb-32 (StickyBanner 공간)
```

---

## ⚡ PHASE 4 — 실적 카드 + 고객 인터뷰 섹션

```
components/sections/StatsSection.tsx 를 만들어줘.

구현 내용:
1. 섹션 제목: "고객님들이 직접 들려주는 변화 이야기"
   - 흰색, 28px, bold, 가운데 정렬
   - Framer Motion fadeInUp (스크롤 진입 시)

2. YouTube 영상 임베드
   - 전체 너비, aspect-ratio: 16/9
   - YouTube IFrame (임시 placeholder: youtube.com/embed/dQw4w9WgXcQ)
   - 모서리 rounded-xl

3. 실적 카드 3개 (가로 배열, 모바일은 3열 grid)
   - 카드 배경: 흰색, 검정 텍스트, rounded-xl, padding
   - 카드 1: 레이블 "프로젝트", 숫자 "50+" (카운트업 애니메이션)
   - 카드 2: 레이블 "유지보수", 숫자 "20+" (카운트업 애니메이션)
   - 카드 3: 레이블 "고객 만족도", 숫자 "4.9" (카운트업 애니메이션)
   - 숫자: 32px, ExtraBold, 검정

4. 카운트업 훅: useCountUp(end: number, duration: 2000ms)
   - IntersectionObserver로 뷰포트 진입 시 1회 실행
```

---

## ⚡ PHASE 5 — Website Portfolio 슬라이더

```
components/sections/PortfolioSection.tsx 를 만들어줘.

구현 내용:
1. 섹션 타이틀: "WEBSITE PORTFOLIO"
   - 흰색, 48px, ExtraBold, 가운데 정렬 (영문 대문자)
   - Framer Motion fadeInUp

2. Swiper.js 슬라이더
   - 설치: npm install swiper
   - 한 번에 1개 슬라이드 표시
   - 좌우 화살표 내비게이션
   - 각 슬라이드 구조:
     - 상단: 웹사이트 스크린샷 이미지 (placeholder: picsum.photos/800/450)
     - 하단 오버레이: 카테고리 레이블 (보라 배경) + 사이트명 + 설명
   - 슬라이드 데이터 배열 (5개):
     { category: "브랜드 쇼핑몰", name: "APEX 뷰티", desc: "프리미엄 뷰티 브랜드 홈페이지" },
     { category: "기업 홈페이지", name: "KTI 시스템", desc: "IT 솔루션 기업 홈페이지" },
     { category: "음식점", name: "APEX 피자", desc: "프랜차이즈 피자 브랜드" },
     { category: "병원/클리닉", name: "스튜디오 연", desc: "뷰티 클리닉 홈페이지" },
     { category: "전문 서비스", name: "새벽 월", desc: "아웃도어 브랜드 홈페이지" }

3. "더보기" 버튼
   - 테두리 버튼 (border-white, 흰색 텍스트, rounded-none)
   - 가운데 정렬

4. "AI CONTENT PORTFOLIO" 타이틀 연결
   - 동일 섹션 하단에 추가
```

---

## ⚡ PHASE 6 — AI 콘텐츠 갤러리

```
components/sections/AiContentSection.tsx 를 만들어줘.

구현 내용:
1. 섹션 타이틀: "AI CONTENT PORTFOLIO"
   - 흰색, 48px, ExtraBold, 가운데 정렬

2. 2열 Masonry 그리드 갤러리
   - columns: 2
   - gap: 8px
   - 이미지 6개 (picsum.photos 랜덤 사용, 각각 다른 크기)
   - 이미지 호버 시: scale(1.02) 트랜지션
   - Framer Motion: 스크롤 진입 시 순차 fadeIn (staggerChildren 0.1s)

3. CSS columns 방식 또는 Masonry Grid 구현
```

---

## ⚡ PHASE 7 — 스크롤 스토리텔링 섹션 (핵심!)

```
components/sections/StorySection.tsx 를 만들어줘.

이 섹션은 스크롤할 때마다 새로운 메시지가 fadeInUp으로 등장하는 
스토리텔링 방식으로 구현해줘.

모든 섹션: 검정 배경, 흰색 텍스트, 가운데 정렬, min-height: 100vh
Framer Motion whileInView + viewport={{ once: true, amount: 0.4 }}

구현할 섹션들 (순서대로):

[S1] 홈페이지를 만들려는 이유
- 제목: "홈페이지를 만들려는 이유"
- 항목들 (순차 등장, stagger 0.3s):
  "안정적인 기업처럼 보이고 싶다"
  "거래처에게 신뢰를 주고 싶다"
  "많은 고객을 확보하고 싶다"
  "경쟁사보다 차별됐으면 좋겠다"
- 결론 (강조): "이 많은 이유들은 하나의 " + "꼭지점" (보라색) + "에서 시작됩니다"

[S2] 매출 공식
- 서브: "내 회사의 성장"
- 메인: "매출" (보라색, 64px, ExtraBold)
- 공식: "매출 = 유입 x " + "전환" (bold)
- 플로우: "노출 → 유입 → " + "전환" (bold)
- 설명: "홈페이지의 역할은" (줄바꿈) "광고 퍼널 중 " + "전환" (bold) + "에 속하죠"
- 경고: "많은 돈을 써서 유입량을 늘려도 홈페이지가 제 역할을 못한다면 " + "지속적인 손실" (bold) + "을 보게 됩니다."
- 전환: "즉, 홈페이지 제작은 소비가 아닌 " + "투자" (보라색) + "로 봐야합니다."

[S3] 고객 태도 분석
- 질문: "성공적인 투자가 될 홈페이지는" (줄바꿈) "어떻게 만들어져야할까요?"
- 서브: "아이러니 하게도 홈페이지에 방문한 " + "고객의 태도" (bold) + "입니다."
- 3가지 (각각 순차 등장, 64px, ExtraBold):
  "읽지 않는다."
  "믿지 않는다."
  "행동하지 않는다."
- 결론: "이 3가지를 해결해야지만 " + "전환이 잘되는 홈페이지" (bold) + "가 됩니다."

[S4] 첫번째 원칙
- 배지: 타원 테두리 버튼 "첫번째"
- 제목: "읽고 싶게 한다" (52px, ExtraBold)
- 설명1: "가장 많이 하는 실수는 " + "좋은 걸 다 보여주고 싶은 마음" (bold) + "에 홈페이지에 " + "너무 많은 정보" (bold) + "를 나열합니다."
- 설명2: "하지만 " + "정보 과잉" (bold) + "은 오히려 " + "가독성" (bold) + "과 " + "설득력" (bold) + "을 떨어뜨리게 됩니다."
- 설명3: "잘 읽게 만들려면 " + "불필요한 내용" (bold) + "을 " + "과감히 덜어내야" (bold) + " 합니다."

[S5] 두번째 원칙
- 배지: 타원 테두리 버튼 "두번째"
- 제목: "믿을 수 있게 한다" (52px, ExtraBold)
- 설명1: "고객은 직접 경험하기 전까지 눈앞에 보이는 " + "'겉모습'" (bold) + "과 " + "'증거'" (bold) + "로만 판단할 수밖에 없습니다."
- 설명2: "디자인 퀄리티가 낮고 근거 자료가 부족한 홈페이지는 " + "신뢰를 얻지 못합니다." (bold)
- 설명3: "고객이 믿게 하려면 브랜드와 어울리는 깔끔한 " + "디자인" (bold) + "과 실제 후기와 사례, 인증서나 현장 사진과 같은 " + "근거가 더해져야 설득력" (bold) + "이 완성됩니다."

[S6] 세번째 원칙
- 배지: 타원 테두리 버튼 "세번째"
- 제목: "행동하게 한다" (52px, ExtraBold)
- 설명1: "좋은 글과 좋은 디자인만으로 고객은 알아서 " + "신청하지 않습니다." (bold)
- 설명2: "신청하는 선택 자체가 부담이 되기 때문에 미루려고 하죠. 행동으로 이어지지 않으면 " + "전환은 일어나지 않습니다." (bold)
- 설명3: "고객이 행동하게 하려면 CTA버튼은 눈 띄는 곳마다 넣어 " + "신청을 쉽게" (bold) + " 만들고 " + "놓치기 싫은 심리" (bold) + "를 자극하고 " + "실패에 대한 두려움" (bold) + "을 줄여줘야합니다."
```

---

## ⚡ PHASE 8 — 문의 폼 섹션

```
components/sections/ContactSection.tsx 를 만들어줘.

id="contact" 설정 필수 (StickyBanner 클릭 시 이동 대상)

구현 내용:
1. 섹션 제목: "내 사업에 맞춘 홈페이지 전략을 받아보세요"
   - 흰색, 28px, bold, 가운데 정렬

2. 문의 폼 (검정 배경, 보라 테두리 카드)
   - 이름 (input)
   - 연락처 (input, type="tel")
   - 업종/사업 분야 (input)
   - 문의 내용 (textarea, 4줄)
   - 제출 버튼: "무료 상담 신청하기" (보라 배경, 흰색 텍스트, 전체 너비)

3. React Hook Form 사용 (npm install react-hook-form)
   - 필수값 validation
   - 에러 메시지 표시 (빨간 텍스트)

4. 제출 시: alert("신청이 완료되었습니다. 빠른 시일 내 연락드리겠습니다.")

5. 하단 정보:
   - 카카오톡 채널: "@apex-studio"
   - 이메일: "contact@apex-studio.kr"
   - 흰색 텍스트, 가운데 정렬
```

---

## ⚡ PHASE 9 — 메인 페이지 조립

```
app/page.tsx 에 모든 섹션을 조립해줘.

import 순서:
1. HeroSection
2. StatsSection
3. PortfolioSection
4. AiContentSection
5. StorySection (S1~S6 모두)
6. ContactSection

각 섹션 사이에 적절한 간격 없음 (섹션이 자체 padding 가짐)
전체 배경: bg-black
```

---

## ⚡ PHASE 10 — SEO & 배포 설정

```
SEO와 배포 설정을 해줘.

1. app/layout.tsx에 메타데이터 추가:
   title: "APEX STUDIO | 실패없는 홈페이지 제작 에이전시"
   description: "고객이 읽고, 믿고, 행동하는 홈페이지를 만듭니다. AI 콘텐츠와 기획력으로 매출을 만드는 웹 에이전시"
   keywords: "홈페이지 제작, 웹 에이전시, 앱 제작, 브랜드 홈페이지, AI 콘텐츠"
   og:image: "/og-image.png" (1200x630)
   og:type: "website"

2. next.config.js:
   - 이미지 도메인 허용: picsum.photos, youtube.com
   - output: 'standalone' 추가

3. public/ 폴더에 다음 파일 생성 안내:
   - favicon.ico (512x512 보라색 A 로고)
   - og-image.png (1200x630 사이트 대표 이미지)
   - robots.txt
   - sitemap.xml

4. vercel.json 생성:
   {
     "buildCommand": "npm run build",
     "outputDirectory": ".next",
     "framework": "nextjs"
   }

5. .env.local.example 생성:
   NEXT_PUBLIC_SITE_URL=https://apex-studio.kr
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

6. README.md 작성:
   - 프로젝트 소개
   - 설치 방법
   - 배포 방법 (Vercel)
   - 환경변수 설명
```

---

## 📌 전체 실행 순서 요약

| Phase | 작업 | 예상 시간 |
|-------|------|-----------|
| 1 | 프로젝트 셋업 | 10분 |
| 2 | 공통 컴포넌트 | 20분 |
| 3 | Hero 섹션 | 15분 |
| 4 | 실적 + 인터뷰 | 20분 |
| 5 | 포트폴리오 슬라이더 | 25분 |
| 6 | AI 콘텐츠 갤러리 | 15분 |
| 7 | 스크롤 스토리텔링 | 30분 |
| 8 | 문의 폼 | 15분 |
| 9 | 페이지 조립 | 10분 |
| 10 | SEO & 배포 | 15분 |
| **합계** | | **약 2.5시간** |

## 💡 Claude Code 사용 팁
- 각 Phase 프롬프트를 순서대로 실행하세요
- 오류 발생 시 "위 오류를 수정해줘" 입력
- 디자인 수정 시 "XX 섹션의 YY를 ZZ로 변경해줘" 형식으로 요청
- 전체 완료 후 `npm run dev`로 로컬 확인 → Vercel 배포
