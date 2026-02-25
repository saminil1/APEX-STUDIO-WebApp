
**\# APEX-STUDIO**

**CLAUDE.md**  
Claude Code 작업 지침서

**이 파일을 \~/projects/apex-studio/CLAUDE.md 에 저장하세요**

| 프로젝트명 | Project APEX-STUDIO |
| :---- | :---- |
| **목적** | 웹&앱 에이전시 홍보 홈페이지 |
| **레퍼런스** | nofaildesign.com |
| **작성일** | 2026년 2월 24일 |
| **위치** | \~/projects/apex-studio/CLAUDE.md |

# **🎯 프로젝트 정체성**

| 프로젝트명 | Project APEX-STUDIO |
| :---- | :---- |
| **목적** | APEX STUDIO 웹&앱 에이전시 홍보 홈페이지 |
| **레퍼런스** | nofaildesign.com (동일 디자인/UX/레이아웃) |
| **브랜드 슬로건** | 실패없는 디자인으로 매출을 만드는 에이전시 |
| **PO** | 이준곤 (Mark) |
| **개발 언어** | 한국어 (모든 커뮤니케이션) |

# **🛠️ 기술 스택 (변경 금지)**

| 분류 | 기술 | 비고 |
| ----- | ----- | ----- |
| Frontend | Next.js 14 App Router \+ TypeScript | SSG 기반 |
| Styling | Tailwind CSS v3 | utility-first, NO CSS-in-JS |
| Animation | Framer Motion v11 | 스크롤 애니메이션 |
| Slider | Swiper.js v11 | 또는 Custom CSS Slider |
| Form | React Hook Form v7 | 유효성 검사 |
| Email | EmailJS v4 | 서버리스 이메일 |
| Font | Noto Sans KR (400/700/900) | Google Fonts |
| Deploy | Vercel | apex-studio.kr 도메인 |
| Analytics | Google Analytics 4 | 방문자 분석 |
| Dev Tool | Claude Code (Anthropic) | AI 코드 생성 |

# **🎨 디자인 시스템 (절대 변경 금지)**

## **CSS 변수**

\--color-bg:            \#000000   /\* 전체 배경 — Pure Black \*/

\--color-primary:       \#8B00FF   /\* Primary Purple — CTA, 강조 \*/

\--color-primary-light: \#9933FF   /\* Hover 상태 \*/

\--color-primary-dark:  \#6600CC   /\* Active 상태, 그라디언트 시작 \*/

\--color-accent:        \#CC44FF   /\* 강조 텍스트 (보라/핑크) \*/

\--color-text:          \#FFFFFF   /\* 기본 텍스트 \*/

\--color-text-sub:      \#CCCCCC   /\* 보조 텍스트, 설명문 \*/

## **타이포그래피**

| 분류 | 폰트/크기 | 용도 |
| ----- | ----- | ----- |
| 기본 본문 | Noto Sans KR 400 / 22px | 일반 텍스트 |
| 소제목 | Noto Sans KR 700 / 26px | 섹션 내 제목 |
| 스토리 대형 | Noto Sans KR 900 / clamp(36px,8vw,56px) | 임팩트 문구 |
| 섹션 타이틀 | 900 / clamp(36px,8vw,56px) / LS:3px | PORTFOLIO 등 |

## **Hero 섹션 그라디언트 바**

background: linear-gradient(160deg, \#FF00FF 0%, \#8800FF 40%, \#0044FF 75%, \#FF6600 100%);

width: 180px; height: 380px; border-radius: 6px;

# **📋 15개 섹션 구성 (순서 엄수)**

| \# | 섹션명 | 핵심 요소 | 특이사항 |
| ----- | ----- | ----- | ----- |
| S01 | Hero | 그라디언트바 \+ APEX STUDIO 타이틀 | fadeSlideUp |
| S02 | 실적 & 인터뷰 | YouTube \+ 카드 3개 (50+/20+/4.9) | 카운트업 |
| S03 | 웹사이트 포트폴리오 | Swiper 슬라이더 5개 | 터치 스와이프 |
| S04 | AI 콘텐츠 갤러리 | Masonry 2열 6개 이미지 | hover scale |
| S05 | 홈페이지를 만드는 이유 | 4가지 이유 → 꼭지점 결론 | stagger |
| S06 | 매출 공식 | 매출=유입×전환, 투자 관점 | 순차 등장 |
| S07 | 포트폴리오 배경 | 이미지 배경 \+ 질문 텍스트 | opacity 0.2 |
| S08 | 고객 태도 | 읽지않는다/믿지않는다/행동하지않는다 | 900 대형폰트 |
| S09 | 첫번째 원칙 | '읽고 싶게 한다' \+ 설명 | badge |
| S10 | 두번째 원칙 | '믿을 수 있게 한다' \+ 설명 | badge |
| S11 | 세번째 원칙 | '행동하게 한다' \+ 설명 | badge |
| S12 | 마무리 | 40년 경험, 전문성 어필 | 신뢰 구축 |
| S13 | 문의 폼 | id='contact', 4필드 \+ 이메일 | React Hook Form |
| S14 | 연락처 | 카카오 채널, 이메일 |  |
| S15 | Footer | 저작권 |  |

# **⚡ 핵심 코드 패턴**

## **1\. Navbar 스크롤 감지**

const \[scrolled, setScrolled\] \= useState(false);

useEffect(() \=\> {

  const handler \= () \=\> setScrolled(window.scrollY \> 50);

  window.addEventListener('scroll', handler);

  return () \=\> window.removeEventListener('scroll', handler);

}, \[\]);

## **2\. 스크롤 애니메이션 (표준 패턴)**

const fadeUp \= {

  hidden: { opacity: 0, y: 40 },

  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } }

};

const container \= {

  hidden: {},

  visible: { transition: { staggerChildren: 0.3 } }

};

// 사용: whileInView='visible' viewport={{ once: true, amount: 0.15 }}

## **3\. StickyBanner CTA 버튼**

onClick={() \=\> document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}

## **4\. 배지 컴포넌트**

\<span className="border-2 border-white text-white text-sm font-bold

             px-5 py-1.5 rounded-full tracking-widest"\>

  첫번째

\</span\>

# **🌐 환경변수 (.env.local)**

NEXT\_PUBLIC\_GA\_ID=G-XXXXXXXXXX

NEXT\_PUBLIC\_EMAILJS\_SERVICE\_ID=service\_xxxxxxxx

NEXT\_PUBLIC\_EMAILJS\_TEMPLATE\_ID=template\_xxxxxxxx

NEXT\_PUBLIC\_EMAILJS\_PUBLIC\_KEY=xxxxxxxxxxxxxxxx

NEXT\_PUBLIC\_SITE\_URL=https://apex-studio.kr

# **📦 주요 npm 명령**

npm run dev          \# 로컬 서버 (localhost:3000)

npm run build        \# 프로덕션 빌드

npm run start        \# 빌드 결과 실행

npm run lint         \# ESLint 검사

npx tsc \--noEmit     \# TypeScript 타입 체크만

# **🛑 절대 하지 말 것 (Anti-Patterns)**

* 인라인 style={{ ... }} 남용 — Tailwind 클래스 사용

* CSS 색상 하드코딩 — var(--color-\*) 사용

* 직접 setTimeout으로 애니메이션 — Framer Motion 사용

* \<img\> 태그 직접 사용 — next/image 사용

* window 직접 접근 (SSR 오류) — useEffect 내에서만

* any 타입 사용 (TypeScript strict)

* dangerouslySetInnerHTML 사용

* 개인정보 console.log 출력 — 배포 전 제거

# **📌 커밋 컨벤션**

feat:     새 기능 추가

fix:      버그 수정

style:    CSS/스타일 변경 (기능 변경 없음)

refactor: 코드 리팩토링

docs:     문서 수정 (CLAUDE.md 등)

chore:    빌드 설정, 패키지 업데이트

perf:     성능 개선

예시: feat: HeroSection 그라디언트 바 \+ fadeSlideUp 애니메이션 추가

# **✅ Phase 진행 체크리스트**

| ☐ | Phase | 작업 내용 | 상태 |
| ----- | ----- | ----- | ----- |
| ☐ | Phase 1 | Next.js 14 프로젝트 셋업 \+ 패키지 설치 | 미시작 |
| ☐ | Phase 2 | Navbar \+ StickyBanner 공통 컴포넌트 | 미시작 |
| ☐ | Phase 3 | Hero 섹션 (그라디언트 바 \+ 타이틀) | 미시작 |
| ☐ | Phase 4 | 실적 & 인터뷰 섹션 (카운트업) | 미시작 |
| ☐ | Phase 5 | 포트폴리오 슬라이더 | 미시작 |
| ☐ | Phase 6 | AI 콘텐츠 갤러리 (Masonry) | 미시작 |
| ☐ | Phase 7 | 스크롤 스토리텔링 (S05\~S12) | 미시작 |
| ☐ | Phase 8 | 문의 폼 \+ EmailJS | 미시작 |
| ☐ | Phase 9 | 페이지 조립 (page.tsx) | 미시작 |
| ☐ | Phase 10 | SEO \+ Vercel 배포 | 미시작 |

**이 CLAUDE.md는 Project APEX-STUDIO의 핵심 작업 지침서입니다. 수정 시 PO(Mark) 승인 필수.**