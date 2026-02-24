**PROJECT APEX-STUDIO**

**기술 사양 정의서**

Technical Specification Document (TSD)

| 프로젝트명 | APEX STUDIO 홈페이지 구축 |
| :---- | :---- |
| **문서 유형** | 기술 사양 정의서 (TSD) |
| **문서 버전** | v1.0 |
| **작성일** | 2026년 2월 24일 |
| **작성자** | 이준곤 (Mark) — APEX STUDIO 대표 |
| **개발 환경** | MacBook Pro M4 Max 16" / macOS |
| **참조 SRS** | 01\_requirements.docx v1.0 |

# **1\. 기술 스택 (Tech Stack)**

## **1.1 선택 기준**

* Mark(이준곤)의 PHP/Python 전문성과 Next.js 학습 로드맵 부합

* Claude Code와의 호환성 및 코드 생성 품질 최적화

* Vercel 배포 연동의 용이성 (Next.js 공식 플랫폼)

* SEO 성능: Next.js SSG/SSR의 검색엔진 최적화 우위

## **1.2 기술 스택 전체 구성도**

| 레이어 | 기술 | 버전 | 역할 |
| ----- | ----- | ----- | ----- |
| Frontend Framework | Next.js (App Router) | 14.x | SSG 기반 정적 사이트 |
| 언어 | TypeScript | 5.x | 타입 안전성 |
| 스타일링 | Tailwind CSS | 3.x | 유틸리티 CSS |
| 애니메이션 | Framer Motion | 11.x | 스크롤 애니메이션 |
| 슬라이더 | Swiper.js | 11.x | 포트폴리오 슬라이더 |
| 폼 관리 | React Hook Form | 7.x | 폼 유효성 검사 |
| 이메일 | EmailJS | 4.x | 서버리스 이메일 발송 |
| 폰트 | Noto Sans KR | Google Fonts | 한글 최적화 폰트 |
| 아이콘 | Lucide React | 0.x | SVG 아이콘 세트 |
| 배포 플랫폼 | Vercel | 최신 | Edge CDN \+ CI/CD |
| 도메인 | apex-studio.kr | 가비아 등록 | 커스텀 도메인 |
| 분석 | Google Analytics 4 | 최신 | 방문자 분석 |
| 개발 보조 | Claude Code (Anthropic) | 최신 | AI 코드 생성 |

## **1.3 대안 기술 스택 (PHP/Python 선호 시)**

| 구분 | 대안 A (PHP 기반) | 대안 B (Python 기반) |
| ----- | ----- | ----- |
| Frontend | HTML \+ CSS \+ Vanilla JS | HTML \+ CSS \+ Vanilla JS |
| Backend | PHP 8.3 (선택) | FastAPI (선택) |
| CMS | WordPress \+ Elementor | Wagtail CMS |
| 배포 | AWS EC2 / Lightsail | AWS EC2 / Render.com |
| 장점 | Mark의 PHP 강점 활용 | Python 학습 목표 부합 |
| 단점 | 성능 최적화 수동 필요 | 초기 설정 복잡도 높음 |

※ 본 문서는 Next.js 기반 최우선 구현을 기준으로 작성. PHP/Python 전환 시 별도 TSD 작성 필요.

# **2\. 시스템 아키텍처**

## **2.1 전체 구성도 (텍스트 표현)**

| \[ 사용자 브라우저 \] 모바일(375px+) / 태블릿(768px+) / 데스크탑(1200px+) ↓  HTTPS (SSL/TLS) \[ Vercel Edge Network (CDN) \] 전세계 Edge Location 자동 캐싱 / HTTPS 자동 갱신 ↓  정적 파일 서빙 \[ Next.js 14 App (SSG) \] 빌드타임에 HTML 사전 생성 → 서버 불필요 ↓  외부 연동 \[ EmailJS API \]  \[ Google Analytics 4 \]  \[ YouTube Embed \] |
| :---: |

## **2.2 디렉토리 구조**

apex-studio/

├── app/

│   ├── layout.tsx          \# 루트 레이아웃 (Navbar, StickyBanner, GA4)

│   ├── page.tsx            \# 메인 페이지 (섹션 조립)

│   ├── globals.css         \# 전역 CSS 변수 및 기본 스타일

│   └── api/                \# API Routes (이메일 발송 엔드포인트)

│       └── contact/

│           └── route.ts    \# POST /api/contact

├── components/

│   ├── layout/

│   │   ├── Navbar.tsx

│   │   └── StickyBanner.tsx

│   └── sections/

│       ├── HeroSection.tsx

│       ├── StatsSection.tsx

│       ├── PortfolioSection.tsx

│       ├── AiContentSection.tsx

│       ├── StorySection.tsx      \# 스토리텔링 6개 서브섹션 포함

│       └── ContactSection.tsx

├── lib/

│   ├── constants.ts        \# 사이트 데이터 (통계, 포트폴리오, 원칙 텍스트)

│   └── analytics.ts        \# GA4 이벤트 트래킹 유틸

├── hooks/

│   └── useCountUp.ts       \# 카운트업 애니메이션 커스텀 훅

├── public/

│   ├── favicon.ico

│   ├── og-image.png        \# 1200x630 OG 이미지

│   ├── robots.txt

│   └── images/             \# 포트폴리오 스크린샷

├── .env.local              \# 환경변수 (GA4 ID, EmailJS Key)

├── next.config.js

├── tailwind.config.ts

├── tsconfig.json

├── CLAUDE.md               \# Claude Code 작업 지침

└── package.json

# **3\. 컴포넌트 상세 사양**

## **3.1 레이아웃 컴포넌트**

**3.1.1 Navbar.tsx**

| 파일 경로 | components/layout/Navbar.tsx |
| :---- | :---- |
| **포지션** | position: fixed, top: 0, z-index: 1000 |
| **초기 상태** | 완전 투명 (background: transparent) |
| **스크롤 후** | backdrop-filter: blur(12px), background: rgba(0,0,0,0.75) |
| **로고** | SVG 아이콘 \+ 'APEX STUDIO' 텍스트 (좌측) |
| **메뉴 버튼** | 햄버거 아이콘 (우측), 클릭 시 오버레이 메뉴 open |
| **상태 관리** | useState: isMenuOpen, isScrolled |
| **이벤트** | window.addEventListener('scroll', handleScroll) |

**3.1.2 StickyBanner.tsx**

| 파일 경로 | components/layout/StickyBanner.tsx |
| :---- | :---- |
| **포지션** | position: fixed, bottom: 0, z-index: 999 |
| **배경** | linear-gradient(90deg, \#6600CC, \#8B00FF) |
| **레이아웃** | flex row: 텍스트(좌) \+ 버튼(우) |
| **버튼 동작** | onClick: document.getElementById('contact').scrollIntoView() |
| **패딩** | padding: 14px 20px (모바일 최적화) |

## **3.2 섹션 컴포넌트**

**3.2.1 HeroSection.tsx**

| 높이 | min-height: 100vh |
| :---- | :---- |
| **배경** | \#000000 (Pure Black) |
| **레이아웃** | flex-column, center align |
| **그라디언트 바** | width: 180px, height: 380px, border-radius: 6px |
| **그라디언트** | linear-gradient(160deg, \#FF00FF, \#8800FF, \#0044FF, \#FF6600) |
| **Framer Motion** | initial: {opacity:0, y:30}, animate: {opacity:1, y:0}, duration: 1s |
| **타이틀 폰트** | clamp(36px, 8vw, 58px), font-weight: 900 |

**3.2.2 StatsSection.tsx**

| YouTube 영상 | aspect-ratio: 16/9, border-radius: 12px, lazy load |
| :---- | :---- |
| **카드 레이아웃** | grid-template-columns: repeat(3, 1fr), gap: 12px |
| **카드 스타일** | background: \#fff, color: \#000, border-radius: 12px |
| **카운트 데이터** | 프로젝트: 50+, 유지보수: 20+, 만족도: 4.9 |
| **카운트업 훅** | useCountUp(end, duration=2000): IntersectionObserver 트리거 |

**3.2.3 PortfolioSection.tsx**

| 슬라이더 라이브러리 | Swiper.js v11 또는 Custom CSS Slider |
| :---- | :---- |
| **슬라이드 수** | 최소 5개 (추후 추가 가능) |
| **전환 효과** | CSS transform: translateX, transition: 0.4s ease |
| **네비게이션** | prev/next 버튼 \+ 터치 스와이프 |
| **오버레이** | gradient \+ 카테고리배지(보라) \+ 사이트명 \+ 설명 |
| **이미지 크기** | 800x450px (16:9), object-fit: cover |

**3.2.4 StorySection.tsx (스크롤 스토리텔링)**

| 서브섹션 수 | 6개 (이유→매출→태도→원칙1→원칙2→원칙3) |
| :---- | :---- |
| **각 섹션 높이** | min-height: 100vh |
| **Framer Motion** | whileInView \+ viewport={{ once: true, amount: 0.4 }} |
| **stagger** | staggerChildren: 0.3s (자식 요소 순차 등장) |
| **강조 텍스트** | font-weight: 900, color: var(--accent) \#CC44FF |
| **배지 스타일** | border: 2px solid white, border-radius: 9999px, padding: 6px 20px |
| **배경 오버레이** | 절대 위치 이미지 그리드 \+ opacity: 0.2 |

**3.2.5 ContactSection.tsx**

| 앵커 ID | id='contact' (StickyBanner 클릭 대상) |
| :---- | :---- |
| **폼 라이브러리** | React Hook Form v7 |
| **입력 필드** | 이름(text), 연락처(tel), 업종(text), 내용(textarea) |
| **유효성 검사** | required: true, pattern: 한국 전화번호 정규식 |
| **제출 처리** | EmailJS sendForm() 또는 /api/contact POST |
| **성공 처리** | 상태 메시지 표시 (toast 또는 inline) |
| **카드 테두리** | border: 1px solid rgba(139,0,255,0.4) |

# **4\. 디자인 시스템**

## **4.1 컬러 팔레트**

| 변수명 | HEX 코드 | 용도 | 비고 |
| ----- | ----- | ----- | ----- |
| \--color-bg | \#000000 | 전체 배경색 | Pure Black |
| \--color-primary | \#8B00FF | Primary (보라) | CTA, 포인트 |
| \--color-primary-light | \#9933FF | Hover 상태 | 버튼 hover |
| \--color-primary-dark | \#6600CC | Active 상태 | 버튼 active |
| \--color-accent | \#CC44FF | 강조 텍스트 | 핵심 단어 |
| \--color-text | \#FFFFFF | 기본 텍스트 | 흰색 |
| \--color-text-sub | \#CCCCCC | 보조 텍스트 | 설명문 |

## **4.2 타이포그래피**

| 분류 | 폰트 | 크기/Weight | 용도 |
| ----- | ----- | ----- | ----- |
| 한글 기본체 | Noto Sans KR | 400 / 22px | 본문 텍스트 |
| 한글 굵은체 | Noto Sans KR Bold | 700 / 22-28px | 소제목, 강조 |
| 한글 초굵은체 | Noto Sans KR Black | 900 / 36-64px | 스토리 큰 텍스트 |
| 영문 타이틀 | Noto Sans KR / Arial Black | 900 / 36-56px | 섹션 타이틀 대문자 |
| 반응형 폰트 | clamp() 함수 | 최소\~최대 범위 | 화면 크기별 자동조절 |

## **4.3 간격 체계 (Spacing)**

| Tailwind 클래스 | 픽셀 값 | 사용 위치 |
| ----- | ----- | ----- |
| p-4 | 16px | 모바일 기본 패딩 |
| p-6 | 24px | 섹션 좌우 패딩 |
| py-20 | 80px | 섹션 상하 패딩 (기본) |
| gap-3 | 12px | 카드 그리드 간격 |
| gap-2 | 8px | 마소느리 그리드 간격 |
| mb-8 | 32px | 섹션 내 타이틀 하단 여백 |
| pb-20 | 80px | body 하단 (StickyBanner 공간) |

## **4.4 애니메이션 사양**

| 애니메이션명 | Framer Motion 설정 | 적용 위치 |
| ----- | ----- | ----- |
| fadeSlideUp (진입) | opacity:0→1, y:30→0, duration:1s | Hero 섹션 최초 로드 |
| revealOnScroll | whileInView, once:true, amount:0.15 | 모든 섹션 요소 |
| staggerChildren | staggerChildren: 0.3s | 리스트 항목 순차 등장 |
| countUp | requestAnimationFrame, easeOut cubic | 실적 숫자 카드 |
| imageHover | scale: 1→1.03, transition: 0.3s | AI 갤러리 이미지 |
| navBlur | scroll event, className toggle | 네비게이션 스크롤 |

# **5\. API 및 외부 서비스 연동**

## **5.1 EmailJS 연동 (문의 폼)**

| 서비스 | EmailJS (emailjs.com) |
| :---- | :---- |
| **플랜** | 무료 플랜 (월 200건) |
| **환경변수** | NEXT\_PUBLIC\_EMAILJS\_SERVICE\_ID, TEMPLATE\_ID, PUBLIC\_KEY |
| **발송 방식** | emailjs.sendForm(serviceId, templateId, formRef, publicKey) |
| **수신 이메일** | contact@apex-studio.kr |
| **폼 필드 매핑** | from\_name, from\_phone, from\_business, message |

// 사용 예시

import emailjs from '@emailjs/browser';

const result \= await emailjs.sendForm(

  process.env.NEXT\_PUBLIC\_EMAILJS\_SERVICE\_ID,

  process.env.NEXT\_PUBLIC\_EMAILJS\_TEMPLATE\_ID,

  formRef.current,

  process.env.NEXT\_PUBLIC\_EMAILJS\_PUBLIC\_KEY

);

## **5.2 Google Analytics 4**

| 설치 방법 | next/script \+ @next/third-parties/google |
| :---- | :---- |
| **환경변수** | NEXT\_PUBLIC\_GA\_ID=G-XXXXXXXXXX |
| **추적 이벤트** | page\_view (자동), contact\_submit, portfolio\_view, cta\_click |
| **설정 위치** | app/layout.tsx (GoogleAnalytics 컴포넌트) |

## **5.3 Vercel 배포 설정**

| 빌드 명령 | npm run build |
| :---- | :---- |
| **출력 디렉토리** | .next (Next.js 자동 감지) |
| **Node.js 버전** | 20.x |
| **환경변수 설정** | Vercel Dashboard → Settings → Environment Variables |
| **자동 배포** | GitHub main 브랜치 push 시 자동 빌드/배포 |
| **커스텀 도메인** | apex-studio.kr → A 레코드 76.76.21.21 |
| **SSL** | Let's Encrypt 자동 발급 (무료) |
| **Edge Network** | 전세계 CDN 자동 적용 |

# **6\. 성능 최적화 전략**

## **6.1 이미지 최적화**

* Next.js next/image 컴포넌트 사용 (자동 WebP 변환)

* 모든 이미지 loading='lazy' 적용

* priority={true}: Hero 섹션 그라디언트 바 (LCP 대상)

* 이미지 sizes 속성 설정으로 반응형 최적화

* 포트폴리오 이미지: 800x450px, WebP 포맷, \< 150KB 목표

## **6.2 번들 최적화**

* Next.js App Router 기반 자동 코드 분할

* Dynamic import: 슬라이더, Framer Motion 지연 로딩

* Tailwind CSS purge: 사용하지 않는 CSS 자동 제거

* Google Fonts: display=swap, preconnect 설정

## **6.3 Core Web Vitals 목표**

| 지표 | 현재 목표 | 측정 도구 | 측정 주기 |
| ----- | ----- | ----- | ----- |
| LCP (최대 콘텐츠 페인트) | \< 2.5초 | PageSpeed Insights | 배포 시 매회 |
| CLS (누적 레이아웃 이동) | \< 0.1 | Chrome DevTools | 배포 시 매회 |
| INP (입력 지연) | \< 200ms | PageSpeed Insights | 배포 시 매회 |
| TTFB (첫 바이트 응답) | \< 600ms | WebPageTest | 월 1회 |

# **7\. 보안 사양**

## **7.1 환경변수 관리**

* 민감 정보는 반드시 .env.local에 저장 (Git 제외)

* Vercel 환경변수 패널에 별도 설정

* 클라이언트 노출 변수: NEXT\_PUBLIC\_ 접두사 사용

* 서버 전용 변수: NEXT\_PUBLIC\_ 접두사 미사용

\# .env.local 예시

NEXT\_PUBLIC\_GA\_ID=G-XXXXXXXXXX

NEXT\_PUBLIC\_EMAILJS\_SERVICE\_ID=service\_xxxxxxxx

NEXT\_PUBLIC\_EMAILJS\_TEMPLATE\_ID=template\_xxxxxxxx

NEXT\_PUBLIC\_EMAILJS\_PUBLIC\_KEY=xxxxxxxxxxxxxxxx

NEXT\_PUBLIC\_SITE\_URL=https://apex-studio.kr

## **7.2 개인정보 처리 방침**

* 수집 항목: 이름, 연락처(전화번호), 업종/사업분야, 문의내용

* 수집 목적: 홈페이지 제작 상담 및 견적 안내

* 보유 기간: 상담 완료 후 1년

* 개인정보처리방침 페이지 하단 링크 제공 필수

* 쿠키: GA4 분석용 쿠키만 사용 (동의 배너 선택 구현)

## **7.3 XSS 방지**

* React의 기본 JSX Escaping 활용

* dangerouslySetInnerHTML 사용 금지

* 입력값 서버 전송 전 trim() 및 길이 제한 검사

* Content Security Policy (CSP) 헤더 설정 (Vercel headers 설정)

# **8\. 테스트 계획**

## **8.1 단위 테스트**

| 테스트 대상 | 테스트 내용 | 도구 |
| ----- | ----- | ----- |
| useCountUp 훅 | 0에서 목표값까지 카운트업 정상 동작 | Jest / Vitest |
| ContactSection 폼 | 필수값 미입력 시 에러 메시지 표시 | React Testing Library |
| 슬라이더 네비게이션 | prev/next 클릭 시 슬라이드 전환 | 수동 테스트 |
| StickyBanner CTA | 클릭 시 contact 섹션으로 스크롤 이동 | 수동 테스트 |

## **8.2 반응형 테스트**

| 디바이스 | 해상도 | 브라우저 | 체크 항목 |
| ----- | ----- | ----- | ----- |
| iPhone 14 | 390x844 | Safari iOS | 전체 섹션 레이아웃 |
| Galaxy S23 | 360x800 | Chrome Android | 슬라이더 스와이프 |
| iPad Pro 11" | 834x1194 | Safari | 태블릿 2열 레이아웃 |
| MacBook Pro 14" | 1512x982 | Chrome | 데스크탑 전체 |
| Windows PC | 1920x1080 | Edge / Firefox | 크로스브라우저 |

## **8.3 성능 테스트**

* Google PageSpeed Insights: 모바일 70+, 데스크탑 90+ 목표

* Vercel Analytics: TTFB, LCP 실사용 데이터 모니터링

* GTmetrix: 전체 로드 시간 3초 이내

*문서 버전: v1.0 | 작성일: 2026년 2월 24일 | Project APEX-STUDIO*