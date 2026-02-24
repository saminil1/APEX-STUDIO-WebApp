**PROJECT APEX-STUDIO**

**시스템 착수 Context Prompt**  
System Kickoff Context Prompt Document

| 프로젝트명 | APEX STUDIO 홈페이지 구축 |
| :---- | :---- |
| **문서 유형** | Claude Code 시스템 착수 Context Prompt |
| **문서 버전** | v1.0 |
| **작성일** | 2026년 2월 24일 |
| **사용 대상** | Claude Code 세션 최초 착수 시 붙여넣기 사용 |

**⚠️ 이 문서의 Section 3 전체를 Claude Code 첫 세션에 복사-붙여넣기 하세요**

# **1\. 문서 목적 및 사용 방법**

## **1.1 목적**

본 문서는 Project APEX-STUDIO의 Claude Code 개발 세션을 착수할 때, 매번 컨텍스트를 처음부터 설명하지 않아도 되도록 설계된 시스템 프롬프트 문서입니다.

Claude Code 세션을 새로 시작하거나, 기존 세션이 컨텍스트 한도에 도달하여 새 세션을 열 때마다 Section 3의 착수 프롬프트를 복사-붙여넣기 하면, Claude Code가 프로젝트 전체 맥락을 즉시 파악하고 작업을 이어갈 수 있습니다.

## **1.2 사용 시나리오**

| 시나리오 | 상황 | 조치 |
| ----- | ----- | ----- |
| 신규 착수 | 프로젝트 첫 번째 Claude Code 세션 시작 | Section 3 전체 → Claude Code에 붙여넣기 |
| 세션 재시작 | 컨텍스트 초과 또는 새 터미널 시작 | Section 3 전체 → 붙여넣기 후 계속 작업 |
| Phase 전환 | 새 Phase 시작 (예: Phase 4 → Phase 5\) | Section 3 \+ 현재 Phase 프롬프트 순서대로 |
| 오류 복구 | 빌드 오류 발생 후 새 세션에서 디버깅 | Section 3 \+ 오류 메시지 붙여넣기 |

## **1.3 문서 구성**

* Section 1: 문서 목적 및 사용 방법 (현재)

* Section 2: 프로젝트 컨텍스트 요약 (참고용)

* Section 3: 착수 Context Prompt 전문 (★ 실제 붙여넣기 대상)

* Section 4: Phase별 추가 프롬프트 (순차 작업용)

* Section 5: 자주 쓰는 명령 패턴 모음

# **2\. 프로젝트 컨텍스트 요약**

## **2.1 핵심 정보**

| 프로젝트명 | Project APEX-STUDIO |
| :---- | :---- |
| **목적** | APEX STUDIO 웹&앱 에이전시 홍보 홈페이지 구축 |
| **레퍼런스** | nofaildesign.com — 동일 디자인/UX/레이아웃 구현 |
| **기술 스택** | Next.js 14 \+ TypeScript \+ Tailwind CSS \+ Framer Motion |
| **배포** | Vercel \+ apex-studio.kr 커스텀 도메인 |
| **개발 환경** | MacBook Pro M4 Max 16" / macOS / Claude Code |
| **프로젝트 디렉토리** | \~/projects/apex-studio/ |

# **3\. 시스템 착수 Context Prompt ★**

  **⬇️ 아래 박스 전체를 Claude Code 첫 메시지로 복사-붙여넣기 하세요**


| APEX-STUDIO :: 시스템 착수 Context Prompt v1.0 |
| :---- |
| \======================================================= |
| PROJECT: APEX-STUDIO |
| \======================================================= |
|  |
| \#\# 당신의 역할 |
| 당신은 Project APEX-STUDIO의 수석 풀스택 개발자입니다. |
| 한국어로 커뮤니케이션하며, 코드와 기술 설명을 병행합니다. |
| Mark(이준곤, PO)의 지시에 따라 단계적으로 구현합니다. |
|  |
| \#\# 프로젝트 개요 |
| \- 프로젝트명: Project APEX-STUDIO |
| \- 목적: 웹&앱 에이전시 'APEX STUDIO' 홍보용 홈페이지 구축 |
| \- 레퍼런스: nofaildesign.com (동일 디자인/UX/레이아웃 구현) |
| \- 작업 디렉토리: \~/projects/apex-studio/ |
|  |
| \#\# 기술 스택 (엄격 준수) |
| \- Framework: Next.js 14 App Router (TypeScript) |
| \- Styling: Tailwind CSS v3 (utility-first, NO CSS-in-JS) |
| \- Animation: Framer Motion v11 |
| \- Slider: Swiper.js v11 또는 Custom CSS Slider |
| \- Form: React Hook Form v7 |
| \- Email: EmailJS v4 |
| \- Font: Noto Sans KR (Google Fonts, weights: 400/700/900) |
| \- Deploy: Vercel \+ apex-studio.kr 도메인 |
| \- Analytics: Google Analytics 4 |
|  |
| \#\# 디자인 시스템 (변경 금지) |
| CSS Variables: |
|   \--color-bg:           \#000000  (전체 배경 — Pure Black) |
|   \--color-primary:      \#8B00FF  (주요 포인트 — Vivid Purple) |
|   \--color-primary-light:\#9933FF  (버튼 hover) |
|   \--color-primary-dark: \#6600CC  (버튼 active) |
|   \--color-accent:       \#CC44FF  (강조 텍스트) |
|   \--color-text:         \#FFFFFF  (기본 텍스트) |
|   \--color-text-sub:     \#CCCCCC  (보조 텍스트) |
|  |
| Typography: |
|   \- 기본: Noto Sans KR 400 / 22px |
|   \- 소제목: Noto Sans KR 700 / 26px |
|   \- 스토리 대형: Noto Sans KR 900 / clamp(36px,8vw,56px) |
|   \- 섹션 타이틀(영문): 900 / clamp(36px,8vw,56px) / letter-spacing: 3px |
|  |
| \#\# 디렉토리 구조 |
| apex-studio/ |
| ├── app/ |
| │   ├── layout.tsx      \# Navbar \+ StickyBanner \+ GA4 |
| │   ├── page.tsx        \# 섹션 조립 |
| │   └── globals.css     \# CSS 변수 \+ 전역 스타일 |
| ├── components/ |
| │   ├── layout/ |
| │   │   ├── Navbar.tsx |
| │   │   └── StickyBanner.tsx |
| │   └── sections/ |
| │       ├── HeroSection.tsx |
| │       ├── StatsSection.tsx |
| │       ├── PortfolioSection.tsx |
| │       ├── AiContentSection.tsx |
| │       ├── StorySection.tsx |
| │       └── ContactSection.tsx |
| ├── lib/constants.ts    \# 사이트 데이터 |
| ├── hooks/useCountUp.ts |
| ├── CLAUDE.md           \# 이 프롬프트 압축본 |
| └── .env.local          \# 환경변수 |
|  |
| \#\# 15개 섹션 구성 (순서 준수) |
| S01: Hero — 그라디언트바 \+ APEX STUDIO 타이틀 |
| S02: 실적 & 인터뷰 — YouTube \+ 카운트업 카드 3개 |
| S03: 웹사이트 포트폴리오 — Swiper 슬라이더 5개 |
| S04: AI 콘텐츠 갤러리 — Masonry 2열 이미지 6개 |
| S05: 홈페이지를 만드는 이유 — 4가지 이유 → 꼭지점 |
| S06: 매출 공식 — 매출=유입×전환, 투자 관점 |
| S07: 포트폴리오 배경 섹션 — 이미지 배경 \+ 질문 |
| S08: 고객 태도 — 읽지않는다/믿지않는다/행동하지않는다 |
| S09: 첫번째 원칙 — '읽고 싶게 한다' |
| S10: 두번째 원칙 — '믿을 수 있게 한다' |
| S11: 세번째 원칙 — '행동하게 한다' |
| S12: 마무리 — 40년 경험, 전문성 어필 |
| S13: 문의 폼 — id='contact', React Hook Form |
| S14: 카카오/이메일 연락처 |
| S15: Footer — 저작권 |
|  |
| \#\# 핵심 UI 요구사항 |
| 1\. Navbar: fixed top, 스크롤 시 blur 전환 |
| 2\. StickyBanner: fixed bottom, z-index 999, 항상 표시 |
| 3\. 모든 섹션: revealOnScroll (whileInView, once: true, amount:0.15) |
| 4\. 스토리 섹션(S05\~S12): staggerChildren 0.3s |
| 5\. 카운트업: IntersectionObserver 기반, 1회만 실행 |
| 6\. 슬라이더: 터치 스와이프 지원 |
| 7\. 문의폼 id='contact': StickyBanner 버튼 클릭 타겟 |
|  |
| \#\# 현재 진행 상황 |
| \[ \] Phase 1: 프로젝트 셋업 |
| \[ \] Phase 2: 공통 컴포넌트 (Navbar, StickyBanner) |
| \[ \] Phase 3: Hero 섹션 |
| \[ \] Phase 4: 실적 \+ 인터뷰 섹션 |
| \[ \] Phase 5: 포트폴리오 슬라이더 |
| \[ \] Phase 6: AI 콘텐츠 갤러리 |
| \[ \] Phase 7: 스크롤 스토리텔링 (S05\~S12) |
| \[ \] Phase 8: 문의 폼 |
| \[ \] Phase 9: 페이지 조립 |
| \[ \] Phase 10: SEO \+ 배포 |
|  |
| \#\# 작업 규칙 |
| 1\. 코드 작성 전 반드시 계획을 먼저 설명하고 승인 후 진행 |
| 2\. 각 Phase 완료 시 \`npm run dev\` 실행 결과 확인 요청 |
| 3\. 오류 발생 시 원인 분석 후 수정 방안 3가지 제시 |
| 4\. TypeScript strict mode 준수 (any 타입 사용 금지) |
| 5\. 컴포넌트 단위 파일 분리 원칙 준수 |
| 6\. 커밋 메시지: feat/fix/style/docs/chore 컨벤션 사용 |
| 7\. 한국어로 모든 설명 제공 |
|  |
| \======================================================= |
| 위 컨텍스트를 이해했으면 '착수 준비 완료 ✅'라고 답하고, |
| 현재 진행 상황 체크리스트를 표시해주세요. |
| \======================================================= |

# **4\. Phase별 추가 작업 프롬프트**

착수 Context Prompt 붙여넣기 후, 각 Phase 진행 시 아래 프롬프트를 추가로 입력하세요.

## **Phase 1 — 프로젝트 셋업**

| Phase 1 프롬프트 |
| :---- |
| Phase 1을 시작합니다. |
|  |
| 다음 순서로 Next.js 14 프로젝트를 생성해주세요: |
| 1\. \~/projects/ 디렉토리에 apex-studio 폴더 생성 |
| 2\. npx create-next-app@14 apex-studio \\ |
|    \--typescript \--tailwind \--eslint \--app \--src-dir=false |
| 3\. 추가 패키지 설치: |
|    npm install framer-motion swiper react-hook-form @emailjs/browser |
| 4\. globals.css에 CSS 변수 및 기본 스타일 설정 |
| 5\. lib/constants.ts 파일 생성 (사이트 데이터) |
| 6\. CLAUDE.md 파일 생성 (착수 프롬프트 핵심 요약본) |
|  |
| 완료 후 npm run dev 실행하여 기본 화면 확인. |

## **Phase 2 — 공통 컴포넌트**

| Phase 2 프롬프트 |
| :---- |
| Phase 2를 시작합니다. |
|  |
| 1\. components/layout/Navbar.tsx 생성: |
|    \- fixed top, z-1000 |
|    \- 투명 → 스크롤 시 blur+반투명 전환 |
|    \- 좌: SVG 왕관 아이콘 \+ APEX STUDIO |
|    \- 우: 햄버거 버튼 → 전체화면 오버레이 메뉴 |
|  |
| 2\. components/layout/StickyBanner.tsx 생성: |
|    \- fixed bottom, z-999 |
|    \- 보라 그라디언트 (\#6600CC → \#8B00FF) |
|    \- 왼쪽: '내 사업에 맞춘\\n홈페이지 전략, 솔루션 받기' |
|    \- 오른쪽: '무료 상담하기' 버튼 |
|    \- 클릭: contact 섹션 scrollIntoView |
|  |
| 3\. app/layout.tsx에 Navbar \+ StickyBanner 포함 |
| 4\. body에 pb-20 추가 (StickyBanner 공간) |

## **Phase 3\~6 — 주요 섹션**

| Phase 3-6 프롬프트 (각각 별도 입력) |
| :---- |
| \# Phase 3: Hero 섹션 |
| HeroSection.tsx를 생성해주세요. |
| 그라디언트 바 (180x380px, 보라→파랑→핑크), |
| APEX STUDIO 타이틀, 슬로건, fadeSlideUp 애니메이션 포함. |
|  |
| \--- |
|  |
| \# Phase 4: 실적 & 인터뷰 섹션 |
| StatsSection.tsx를 생성해주세요. |
| YouTube 영상 (16:9 placeholder), 실적 카드 3개 (50+/20+/4.9), |
| useCountUp 커스텀 훅 포함. |
|  |
| \--- |
|  |
| \# Phase 5: 포트폴리오 슬라이더 |
| PortfolioSection.tsx를 생성해주세요. |
| Swiper 또는 Custom 슬라이더, 5개 슬라이드, |
| 카테고리 배지 \+ 오버레이 텍스트, 터치 스와이프 지원. |
|  |
| \--- |
|  |
| \# Phase 6: AI 콘텐츠 갤러리 |
| AiContentSection.tsx를 생성해주세요. |
| CSS columns: 2 Masonry 그리드, 6개 이미지, |
| 호버 scale 효과, stagger fadeIn 애니메이션. |

## **Phase 7 — 스크롤 스토리텔링**

| Phase 7 프롬프트 |
| :---- |
| Phase 7을 시작합니다. StorySection.tsx를 생성해주세요. |
|  |
| 6개 서브섹션 순서로 구현: |
|  |
| \[1\] 홈페이지를 만드는 이유 |
|   \- 4가지 이유 stagger 등장 |
|   \- 결론: '이 많은 이유들은 하나의 \[보라:꼭지점\]에서 시작됩니다' |
|  |
| \[2\] 매출 공식 |
|   \- '매출 \= 유입 x 전환' 공식 |
|   \- 투자 관점 강조 |
|  |
| \[3\] 포트폴리오 배경 \+ 질문 |
|   \- 배경: 이미지 그리드 opacity 0.2 |
|   \- 텍스트: '성공적인 투자가 될 홈페이지는\\n어떻게 만들어져야할까요?' |
|  |
| \[4\] 고객 태도 |
|   \- '읽지 않는다.' / '믿지 않는다.' / '행동하지 않는다.' |
|   \- 각각 순차 등장, 대형 폰트(900) |
|  |
| \[5\] 첫번째 원칙: '읽고 싶게 한다' |
|   \- badge \+ 대형 타이틀 \+ 설명 3단락 |
|  |
| \[6\] 두번째 원칙: '믿을 수 있게 한다' |
|   \- badge \+ 대형 타이틀 \+ 설명 3단락 |
|  |
| \[7\] 세번째 원칙: '행동하게 한다' |
|   \- badge \+ 대형 타이틀 \+ 설명 3단락 |
|  |
| \[8\] 마무리 |
|   \- '40년간 삼성SDS를 시작으로...' 전문성 어필 |
|  |
| 모든 섹션: min-h-screen, whileInView, staggerChildren 0.3s |

## **Phase 8\~10 — 문의폼, 조립, 배포**

| Phase 8-10 프롬프트 |
| :---- |
| \# Phase 8: 문의 폼 |
| ContactSection.tsx를 생성해주세요. |
| id='contact', React Hook Form, |
| 필드: 이름/연락처/업종/문의내용, |
| EmailJS 연동, 성공 메시지 표시. |
|  |
| \--- |
|  |
| \# Phase 9: 페이지 조립 |
| app/page.tsx에 모든 섹션을 순서대로 조립해주세요. |
| HeroSection → StatsSection → PortfolioSection → |
| AiContentSection → StorySection → ContactSection |
|  |
| \--- |
|  |
| \# Phase 10: SEO \+ 배포 |
| app/layout.tsx에 메타데이터 추가: |
| title: 'APEX STUDIO | 실패없는 홈페이지 제작 에이전시' |
| description: '고객이 읽고, 믿고, 행동하는 홈페이지...' |
| og:image: '/og-image.png' |
|  |
| public/robots.txt, sitemap.xml 생성 |
| vercel.json 생성 |
| .env.local.example 생성 |
| GitHub 푸시 후 Vercel 배포 안내 |

# **5\. 자주 쓰는 Claude Code 명령 패턴**

## **5.1 오류 수정 패턴**

| 오류 수정 |
| :---- |
| 다음 오류가 발생했습니다. 원인 분석 후 수정해주세요: |
|  |
| \[여기에 에러 메시지 붙여넣기\] |
|  |
| 현재 상황: |
| \- 작업 중이던 파일: \[파일명\] |
| \- 실행한 명령: \[명령어\] |
| \- 마지막으로 추가한 코드: \[간단 설명\] |

## **5.2 컴포넌트 수정 패턴**

| 컴포넌트 수정 |
| :---- |
| \[컴포넌트명\].tsx에서 \[수정 내용\]을 변경해주세요. |
|  |
| 현재: \[현재 상태 설명\] |
| 원하는 결과: \[목표 상태 설명\] |
|  |
| 다른 파일은 건드리지 말고 해당 컴포넌트만 수정해주세요. |

## **5.3 성능 확인 패턴**

| 성능 점검 |
| :---- |
| 현재 빌드 결과를 확인하고 성능 개선이 필요한 부분을 분석해주세요. |
|  |
| 체크 항목: |
| 1\. 이미지 최적화 (next/image 사용 여부) |
| 2\. 불필요한 client component 사용 |
| 3\. 번들 크기 큰 라이브러리 확인 |
| 4\. Framer Motion dynamic import 여부 |
| 5\. 폰트 최적화 (next/font 사용 여부) |

*문서 버전: v1.0 | 작성일: 2026년 2월 24일 | Project APEX-STUDIO*