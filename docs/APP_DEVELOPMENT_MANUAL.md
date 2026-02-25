# APEX STUDIO 모바일 앱 개발 매뉴얼

> 작성일: 2026-02-25
> 작성자: Claude Code (Anthropic)
> 대상: APEX STUDIO 웹 시스템 → 모바일 앱 전환 개발
> 현재 웹: Next.js 14 + TypeScript + Tailwind CSS + Prisma + PostgreSQL

---

## 목차

1. [프로젝트 개요](#1-프로젝트-개요)
2. [기술 스택 선정](#2-기술-스택-선정)
3. [현재 웹 시스템 구조 분석](#3-현재-웹-시스템-구조-분석)
4. [앱 아키텍처 설계](#4-앱-아키텍처-설계)
5. [화면 설계 (웹 → 앱 매핑)](#5-화면-설계-웹--앱-매핑)
6. [API 연동 가이드](#6-api-연동-가이드)
7. [인증 시스템 구현](#7-인증-시스템-구현)
8. [주요 기능별 구현 가이드](#8-주요-기능별-구현-가이드)
9. [푸시 알림 구현](#9-푸시-알림-구현)
10. [디자인 시스템 이식](#10-디자인-시스템-이식)
11. [개발 환경 설정](#11-개발-환경-설정)
12. [단계별 구현 로드맵](#12-단계별-구현-로드맵)
13. [테스트 전략](#13-테스트-전략)
14. [배포 가이드](#14-배포-가이드)
15. [유지보수 가이드](#15-유지보수-가이드)

---

## 1. 프로젝트 개요

### 1.1 목적

APEX STUDIO 웹 에이전시 홍보 사이트의 모바일 앱 버전을 개발하여:
- 방문자에게 네이티브 앱 경험 제공
- 관리자가 모바일에서 문의/대화 관리
- 푸시 알림으로 실시간 문의 알림 수신

### 1.2 앱 구성 (2-in-1)

| 영역 | 대상 | 주요 기능 |
|------|------|----------|
| **공개 영역** | 방문자 | 홍보 페이지, 포트폴리오, 문의 폼, 챗봇 |
| **관리자 영역** | 관리자 | 문의 관리, 대화 관리, 푸시 알림 |

### 1.3 현재 웹 기술 스택

| 분류 | 기술 |
|------|------|
| Frontend | Next.js 14 App Router + TypeScript |
| Styling | Tailwind CSS v3 |
| Animation | Framer Motion v11 |
| Form | React Hook Form v7 + Zod |
| Email | EmailJS v4 |
| DB | PostgreSQL + Prisma ORM |
| Auth | JWT (jose) + HTTP-only Cookie |
| Deploy | Vercel |
| Domain | apex-studio.kr |

---

## 2. 기술 스택 선정

### 2.1 프레임워크 비교

| 항목 | React Native (Expo) | Flutter | 네이티브 (Swift/Kotlin) |
|------|---------------------|---------|----------------------|
| **언어** | TypeScript (현재 웹과 동일) | Dart (새로 학습) | Swift + Kotlin (2개) |
| **코드 재사용** | 높음 (타입, 검증 로직 공유) | 낮음 | 없음 |
| **학습 곡선** | 낮음 (React 경험 활용) | 중간 | 높음 |
| **개발 속도** | 빠름 | 빠름 | 느림 |
| **네이티브 성능** | 좋음 | 매우 좋음 | 최고 |
| **커뮤니티** | 매우 큼 | 큼 | 큼 |
| **추천도** | ★★★★★ | ★★★★ | ★★★ |

### 2.2 권장: React Native (Expo)

**선정 이유:**
1. **TypeScript 공유** — 현재 웹의 타입(`types/chat.ts`, `types/inquiry.ts`)과 Zod 검증(`lib/validations.ts`) 로직을 그대로 재사용
2. **React 패러다임 동일** — useState, useEffect, useCallback 등 동일한 Hook 패턴
3. **Expo Router** — Next.js App Router와 유사한 파일 기반 라우팅
4. **EAS Build** — Vercel과 유사한 클라우드 빌드/배포

### 2.3 앱 기술 스택 (권장)

| 분류 | 기술 | 비고 |
|------|------|------|
| Framework | React Native + Expo SDK 52 | Expo Router v4 |
| Language | TypeScript | 웹과 동일 |
| Navigation | Expo Router | 파일 기반 라우팅 |
| State | Zustand | 경량 상태 관리 |
| Form | React Hook Form v7 + Zod | 웹과 동일 |
| HTTP Client | Axios 또는 fetch | API 통신 |
| Auth Storage | expo-secure-store | JWT 안전 저장 |
| Push | expo-notifications | FCM/APNs |
| Animation | react-native-reanimated | Framer Motion 대체 |
| Styling | NativeWind (Tailwind for RN) | 웹 스타일 재사용 |
| Image | expo-image | 최적화 이미지 |
| Build/Deploy | EAS Build + EAS Submit | 앱스토어 배포 |

---

## 3. 현재 웹 시스템 구조 분석

### 3.1 데이터베이스 모델

```
┌─────────────────────────────┐
│         Inquiry             │
├─────────────────────────────┤
│ id          (cuid, PK)      │
│ name        (String)        │
│ phone       (String)        │
│ business    (String)        │
│ email       (String)        │
│ message     (String)        │
│ homepageType    (String)    │
│ homepagePrice   (String)    │
│ additionalOption (String)   │
│ additionalPrice  (String)   │
│ referenceLink    (String)   │
│ fileName         (String)   │
│ status      (InquiryStatus) │
│ memo        (String)        │
│ createdAt   (DateTime)      │
│ updatedAt   (DateTime)      │
└─────────────────────────────┘

┌─────────────────────────────┐       ┌─────────────────────────────┐
│       ChatSession           │       │       ChatMessage           │
├─────────────────────────────┤       ├─────────────────────────────┤
│ id           (cuid, PK)     │──1:N──│ id        (cuid, PK)        │
│ status  (ChatSessionStatus) │       │ sessionId (FK → ChatSession)│
│ memo         (String)       │       │ sender    ("user" | "bot")  │
│ messageCount (Int)          │       │ content   (String)          │
│ lastMessage  (String)       │       │ createdAt (DateTime)        │
│ createdAt    (DateTime)     │       └─────────────────────────────┘
│ updatedAt    (DateTime)     │
└─────────────────────────────┘

Enum InquiryStatus: NEW | READ | REPLIED | ARCHIVED
Enum ChatSessionStatus: ACTIVE | CLOSED | ARCHIVED
```

### 3.2 API 엔드포인트 전체 목록

#### 공개 API (인증 불필요)

| Method | Endpoint | 기능 | 요청 Body |
|--------|----------|------|-----------|
| POST | `/api/inquiries` | 문의 폼 제출 | name, phone, business, message... |
| POST | `/api/chat/sessions` | 챗봇 세션 생성 | (없음) |
| POST | `/api/chat/messages` | 챗봇 메시지 저장 | sessionId, sender, content |

#### 인증 API

| Method | Endpoint | 기능 | 요청 Body |
|--------|----------|------|-----------|
| POST | `/api/auth/login` | 관리자 로그인 | password |
| POST | `/api/auth/logout` | 로그아웃 | (없음) |

#### 관리자 API (인증 필요)

| Method | Endpoint | 기능 | 파라미터 |
|--------|----------|------|----------|
| GET | `/api/inquiries` | 문의 목록 | ?page, limit, status, search |
| PATCH | `/api/inquiries/[id]` | 문의 수정 | status, memo |
| DELETE | `/api/inquiries/[id]` | 문의 삭제 | - |
| GET | `/api/chat/sessions/admin` | 대화 목록 | ?page, limit, status, search |
| GET | `/api/chat/sessions/admin/[id]` | 대화 상세 | - |
| PATCH | `/api/chat/sessions/admin/[id]` | 대화 수정 | status, memo |
| DELETE | `/api/chat/sessions/admin/[id]` | 대화 삭제 | - |

### 3.3 인증 플로우 (현재 웹)

```
[로그인] POST /api/auth/login { password }
    ↓
[서버] ADMIN_PASSWORD 검증 → JWT 생성 (jose)
    ↓
[응답] Set-Cookie: admin_session=<JWT> (httpOnly, 7일)
    ↓
[이후 요청] Cookie 자동 포함 → middleware에서 검증
```

### 3.4 웹 화면 구성

```
공개 페이지:
├── / (홈페이지 - 15개 섹션)
│   ├── S01 Hero (그라디언트 바 + 타이틀)
│   ├── S02 실적 & 인터뷰 (카운트업)
│   ├── S03 웹사이트 포트폴리오 (Swiper)
│   ├── S04 AI 콘텐츠 갤러리 (Masonry)
│   ├── S05 홈페이지를 만드는 이유
│   ├── S06 매출 공식
│   ├── S07 포트폴리오 배경
│   ├── S08 고객 태도
│   ├── S09 첫번째 원칙
│   ├── S10 두번째 원칙
│   ├── S11 세번째 원칙
│   ├── S12 마무리
│   ├── S13 문의 폼 (id='contact')
│   ├── S14 연락처
│   └── S15 Footer
├── /contact (8단계 위자드 폼)
├── /portfolio (포트폴리오 목록)
│   ├── /portfolio/detail (상세 제작물)
│   ├── /portfolio/ai (AI 콘텐츠)
│   ├── /portfolio/erp (ERP 솔루션)
│   └── /portfolio/lms (LMS 교육)
└── 챗봇 (플로팅 위젯)

관리자 페이지:
├── /admin (로그인)
├── /admin/inquiries (문의 목록)
├── /admin/inquiries/[id] (문의 상세)
├── /admin/chats (대화 목록)
└── /admin/chats/[id] (대화 상세)
```

---

## 4. 앱 아키텍처 설계

### 4.1 전체 아키텍처

```
┌──────────────────────────────────────────────┐
│              React Native App (Expo)          │
│                                              │
│  ┌─────────┐  ┌──────────┐  ┌────────────┐  │
│  │  공개    │  │  관리자   │  │  공통       │  │
│  │  영역    │  │  영역    │  │  모듈       │  │
│  ├─────────┤  ├──────────┤  ├────────────┤  │
│  │ 홈      │  │ 문의관리  │  │ API Client │  │
│  │ 포트폴리오│  │ 대화관리  │  │ Auth Store │  │
│  │ 문의폼   │  │ 대시보드  │  │ Push       │  │
│  │ 챗봇    │  │         │  │ Storage    │  │
│  └─────────┘  └──────────┘  └────────────┘  │
│                      │                       │
│               ┌──────┴──────┐                │
│               │  API Layer  │                │
│               │  (fetch)    │                │
│               └──────┬──────┘                │
└──────────────────────┼───────────────────────┘
                       │ HTTPS
┌──────────────────────┼───────────────────────┐
│         기존 Next.js 서버 (Vercel)            │
│               ┌──────┴──────┐                │
│               │  API Routes │                │
│               └──────┬──────┘                │
│               ┌──────┴──────┐                │
│               │   Prisma    │                │
│               └──────┬──────┘                │
│               ┌──────┴──────┐                │
│               │ PostgreSQL  │                │
│               └─────────────┘                │
└──────────────────────────────────────────────┘
```

### 4.2 프로젝트 디렉토리 구조 (Expo Router)

```
apex-studio-app/
├── app/                          # Expo Router (파일 기반 라우팅)
│   ├── _layout.tsx               # Root Layout (테마, 폰트 로딩)
│   ├── index.tsx                 # 스플래시 → 홈 리다이렉트
│   │
│   ├── (public)/                 # 공개 탭 그룹
│   │   ├── _layout.tsx           # Bottom Tab Navigator
│   │   ├── home/
│   │   │   ├── _layout.tsx       # Stack Navigator
│   │   │   └── index.tsx         # 홈 (스크롤 섹션)
│   │   ├── portfolio/
│   │   │   ├── _layout.tsx       # Stack Navigator
│   │   │   ├── index.tsx         # 포트폴리오 목록
│   │   │   └── [category].tsx    # 카테고리별 목록 (detail/ai/erp/lms)
│   │   ├── contact/
│   │   │   ├── _layout.tsx       # Stack Navigator
│   │   │   └── index.tsx         # 8단계 위자드 폼
│   │   └── chatbot/
│   │       ├── _layout.tsx       # Stack Navigator
│   │       └── index.tsx         # 챗봇 전체화면
│   │
│   ├── (admin)/                  # 관리자 탭 그룹
│   │   ├── _layout.tsx           # Bottom Tab Navigator (인증 가드)
│   │   ├── inquiries/
│   │   │   ├── _layout.tsx       # Stack Navigator
│   │   │   ├── index.tsx         # 문의 목록
│   │   │   └── [id].tsx          # 문의 상세
│   │   ├── chats/
│   │   │   ├── _layout.tsx       # Stack Navigator
│   │   │   ├── index.tsx         # 대화 목록
│   │   │   └── [id].tsx          # 대화 상세
│   │   └── settings/
│   │       └── index.tsx         # 설정 (로그아웃, 알림 등)
│   │
│   └── auth/
│       └── login.tsx             # 관리자 로그인
│
├── components/                   # 재사용 컴포넌트
│   ├── common/
│   │   ├── StatusBadge.tsx       # 상태 배지
│   │   ├── Pagination.tsx        # 페이지네이션
│   │   ├── LoadingSpinner.tsx    # 로딩 인디케이터
│   │   └── EmptyState.tsx        # 빈 상태 표시
│   ├── home/
│   │   ├── HeroSection.tsx       # S01
│   │   ├── StatsSection.tsx      # S02
│   │   ├── PortfolioSlider.tsx   # S03
│   │   ├── AiGallery.tsx         # S04
│   │   └── StorySection.tsx      # S05~S12
│   ├── portfolio/
│   │   ├── PortfolioCard.tsx
│   │   └── PortfolioFilter.tsx
│   ├── contact/
│   │   ├── WizardProgress.tsx
│   │   ├── WizardNavigation.tsx
│   │   └── steps/
│   │       ├── Step1Name.tsx
│   │       ├── Step2Phone.tsx
│   │       └── ... (Step3~Step8)
│   ├── chatbot/
│   │   ├── MessageBubble.tsx
│   │   ├── CategoryButtons.tsx
│   │   └── ChatInput.tsx
│   └── admin/
│       ├── InquiryCard.tsx
│       ├── InquiryFilters.tsx
│       ├── ChatCard.tsx
│       ├── ChatFilters.tsx
│       └── ChatMessageView.tsx
│
├── lib/                          # 공유 로직
│   ├── api.ts                    # API 클라이언트 (인터셉터 포함)
│   ├── auth.ts                   # 인증 헬퍼 (SecureStore)
│   ├── constants.ts              # 웹에서 복사 (포트폴리오 데이터 등)
│   ├── faqData.ts                # 웹에서 복사 (챗봇 FAQ)
│   └── validations.ts            # 웹에서 복사 (Zod 스키마)
│
├── stores/                       # Zustand 상태 관리
│   ├── authStore.ts              # 인증 상태
│   ├── inquiryStore.ts           # 문의 목록 상태
│   └── chatStore.ts              # 대화 목록 상태
│
├── types/                        # 타입 정의
│   ├── inquiry.ts                # 웹에서 복사
│   └── chat.ts                   # 웹에서 복사
│
├── hooks/                        # 커스텀 훅
│   ├── useCountUp.ts             # 카운트업 애니메이션
│   ├── useInfiniteScroll.ts      # 무한 스크롤
│   └── usePushNotifications.ts   # 푸시 알림
│
├── assets/                       # 정적 자산
│   ├── images/
│   ├── fonts/
│   │   └── NotoSansKR-*.ttf
│   └── icons/
│
├── app.json                      # Expo 설정
├── eas.json                      # EAS Build 설정
├── package.json
├── tsconfig.json
├── babel.config.js
└── tailwind.config.ts            # NativeWind 설정
```

### 4.3 상태 관리 설계

```typescript
// stores/authStore.ts — Zustand 인증 스토어
interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  loadToken: () => Promise<void>;
}

// stores/inquiryStore.ts — 문의 관리 스토어
interface InquiryState {
  items: InquiryItem[];
  total: number;
  page: number;
  totalPages: number;
  status: InquiryStatus | "";
  search: string;
  loading: boolean;
  fetchItems: () => Promise<void>;
  setStatus: (s: InquiryStatus | "") => void;
  setSearch: (s: string) => void;
  setPage: (p: number) => void;
}

// stores/chatStore.ts — 대화 관리 스토어
interface ChatState {
  sessions: ChatSessionItem[];
  total: number;
  page: number;
  totalPages: number;
  status: ChatSessionStatus | "";
  search: string;
  loading: boolean;
  fetchSessions: () => Promise<void>;
  setStatus: (s: ChatSessionStatus | "") => void;
  setSearch: (s: string) => void;
  setPage: (p: number) => void;
}
```

---

## 5. 화면 설계 (웹 → 앱 매핑)

### 5.1 공개 영역 화면

| # | 웹 페이지 | 앱 화면 | 네비게이션 | 비고 |
|---|----------|---------|-----------|------|
| 1 | `/` (홈) | `(public)/home/index` | Bottom Tab "홈" | ScrollView로 섹션 구현 |
| 2 | `/portfolio` | `(public)/portfolio/index` | Bottom Tab "포트폴리오" | FlatList + 필터 |
| 3 | `/portfolio/detail` | `(public)/portfolio/[category]` | Stack Push | category="detail" |
| 4 | `/portfolio/ai` | `(public)/portfolio/[category]` | Stack Push | category="ai" |
| 5 | `/portfolio/erp` | `(public)/portfolio/[category]` | Stack Push | category="erp" |
| 6 | `/portfolio/lms` | `(public)/portfolio/[category]` | Stack Push | category="lms" |
| 7 | `/contact` | `(public)/contact/index` | Bottom Tab "문의" | 스텝 위자드 |
| 8 | 챗봇 (플로팅) | `(public)/chatbot/index` | Bottom Tab "챗봇" | 전체화면 채팅 |

### 5.2 관리자 영역 화면

| # | 웹 페이지 | 앱 화면 | 네비게이션 | 비고 |
|---|----------|---------|-----------|------|
| 1 | `/admin` | `auth/login` | Modal Screen | 비밀번호 입력 |
| 2 | `/admin/inquiries` | `(admin)/inquiries/index` | Bottom Tab "문의" | 무한스크롤 리스트 |
| 3 | `/admin/inquiries/[id]` | `(admin)/inquiries/[id]` | Stack Push | 상세+수정+삭제 |
| 4 | `/admin/chats` | `(admin)/chats/index` | Bottom Tab "대화" | 무한스크롤 리스트 |
| 5 | `/admin/chats/[id]` | `(admin)/chats/[id]` | Stack Push | 채팅뷰+관리 |
| 6 | (없음) | `(admin)/settings/index` | Bottom Tab "설정" | 로그아웃, 알림 설정 |

### 5.3 네비게이션 구조

```
App Root (_layout.tsx)
├── Splash / Auth Check
│
├── (public) — Bottom Tab Navigator
│   ├── 홈 Tab (🏠)
│   │   └── Stack: 홈 → (섹션 상세)
│   ├── 포트폴리오 Tab (📁)
│   │   └── Stack: 목록 → 카테고리
│   ├── 문의 Tab (📝)
│   │   └── Stack: 위자드 폼
│   └── 챗봇 Tab (💬)
│       └── Stack: 챗봇 전체화면
│
├── (admin) — Bottom Tab Navigator (인증 필요)
│   ├── 문의관리 Tab (📋)
│   │   └── Stack: 목록 → 상세
│   ├── 대화관리 Tab (💬)
│   │   └── Stack: 목록 → 상세
│   └── 설정 Tab (⚙️)
│       └── Stack: 설정
│
└── auth/login — Modal Screen
```

### 5.4 화면 와이어프레임 (ASCII)

#### 홈 화면 (공개)
```
┌─────────────────────────┐
│  ◄ APEX STUDIO      ☰  │  ← Header
├─────────────────────────┤
│                         │
│   ┌───────────────┐     │
│   │ ▓▓▓▓ Gradient │     │
│   │ ▓▓▓▓  Bar     │     │
│   │ ▓▓▓▓          │     │
│   └───────────────┘     │
│                         │
│   APEX STUDIO           │
│   성공하는 디자인으로      │
│   매출을 만드는 에이전시    │  ← S01 Hero
│                         │
│   [무료 상담 신청하기]     │  ← CTA Button
│                         │
├─────────────────────────┤
│   50+     20+     4.9   │  ← S02 Stats
│   프로젝트  유지보수  평점  │
├─────────────────────────┤
│  ┌────┐ ┌────┐ ┌────┐   │
│  │ P1 │ │ P2 │ │ P3 │   │  ← S03 Portfolio
│  └────┘ └────┘ └────┘   │     (Horizontal ScrollView)
│        ◄ ● ○ ○ ►        │
├─────────────────────────┤
│  ... (스크롤 계속)        │
│                         │
├─────────────────────────┤
│  🏠   📁   📝   💬     │  ← Bottom Tab
└─────────────────────────┘
```

#### 문의 관리 목록 (관리자)
```
┌─────────────────────────┐
│  문의 관리     총 42건    │  ← Header
├─────────────────────────┤
│ [전체][신규][확인][답변완료]│  ← Filter Chips
│ ┌─────────────────────┐ │
│ │ 🔍 이름, 연락처 검색  │ │  ← Search Bar
│ └─────────────────────┘ │
├─────────────────────────┤
│ ┌─────────────────────┐ │
│ │ 🟣 신규  홍길동       │ │
│ │ 010-1234-5678       │ │  ← Inquiry Card
│ │ IT · 02.25 14:30    │ │
│ │ 홈페이지 제작 문의... │ │
│ └─────────────────────┘ │
│ ┌─────────────────────┐ │
│ │ 🔵 확인  김영희       │ │
│ │ 010-5678-1234       │ │
│ │ 요식업 · 02.24 10:15 │ │
│ └─────────────────────┘ │
│ ┌─────────────────────┐ │
│ │ 🟢 답변완료 박철수    │ │
│ │ ...                 │ │
│ └─────────────────────┘ │
│                         │
│  (스크롤하여 더 불러오기)  │  ← Infinite Scroll
│                         │
├─────────────────────────┤
│  📋   💬   ⚙️          │  ← Admin Bottom Tab
└─────────────────────────┘
```

#### 대화 상세 (관리자)
```
┌─────────────────────────┐
│  ◄ 목록  대화 상세  🗑️   │  ← Header
├─────────────────────────┤
│  🟢 진행중  02.25 14:30  │
│  메시지 12건             │  ← Session Info
├─────────────────────────┤
│                         │
│  ┌──────────────┐       │
│  │ 안녕하세요!    │       │  ← Bot Message
│  │ APEX STUDIO  │       │
│  │ 챗봇입니다.   │       │
│  └──────────────┘ 14:30 │
│                         │
│       ┌──────────────┐  │
│       │ 가격이 궁금   │  │  ← User Message
│       │ 합니다       │  │
│       └──────────────┘  │
│  14:31                  │
│                         │
│  ┌──────────────┐       │
│  │ 기본형 패키지는 │       │
│  │ 220만원부터... │       │  ← Bot Response
│  └──────────────┘ 14:31 │
│                         │
├─────────────────────────┤
│  상태: [진행중][종료][보관]│  ← Status Change
│                         │
│  관리자 메모:            │
│  ┌─────────────────────┐│
│  │ 가격 문의 고객       ││  ← Memo
│  └─────────────────────┘│
│                         │
│  [      저장하기      ]  │  ← Save Button
└─────────────────────────┘
```

---

## 6. API 연동 가이드

### 6.1 API 클라이언트 설정

```typescript
// lib/api.ts
import * as SecureStore from 'expo-secure-store';

const BASE_URL = 'https://apex-studio.kr';
// 개발 시: const BASE_URL = 'http://localhost:3000';

interface ApiOptions {
  method?: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  body?: Record<string, unknown>;
  auth?: boolean; // true면 토큰 포함
}

export async function api<T>(
  endpoint: string,
  options: ApiOptions = {}
): Promise<T> {
  const { method = 'GET', body, auth = false } = options;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (auth) {
    const token = await SecureStore.getItemAsync('admin_token');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ error: '요청 실패' }));
    throw new Error(error.error || `HTTP ${res.status}`);
  }

  return res.json();
}
```

### 6.2 서버 측 인증 방식 변경

현재 웹은 **HTTP-only Cookie**로 인증하지만, 모바일 앱은 Cookie를 사용하기 어렵습니다. 따라서 서버에 **Bearer Token 인증**을 추가해야 합니다.

#### 서버 수정 필요 사항

**middleware.ts 수정:**

```typescript
// 기존: Cookie에서만 토큰 추출
const token = request.cookies.get("admin_session")?.value;

// 변경: Cookie 또는 Authorization 헤더에서 토큰 추출
async function isAuthenticated(request: NextRequest): Promise<boolean> {
  // 1. Cookie에서 확인 (웹 호환)
  let token = request.cookies.get("admin_session")?.value;

  // 2. Authorization 헤더에서 확인 (앱 호환)
  if (!token) {
    const authHeader = request.headers.get("Authorization");
    if (authHeader?.startsWith("Bearer ")) {
      token = authHeader.slice(7);
    }
  }

  if (!token) return false;

  const secret = getSecret();
  if (!secret) return false;

  try {
    await jwtVerify(token, secret);
    return true;
  } catch {
    return false;
  }
}
```

**login API 수정 (`app/api/auth/login/route.ts`):**

```typescript
// 기존: Cookie만 설정
// 변경: Cookie + JSON 응답에 token 포함

export async function POST(request: Request) {
  // ... 기존 검증 로직 ...

  const token = await createSession();

  // 웹: Cookie 설정 (기존 유지)
  setSessionCookie(token);

  // 앱: JSON 응답에 token 포함 (추가)
  return NextResponse.json({
    success: true,
    token, // ← 앱에서 SecureStore에 저장
  });
}
```

### 6.3 API 호출 예시

```typescript
// 문의 목록 조회 (관리자)
const inquiries = await api<InquiriesResponse>(
  '/api/inquiries?page=1&limit=20&status=NEW',
  { auth: true }
);

// 문의 폼 제출 (공개)
const result = await api<{ success: boolean; id: string }>(
  '/api/inquiries',
  {
    method: 'POST',
    body: {
      name: '홍길동',
      phone: '010-1234-5678',
      business: 'IT',
      message: '문의합니다',
    },
  }
);

// 대화 세션 생성 (공개)
const session = await api<{ id: string }>(
  '/api/chat/sessions',
  { method: 'POST' }
);

// 대화 메시지 저장 (공개)
await api('/api/chat/messages', {
  method: 'POST',
  body: {
    sessionId: session.id,
    sender: 'user',
    content: '안녕하세요',
  },
});

// 대화 상세 조회 (관리자)
const detail = await api<ChatSessionDetailItem>(
  `/api/chat/sessions/admin/${sessionId}`,
  { auth: true }
);

// 문의 상태 변경 (관리자)
await api(`/api/inquiries/${id}`, {
  method: 'PATCH',
  auth: true,
  body: { status: 'REPLIED', memo: '전화 상담 완료' },
});

// 대화 삭제 (관리자)
await api(`/api/chat/sessions/admin/${id}`, {
  method: 'DELETE',
  auth: true,
});
```

---

## 7. 인증 시스템 구현

### 7.1 인증 스토어

```typescript
// stores/authStore.ts
import { create } from 'zustand';
import * as SecureStore from 'expo-secure-store';
import { api } from '@/lib/api';
import { router } from 'expo-router';

const TOKEN_KEY = 'admin_token';

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  loadToken: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  token: null,
  isAuthenticated: false,
  isLoading: true,

  loadToken: async () => {
    try {
      const token = await SecureStore.getItemAsync(TOKEN_KEY);
      set({
        token,
        isAuthenticated: !!token,
        isLoading: false,
      });
    } catch {
      set({ token: null, isAuthenticated: false, isLoading: false });
    }
  },

  login: async (password: string) => {
    try {
      const res = await api<{ success: boolean; token: string }>(
        '/api/auth/login',
        { method: 'POST', body: { password } }
      );

      if (res.success && res.token) {
        await SecureStore.setItemAsync(TOKEN_KEY, res.token);
        set({ token: res.token, isAuthenticated: true });
        return true;
      }
      return false;
    } catch {
      return false;
    }
  },

  logout: async () => {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    set({ token: null, isAuthenticated: false });
    router.replace('/auth/login');
  },
}));
```

### 7.2 인증 가드 (Admin Layout)

```typescript
// app/(admin)/_layout.tsx
import { useAuthStore } from '@/stores/authStore';
import { Redirect, Tabs } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';

export default function AdminLayout() {
  const { isAuthenticated, isLoading, loadToken } = useAuthStore();

  useEffect(() => {
    loadToken();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#8B00FF" />
      </View>
    );
  }

  if (!isAuthenticated) {
    return <Redirect href="/auth/login" />;
  }

  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: '#8B00FF' }}>
      <Tabs.Screen
        name="inquiries"
        options={{ title: '문의관리', tabBarIcon: /* 아이콘 */ }}
      />
      <Tabs.Screen
        name="chats"
        options={{ title: '대화관리', tabBarIcon: /* 아이콘 */ }}
      />
      <Tabs.Screen
        name="settings"
        options={{ title: '설정', tabBarIcon: /* 아이콘 */ }}
      />
    </Tabs>
  );
}
```

### 7.3 로그인 화면

```typescript
// app/auth/login.tsx
import { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  Alert, KeyboardAvoidingView, Platform,
} from 'react-native';
import { useAuthStore } from '@/stores/authStore';
import { router } from 'expo-router';

export default function LoginScreen() {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const login = useAuthStore((s) => s.login);

  const handleLogin = async () => {
    if (!password.trim()) {
      Alert.alert('오류', '비밀번호를 입력해주세요');
      return;
    }

    setLoading(true);
    const success = await login(password);
    setLoading(false);

    if (success) {
      router.replace('/(admin)/inquiries');
    } else {
      Alert.alert('오류', '비밀번호가 일치하지 않습니다');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1, backgroundColor: '#000' }}
    >
      <View style={{ flex: 1, justifyContent: 'center', padding: 24 }}>
        <Text style={{
          color: '#fff', fontSize: 28, fontWeight: '900',
          textAlign: 'center', marginBottom: 8,
        }}>
          APEX STUDIO
        </Text>
        <Text style={{
          color: '#8B00FF', fontSize: 14, fontWeight: '600',
          textAlign: 'center', marginBottom: 40,
        }}>
          관리자 로그인
        </Text>

        <TextInput
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholder="비밀번호를 입력하세요"
          placeholderTextColor="#666"
          style={{
            backgroundColor: '#1a1a1a', borderRadius: 12,
            padding: 16, color: '#fff', fontSize: 16,
            marginBottom: 16,
          }}
          onSubmitEditing={handleLogin}
        />

        <TouchableOpacity
          onPress={handleLogin}
          disabled={loading}
          style={{
            backgroundColor: '#8B00FF', borderRadius: 12,
            padding: 16, opacity: loading ? 0.5 : 1,
          }}
        >
          <Text style={{
            color: '#fff', textAlign: 'center',
            fontSize: 16, fontWeight: '700',
          }}>
            {loading ? '로그인 중...' : '로그인'}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
```

---

## 8. 주요 기능별 구현 가이드

### 8.1 홈 화면 (스크롤 섹션)

**웹과 차이점:**
- 웹: Framer Motion `whileInView` → 앱: `react-native-reanimated` + `entering` 애니메이션
- 웹: Swiper.js → 앱: `FlatList` horizontal 또는 `react-native-pager-view`
- 웹: CSS Grid/Masonry → 앱: `FlatList` numColumns

```typescript
// components/home/StatsSection.tsx
import { View, Text } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { useCountUp } from '@/hooks/useCountUp';

const STATS = [
  { value: 50, suffix: '+', label: '완료 프로젝트' },
  { value: 20, suffix: '+', label: '유지보수 계약' },
  { value: 4.9, suffix: '', label: '고객 만족도' },
];

export default function StatsSection() {
  return (
    <Animated.View entering={FadeInUp.duration(700).delay(300)}>
      <View style={{
        flexDirection: 'row', justifyContent: 'space-around',
        paddingVertical: 40, paddingHorizontal: 20,
      }}>
        {STATS.map((stat, i) => {
          const count = useCountUp(stat.value);
          return (
            <View key={i} style={{ alignItems: 'center' }}>
              <Text style={{
                color: '#8B00FF', fontSize: 36, fontWeight: '900',
              }}>
                {count}{stat.suffix}
              </Text>
              <Text style={{ color: '#ccc', fontSize: 14, marginTop: 4 }}>
                {stat.label}
              </Text>
            </View>
          );
        })}
      </View>
    </Animated.View>
  );
}
```

### 8.2 포트폴리오 목록

```typescript
// app/(public)/portfolio/index.tsx
import { useState } from 'react';
import { View, FlatList } from 'react-native';
import { PORTFOLIO_WORKS } from '@/lib/constants';
import PortfolioCard from '@/components/portfolio/PortfolioCard';
import PortfolioFilter from '@/components/portfolio/PortfolioFilter';

export default function PortfolioScreen() {
  const [selectedType, setSelectedType] = useState('전체');
  const [selectedIndustry, setSelectedIndustry] = useState('전체');

  const filtered = PORTFOLIO_WORKS.filter((item) => {
    const typeMatch = selectedType === '전체' || item.type === selectedType;
    const indMatch = selectedIndustry === '전체' || item.industry === selectedIndustry;
    return typeMatch && indMatch;
  });

  return (
    <View style={{ flex: 1, backgroundColor: '#000' }}>
      <PortfolioFilter
        selectedType={selectedType}
        selectedIndustry={selectedIndustry}
        onTypeChange={setSelectedType}
        onIndustryChange={setSelectedIndustry}
      />
      <FlatList
        data={filtered}
        numColumns={2}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PortfolioCard item={item} />}
        contentContainerStyle={{ padding: 12 }}
      />
    </View>
  );
}
```

### 8.3 8단계 문의 위자드

```typescript
// app/(public)/contact/index.tsx
import { useState } from 'react';
import { View, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { wizardInquirySchema, WizardInquiryInput } from '@/lib/validations';
import { api } from '@/lib/api';
import WizardProgress from '@/components/contact/WizardProgress';
import WizardNavigation from '@/components/contact/WizardNavigation';
import Step1Name from '@/components/contact/steps/Step1Name';
import Step2Phone from '@/components/contact/steps/Step2Phone';
// ... Step3~Step8

const STEPS = [Step1Name, Step2Phone, /* ... Step3~Step8 */];

export default function ContactScreen() {
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const methods = useForm<WizardInquiryInput>({
    resolver: zodResolver(wizardInquirySchema),
    defaultValues: {
      name: '', phone: '', email: '', business: '',
      homepageType: '', homepagePrice: '',
      additionalOption: '', additionalPrice: '',
      message: '', referenceLink: '', fileName: '',
    },
  });

  const CurrentStep = STEPS[step];

  const handleNext = () => {
    if (step < STEPS.length - 1) setStep(step + 1);
  };

  const handlePrev = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleSubmit = methods.handleSubmit(async (data) => {
    setSubmitting(true);
    try {
      await api('/api/inquiries', { method: 'POST', body: data });
      Alert.alert('완료', '문의가 성공적으로 접수되었습니다!');
      methods.reset();
      setStep(0);
    } catch {
      Alert.alert('오류', '문의 접수에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setSubmitting(false);
    }
  });

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1, backgroundColor: '#000' }}
    >
      <WizardProgress currentStep={step} totalSteps={STEPS.length} />
      <FormProvider {...methods}>
        <View style={{ flex: 1, padding: 20 }}>
          <CurrentStep />
        </View>
      </FormProvider>
      <WizardNavigation
        step={step}
        totalSteps={STEPS.length}
        onPrev={handlePrev}
        onNext={handleNext}
        onSubmit={handleSubmit}
        submitting={submitting}
      />
    </KeyboardAvoidingView>
  );
}
```

### 8.4 챗봇

```typescript
// app/(public)/chatbot/index.tsx
import { useState, useCallback, useRef, useEffect } from 'react';
import {
  View, FlatList, TextInput, TouchableOpacity, Text,
  KeyboardAvoidingView, Platform,
} from 'react-native';
import { GREETING_MESSAGE, NO_RESULT_MESSAGE, searchFAQ } from '@/lib/faqData';
import { api } from '@/lib/api';
import MessageBubble from '@/components/chatbot/MessageBubble';
import CategoryButtons from '@/components/chatbot/CategoryButtons';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ChatMessage {
  id: number;
  type: 'user' | 'bot';
  content: string;
}

const SESSION_KEY = 'apex_chat_session_id';
let messageId = 0;

export default function ChatbotScreen() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: ++messageId, type: 'bot', content: GREETING_MESSAGE },
  ]);
  const [input, setInput] = useState('');
  const sessionIdRef = useRef<string | null>(null);
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    initSession();
  }, []);

  const initSession = async () => {
    const stored = await AsyncStorage.getItem(SESSION_KEY);
    if (stored) {
      sessionIdRef.current = stored;
      return;
    }
    try {
      const { id } = await api<{ id: string }>('/api/chat/sessions', {
        method: 'POST',
      });
      sessionIdRef.current = id;
      await AsyncStorage.setItem(SESSION_KEY, id);
    } catch {}
  };

  const saveMsg = (sender: 'user' | 'bot', content: string) => {
    const sid = sessionIdRef.current;
    if (!sid) return;
    api('/api/chat/messages', {
      method: 'POST',
      body: { sessionId: sid, sender, content },
    }).catch(() => {});
  };

  const addMessages = useCallback((...msgs: ChatMessage[]) => {
    setMessages((prev) => [...prev, ...msgs]);
    setTimeout(() => flatListRef.current?.scrollToEnd(), 100);
  }, []);

  const handleSend = () => {
    if (!input.trim()) return;
    const text = input.trim();
    setInput('');

    const userMsg: ChatMessage = { id: ++messageId, type: 'user', content: text };
    saveMsg('user', text);

    const results = searchFAQ(text);
    if (results.length > 0) {
      const answer = results
        .map((r) => `Q. ${r.question}\nA. ${r.answer}`)
        .join('\n\n');
      const botMsg: ChatMessage = { id: ++messageId, type: 'bot', content: answer };
      addMessages(userMsg, botMsg);
      saveMsg('bot', answer);
    } else {
      const botMsg: ChatMessage = {
        id: ++messageId, type: 'bot', content: NO_RESULT_MESSAGE,
      };
      addMessages(userMsg, botMsg);
      saveMsg('bot', NO_RESULT_MESSAGE);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1, backgroundColor: '#f5f5f5' }}
    >
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <MessageBubble message={item} />}
        contentContainerStyle={{ padding: 16 }}
      />

      <CategoryButtons
        onSelect={(category) => {
          const userMsg: ChatMessage = {
            id: ++messageId, type: 'user', content: category,
          };
          const botMsg: ChatMessage = {
            id: ++messageId, type: 'bot',
            content: `[${category}] 카테고리입니다. 아래에서 궁금한 질문을 선택해 주세요.`,
          };
          addMessages(userMsg, botMsg);
          saveMsg('user', category);
          saveMsg('bot', botMsg.content);
        }}
      />

      <View style={{
        flexDirection: 'row', padding: 12,
        backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#e5e5e5',
      }}>
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder="키워드를 입력하세요"
          style={{
            flex: 1, backgroundColor: '#f0f0f0', borderRadius: 20,
            paddingHorizontal: 16, paddingVertical: 10, fontSize: 14,
          }}
          onSubmitEditing={handleSend}
          returnKeyType="send"
        />
        <TouchableOpacity
          onPress={handleSend}
          style={{
            backgroundColor: '#8B00FF', borderRadius: 20,
            paddingHorizontal: 20, justifyContent: 'center', marginLeft: 8,
          }}
        >
          <Text style={{ color: '#fff', fontWeight: '700' }}>전송</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
```

### 8.5 문의 관리 (관리자)

```typescript
// app/(admin)/inquiries/index.tsx
import { useEffect, useCallback } from 'react';
import { View, FlatList, Text, RefreshControl } from 'react-native';
import { router } from 'expo-router';
import { useInquiryStore } from '@/stores/inquiryStore';
import InquiryCard from '@/components/admin/InquiryCard';
import InquiryFilters from '@/components/admin/InquiryFilters';
import LoadingSpinner from '@/components/common/LoadingSpinner';

export default function InquiriesScreen() {
  const {
    items, total, loading, page, totalPages,
    status, search,
    fetchItems, setStatus, setSearch, setPage,
  } = useInquiryStore();

  useEffect(() => {
    fetchItems();
  }, [page, status, search]);

  const handleEndReached = () => {
    if (!loading && page < totalPages) {
      setPage(page + 1);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#f9fafb' }}>
      <View style={{ paddingHorizontal: 16, paddingTop: 16 }}>
        <Text style={{ fontSize: 20, fontWeight: '700', color: '#111' }}>
          문의 관리
        </Text>
        <Text style={{ fontSize: 13, color: '#6b7280', marginTop: 2 }}>
          총 {total}건
        </Text>
      </View>

      <InquiryFilters
        status={status}
        search={search}
        onStatusChange={setStatus}
        onSearchChange={setSearch}
      />

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <InquiryCard
            item={item}
            onPress={() => router.push(`/(admin)/inquiries/${item.id}`)}
          />
        )}
        contentContainerStyle={{ padding: 16, gap: 12 }}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={fetchItems} />
        }
        ListEmptyComponent={
          !loading ? (
            <Text style={{ textAlign: 'center', color: '#9ca3af', marginTop: 40 }}>
              문의 내역이 없습니다
            </Text>
          ) : null
        }
        ListFooterComponent={loading ? <LoadingSpinner /> : null}
      />
    </View>
  );
}
```

### 8.6 대화 상세 (관리자)

```typescript
// app/(admin)/chats/[id].tsx
import { useEffect, useState } from 'react';
import {
  View, Text, FlatList, TextInput, TouchableOpacity,
  Alert, ScrollView, ActivityIndicator,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { api } from '@/lib/api';
import type { ChatSessionDetailItem, ChatSessionStatus } from '@/types/chat';
import MessageBubble from '@/components/chatbot/MessageBubble';

const STATUS_OPTIONS: { value: ChatSessionStatus; label: string }[] = [
  { value: 'ACTIVE', label: '진행중' },
  { value: 'CLOSED', label: '종료' },
  { value: 'ARCHIVED', label: '보관' },
];

export default function ChatDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [session, setSession] = useState<ChatSessionDetailItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<ChatSessionStatus>('ACTIVE');
  const [memo, setMemo] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchDetail();
  }, [id]);

  const fetchDetail = async () => {
    try {
      const data = await api<ChatSessionDetailItem>(
        `/api/chat/sessions/admin/${id}`,
        { auth: true }
      );
      setSession(data);
      setStatus(data.status);
      setMemo(data.memo);
    } catch {
      Alert.alert('오류', '대화를 불러올 수 없습니다');
      router.back();
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await api(`/api/chat/sessions/admin/${id}`, {
        method: 'PATCH',
        auth: true,
        body: { status, memo },
      });
      Alert.alert('완료', '저장되었습니다');
    } catch {
      Alert.alert('오류', '저장에 실패했습니다');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = () => {
    Alert.alert('삭제', '정말 삭제하시겠습니까?', [
      { text: '취소', style: 'cancel' },
      {
        text: '삭제',
        style: 'destructive',
        onPress: async () => {
          try {
            await api(`/api/chat/sessions/admin/${id}`, {
              method: 'DELETE',
              auth: true,
            });
            router.back();
          } catch {
            Alert.alert('오류', '삭제에 실패했습니다');
          }
        },
      },
    ]);
  };

  if (loading || !session) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#8B00FF" />
      </View>
    );
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#f9fafb' }}>
      {/* 채팅 내역 */}
      <View style={{
        backgroundColor: '#fff', margin: 16, borderRadius: 12,
        padding: 16, maxHeight: 400,
      }}>
        <FlatList
          data={session.messages}
          keyExtractor={(m) => m.id}
          renderItem={({ item }) => (
            <MessageBubble message={{ id: 0, type: item.sender as 'user' | 'bot', content: item.content }} />
          )}
          scrollEnabled={false}
        />
      </View>

      {/* 관리 영역 */}
      <View style={{
        backgroundColor: '#fff', margin: 16, marginTop: 0,
        borderRadius: 12, padding: 16,
      }}>
        <Text style={{ fontSize: 14, fontWeight: '600', marginBottom: 12 }}>
          관리
        </Text>

        {/* 상태 변경 */}
        <Text style={{ fontSize: 12, color: '#6b7280', marginBottom: 8 }}>
          상태 변경
        </Text>
        <View style={{ flexDirection: 'row', gap: 8, marginBottom: 16 }}>
          {STATUS_OPTIONS.map((opt) => (
            <TouchableOpacity
              key={opt.value}
              onPress={() => setStatus(opt.value)}
              style={{
                paddingHorizontal: 14, paddingVertical: 6,
                borderRadius: 20, borderWidth: 1,
                backgroundColor: status === opt.value ? '#8B00FF' : '#fff',
                borderColor: status === opt.value ? '#8B00FF' : '#d1d5db',
              }}
            >
              <Text style={{
                fontSize: 12, fontWeight: '600',
                color: status === opt.value ? '#fff' : '#4b5563',
              }}>
                {opt.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* 메모 */}
        <Text style={{ fontSize: 12, color: '#6b7280', marginBottom: 8 }}>
          관리자 메모
        </Text>
        <TextInput
          value={memo}
          onChangeText={setMemo}
          placeholder="메모를 입력하세요"
          multiline
          style={{
            borderWidth: 1, borderColor: '#d1d5db', borderRadius: 8,
            padding: 12, fontSize: 14, minHeight: 80,
            textAlignVertical: 'top', marginBottom: 16,
          }}
        />

        {/* 버튼 */}
        <TouchableOpacity
          onPress={handleSave}
          disabled={saving}
          style={{
            backgroundColor: '#8B00FF', borderRadius: 8,
            padding: 14, opacity: saving ? 0.5 : 1,
          }}
        >
          <Text style={{ color: '#fff', textAlign: 'center', fontWeight: '700' }}>
            {saving ? '저장 중...' : '저장'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleDelete}
          style={{ marginTop: 12, padding: 14 }}
        >
          <Text style={{ color: '#ef4444', textAlign: 'center', fontSize: 14 }}>
            삭제
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
```

---

## 9. 푸시 알림 구현

### 9.1 개요

새 문의가 접수되면 관리자 앱에 푸시 알림을 보내는 기능입니다.

### 9.2 아키텍처

```
[방문자가 문의 폼 제출]
       ↓
[POST /api/inquiries]
       ↓
[Prisma: inquiry.create()]
       ↓
[서버: Expo Push API 호출]  ← 새로 추가
       ↓
[Expo Push Service]
       ↓
[FCM (Android) / APNs (iOS)]
       ↓
[관리자 앱에 푸시 알림 표시]
```

### 9.3 앱 측 구현

```typescript
// hooks/usePushNotifications.ts
import { useEffect, useRef, useState } from 'react';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';
import { api } from '@/lib/api';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export function usePushNotifications() {
  const [expoPushToken, setExpoPushToken] = useState<string | null>(null);
  const notificationListener = useRef<Notifications.EventSubscription>();
  const responseListener = useRef<Notifications.EventSubscription>();

  useEffect(() => {
    registerForPushNotifications().then((token) => {
      if (token) {
        setExpoPushToken(token);
        // 서버에 토큰 등록
        api('/api/push/register', {
          method: 'POST',
          auth: true,
          body: { pushToken: token },
        }).catch(() => {});
      }
    });

    // 포그라운드 알림 수신
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        // 알림 수신 처리
      });

    // 알림 탭 시 반응
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        const data = response.notification.request.content.data;
        // data.type에 따라 해당 화면으로 이동
        if (data.type === 'inquiry') {
          // router.push(`/(admin)/inquiries/${data.id}`);
        }
      });

    return () => {
      notificationListener.current?.remove();
      responseListener.current?.remove();
    };
  }, []);

  return expoPushToken;
}

async function registerForPushNotifications() {
  if (!Device.isDevice) return null;

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') return null;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
    });
  }

  const tokenData = await Notifications.getExpoPushTokenAsync({
    projectId: 'your-expo-project-id',
  });

  return tokenData.data;
}
```

### 9.4 서버 측 구현 (웹 프로젝트에 추가)

```typescript
// 서버에 추가할 파일들:

// 1. DB 모델 추가 (prisma/schema.prisma)
// model PushToken {
//   id        String   @id @default(cuid())
//   token     String   @unique
//   createdAt DateTime @default(now()) @map("created_at")
//   @@map("push_tokens")
// }

// 2. 푸시 토큰 등록 API (app/api/push/register/route.ts)
// POST: pushToken 저장

// 3. 푸시 발송 유틸 (lib/push.ts)
// import { Expo } from 'expo-server-sdk';
// const expo = new Expo();
//
// export async function sendPushToAdmins(title: string, body: string, data?: object) {
//   const tokens = await prisma.pushToken.findMany();
//   const messages = tokens.map((t) => ({
//     to: t.token,
//     sound: 'default',
//     title,
//     body,
//     data,
//   }));
//   const chunks = expo.chunkPushNotifications(messages);
//   for (const chunk of chunks) {
//     await expo.sendPushNotificationsAsync(chunk);
//   }
// }

// 4. 문의 접수 시 푸시 발송 (app/api/inquiries/route.ts 수정)
// POST handler에 추가:
// await sendPushToAdmins(
//   '새 문의 접수',
//   `${data.name}님이 문의를 보냈습니다`,
//   { type: 'inquiry', id: inquiry.id }
// );
```

---

## 10. 디자인 시스템 이식

### 10.1 색상 체계

```typescript
// lib/theme.ts
export const colors = {
  bg: '#000000',
  primary: '#8B00FF',
  primaryLight: '#9933FF',
  primaryDark: '#6600CC',
  accent: '#CC44FF',
  text: '#FFFFFF',
  textSub: '#CCCCCC',

  // 관리자 추가 색상
  white: '#FFFFFF',
  gray50: '#F9FAFB',
  gray100: '#F3F4F6',
  gray200: '#E5E7EB',
  gray300: '#D1D5DB',
  gray400: '#9CA3AF',
  gray500: '#6B7280',
  gray600: '#4B5563',
  gray700: '#374151',
  gray800: '#1F2937',
  gray900: '#111827',

  red500: '#EF4444',
  green500: '#22C55E',
  blue500: '#3B82F6',
} as const;
```

### 10.2 NativeWind (Tailwind for RN)

```typescript
// tailwind.config.ts (NativeWind용)
module.exports = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#8B00FF',
        'primary-light': '#9933FF',
        'primary-dark': '#6600CC',
        accent: '#CC44FF',
      },
      fontFamily: {
        'noto': ['NotoSansKR-Regular'],
        'noto-bold': ['NotoSansKR-Bold'],
        'noto-black': ['NotoSansKR-Black'],
      },
    },
  },
};
```

### 10.3 폰트 로딩

```typescript
// app/_layout.tsx
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'NotoSansKR-Regular': require('@/assets/fonts/NotoSansKR-Regular.ttf'),
    'NotoSansKR-Bold': require('@/assets/fonts/NotoSansKR-Bold.ttf'),
    'NotoSansKR-Black': require('@/assets/fonts/NotoSansKR-Black.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return <Slot />;
}
```

---

## 11. 개발 환경 설정

### 11.1 사전 요구사항

| 항목 | 요구사항 |
|------|---------|
| Node.js | v18 이상 |
| npm/yarn | 최신 버전 |
| Expo CLI | `npx expo` (설치 불필요) |
| iOS 시뮬레이터 | Xcode 15+ (macOS) |
| Android 에뮬레이터 | Android Studio + AVD |
| Expo Go 앱 | 실기기 테스트용 (App Store/Play Store) |

### 11.2 프로젝트 초기화

```bash
# 1. Expo 프로젝트 생성
npx create-expo-app apex-studio-app --template tabs

# 2. 필수 패키지 설치
npx expo install expo-router expo-secure-store expo-notifications
npx expo install expo-image expo-font expo-splash-screen
npx expo install react-native-reanimated react-native-gesture-handler
npx expo install @react-native-async-storage/async-storage

# 3. 추가 패키지
npm install zustand react-hook-form @hookform/resolvers zod
npm install nativewind tailwindcss

# 4. 웹 프로젝트에서 파일 복사
cp ../APEX-STUDIO-WebApp/types/inquiry.ts types/
cp ../APEX-STUDIO-WebApp/types/chat.ts types/
cp ../APEX-STUDIO-WebApp/lib/validations.ts lib/
cp ../APEX-STUDIO-WebApp/lib/constants.ts lib/
cp ../APEX-STUDIO-WebApp/lib/faqData.ts lib/

# 5. 개발 서버 실행
npx expo start
```

### 11.3 app.json 설정

```json
{
  "expo": {
    "name": "APEX STUDIO",
    "slug": "apex-studio",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "scheme": "apex-studio",
    "userInterfaceStyle": "dark",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#000000"
    },
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "kr.apex-studio.app",
      "infoPlist": {
        "NSCameraUsageDescription": "파일 첨부를 위해 카메라 접근이 필요합니다"
      }
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#000000"
      },
      "package": "kr.apexstudio.app",
      "googleServicesFile": "./google-services.json"
    },
    "plugins": [
      "expo-router",
      "expo-secure-store",
      [
        "expo-notifications",
        {
          "icon": "./assets/notification-icon.png",
          "color": "#8B00FF"
        }
      ]
    ],
    "extra": {
      "eas": {
        "projectId": "your-eas-project-id"
      }
    }
  }
}
```

### 11.4 eas.json 설정

```json
{
  "cli": {
    "version": ">= 12.0.0"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal",
      "ios": {
        "simulator": true
      }
    },
    "preview": {
      "distribution": "internal"
    },
    "production": {
      "autoIncrement": true
    }
  },
  "submit": {
    "production": {
      "ios": {
        "appleId": "your-apple-id@email.com",
        "ascAppId": "your-app-store-connect-id"
      },
      "android": {
        "serviceAccountKeyPath": "./google-play-key.json"
      }
    }
  }
}
```

---

## 12. 단계별 구현 로드맵

### Phase 1: 프로젝트 셋업 (1~2일)

| 작업 | 상세 |
|------|------|
| Expo 프로젝트 생성 | `create-expo-app` + TypeScript 템플릿 |
| 패키지 설치 | 위 11.2 참조 |
| 웹 공유 파일 복사 | types, validations, constants, faqData |
| NativeWind 설정 | tailwind.config.ts + babel 설정 |
| 폰트 로딩 | Noto Sans KR 3종 |
| 테마 설정 | 색상 상수 파일 |
| API 클라이언트 작성 | lib/api.ts (fetch wrapper) |
| Expo Router 기본 구조 | _layout.tsx, 그룹 폴더 생성 |

### Phase 2: 서버 수정 (1일)

| 작업 | 상세 |
|------|------|
| middleware.ts 수정 | Authorization Bearer 토큰 지원 추가 |
| login API 수정 | 응답에 token 필드 추가 |
| CORS 설정 | next.config.mjs에 앱 도메인 허용 |

### Phase 3: 인증 시스템 (1일)

| 작업 | 상세 |
|------|------|
| authStore.ts | Zustand + SecureStore |
| 로그인 화면 | auth/login.tsx |
| 인증 가드 | (admin)/_layout.tsx에서 토큰 확인 |
| 로그아웃 기능 | settings/index.tsx |

### Phase 4: 공개 영역 - 홈 (2~3일)

| 작업 | 상세 |
|------|------|
| 홈 ScrollView | 섹션별 컴포넌트 배치 |
| Hero 섹션 | 그라디언트 바 + 타이틀 + CTA |
| Stats 섹션 | 카운트업 애니메이션 |
| Portfolio 슬라이더 | FlatList horizontal |
| AI 갤러리 | FlatList numColumns=2 |
| 스토리텔링 섹션 | S05~S12 스크롤 애니메이션 |
| 연락처 섹션 | 전화/이메일/카카오 링크 |

### Phase 5: 공개 영역 - 포트폴리오 (1~2일)

| 작업 | 상세 |
|------|------|
| 포트폴리오 목록 | FlatList + 필터 칩 |
| 카테고리별 화면 | [category].tsx 동적 라우트 |
| 포트폴리오 카드 | Image + 텍스트 + 태그 |

### Phase 6: 공개 영역 - 문의 폼 (1~2일)

| 작업 | 상세 |
|------|------|
| 위자드 프레임 | 진행바 + 네비게이션 버튼 |
| Step 1~8 | 각 단계 입력 필드 |
| 검증 연동 | React Hook Form + Zod |
| 제출 처리 | API 호출 + 완료 화면 |

### Phase 7: 공개 영역 - 챗봇 (1일)

| 작업 | 상세 |
|------|------|
| 챗봇 전체화면 | FlatList 메시지 + 입력창 |
| 카테고리 버튼 | FAQ 카테고리 선택 |
| 키워드 검색 | searchFAQ 연동 |
| 세션 관리 | AsyncStorage + API 연동 |

### Phase 8: 관리자 영역 (2~3일)

| 작업 | 상세 |
|------|------|
| 문의 목록 | FlatList + 무한스크롤 + 필터 |
| 문의 상세 | 정보 표시 + 상태변경 + 메모 + 삭제 |
| 대화 목록 | FlatList + 무한스크롤 + 필터 |
| 대화 상세 | 채팅 뷰 + 관리 기능 |
| 설정 화면 | 로그아웃 + 앱 정보 |

### Phase 9: 푸시 알림 (1~2일)

| 작업 | 상세 |
|------|------|
| 알림 권한 요청 | expo-notifications |
| 토큰 서버 등록 | PushToken 모델 + API |
| 서버 발송 로직 | expo-server-sdk |
| 알림 탭 네비게이션 | 알림 클릭 시 해당 화면 이동 |

### Phase 10: 테스트 & 배포 (2~3일)

| 작업 | 상세 |
|------|------|
| 기기 테스트 | iOS 시뮬레이터 + Android 에뮬레이터 + 실기기 |
| EAS Build | Preview 빌드 → 내부 배포 |
| 앱스토어 심사 | App Store Connect + Google Play Console |
| 프로덕션 배포 | EAS Submit |

### 전체 일정 요약

| Phase | 기간 | 누적 |
|-------|------|------|
| Phase 1: 셋업 | 1~2일 | 2일 |
| Phase 2: 서버 수정 | 1일 | 3일 |
| Phase 3: 인증 | 1일 | 4일 |
| Phase 4: 홈 | 2~3일 | 7일 |
| Phase 5: 포트폴리오 | 1~2일 | 9일 |
| Phase 6: 문의 폼 | 1~2일 | 11일 |
| Phase 7: 챗봇 | 1일 | 12일 |
| Phase 8: 관리자 | 2~3일 | 15일 |
| Phase 9: 푸시 알림 | 1~2일 | 17일 |
| Phase 10: 배포 | 2~3일 | **약 20일** |

---

## 13. 테스트 전략

### 13.1 테스트 레벨

| 레벨 | 도구 | 대상 |
|------|------|------|
| 단위 테스트 | Jest | Zod 검증, 유틸 함수, Zustand 스토어 |
| 컴포넌트 테스트 | React Native Testing Library | 개별 컴포넌트 렌더링/인터랙션 |
| E2E 테스트 | Detox 또는 Maestro | 전체 플로우 (로그인→목록→상세) |
| 수동 테스트 | 실기기 | UI/UX, 제스처, 애니메이션 |

### 13.2 핵심 테스트 시나리오

```
1. 공개 영역:
   ✓ 홈 화면 스크롤 → 각 섹션 정상 표시
   ✓ 포트폴리오 필터 → 결과 정상 필터링
   ✓ 문의 위자드 → 8단계 완료 → API 제출 성공
   ✓ 챗봇 → 카테고리 선택 → 응답 표시
   ✓ 챗봇 → 키워드 검색 → 결과 표시
   ✓ 챗봇 → 세션 생성 → AsyncStorage 저장

2. 인증:
   ✓ 잘못된 비밀번호 → 에러 메시지
   ✓ 올바른 비밀번호 → 토큰 저장 → 관리자 화면 이동
   ✓ 토큰 없이 관리자 접근 → 로그인 리다이렉트
   ✓ 로그아웃 → 토큰 삭제 → 로그인 화면

3. 관리자:
   ✓ 문의 목록 로딩 → 데이터 표시
   ✓ 상태 필터 → 필터링 동작
   ✓ 검색 → 결과 표시
   ✓ 무한 스크롤 → 추가 데이터 로딩
   ✓ 문의 상세 → 정보 표시
   ✓ 상태 변경 + 메모 → PATCH 성공
   ✓ 삭제 → 확인 다이얼로그 → DELETE 성공
   ✓ 대화 목록/상세 → 동일 패턴

4. 푸시 알림:
   ✓ 권한 요청 → 토큰 발급 → 서버 등록
   ✓ 새 문의 → 푸시 수신
   ✓ 알림 탭 → 해당 화면 이동
```

---

## 14. 배포 가이드

### 14.1 EAS Build 설정

```bash
# EAS CLI 설치
npm install -g eas-cli

# Expo 계정 로그인
eas login

# 프로젝트 연결
eas init

# 개발용 빌드 (시뮬레이터)
eas build --profile development --platform ios
eas build --profile development --platform android

# 프리뷰 빌드 (내부 테스트)
eas build --profile preview --platform all

# 프로덕션 빌드
eas build --profile production --platform all
```

### 14.2 앱스토어 배포

#### iOS (App Store)

```
1. Apple Developer Program 가입 ($99/년)
2. App Store Connect에서 앱 생성
   - 번들 ID: kr.apex-studio.app
   - 앱 이름: APEX STUDIO
   - 카테고리: 비즈니스
3. 인증서/프로비저닝 설정
   - EAS가 자동 관리 (Managed credentials)
4. 제출:
   eas submit --platform ios
5. 심사 대기 (1~3일)
6. 출시
```

#### Android (Google Play)

```
1. Google Play Console 등록 ($25 일회성)
2. 앱 생성
   - 패키지명: kr.apexstudio.app
   - 앱 이름: APEX STUDIO
3. 서비스 계정 키 생성 (JSON)
4. 제출:
   eas submit --platform android
5. 심사 대기 (수 시간~수 일)
6. 출시
```

### 14.3 OTA 업데이트 (EAS Update)

```bash
# 코드 변경 후 즉시 업데이트 (앱스토어 심사 없이)
# ※ JS/TS 코드 변경만 가능 (네이티브 모듈 변경 시 새 빌드 필요)

eas update --branch production --message "챗봇 FAQ 추가"
```

---

## 15. 유지보수 가이드

### 15.1 웹-앱 코드 공유 전략

```
공유 가능한 파일 (웹에서 앱으로 복사):
├── types/inquiry.ts       ← 타입 정의
├── types/chat.ts          ← 타입 정의
├── lib/validations.ts     ← Zod 스키마
├── lib/constants.ts       ← 포트폴리오 데이터, 가격 데이터
└── lib/faqData.ts         ← 챗봇 FAQ 데이터

공유 불가능한 파일 (플랫폼별 구현):
├── 컴포넌트              ← React DOM vs React Native
├── 라우팅               ← Next.js App Router vs Expo Router
├── 스타일링             ← Tailwind CSS vs NativeWind/StyleSheet
├── 인증 저장            ← Cookie vs SecureStore
└── 애니메이션           ← Framer Motion vs Reanimated
```

### 15.2 동기화 체크리스트

웹 변경 시 앱도 업데이트가 필요한 항목:

| 웹 변경사항 | 앱 업데이트 필요 여부 |
|------------|---------------------|
| FAQ 데이터 추가/수정 | O — faqData.ts 복사 |
| 포트폴리오 추가/수정 | O — constants.ts 복사 |
| 가격 플랜 변경 | O — constants.ts 복사 |
| API 엔드포인트 변경 | O — api.ts 수정 |
| DB 스키마 변경 | O — types 복사 + 화면 수정 |
| Zod 스키마 변경 | O — validations.ts 복사 |
| CSS 디자인 변경 | X — 앱은 별도 스타일 |
| SEO 메타 변경 | X — 앱에 해당 없음 |
| 웹 전용 컴포넌트 변경 | X — 앱은 별도 구현 |

### 15.3 모노레포 전환 (선택)

프로젝트 규모가 커지면 공유 코드 관리를 위해 모노레포로 전환할 수 있습니다:

```
apex-studio/
├── packages/
│   └── shared/                # 공유 패키지
│       ├── types/
│       │   ├── inquiry.ts
│       │   └── chat.ts
│       ├── validations.ts
│       ├── constants.ts
│       ├── faqData.ts
│       └── package.json
├── apps/
│   ├── web/                   # Next.js 웹
│   │   ├── app/
│   │   ├── components/
│   │   └── package.json
│   └── mobile/                # Expo 앱
│       ├── app/
│       ├── components/
│       └── package.json
├── package.json               # 루트 (workspaces)
└── turbo.json                 # Turborepo 설정
```

### 15.4 자주 발생하는 문제 & 해결

| 문제 | 원인 | 해결 |
|------|------|------|
| API 401 에러 | 토큰 만료 | 자동 갱신 또는 재로그인 유도 |
| 이미지 로딩 느림 | 원본 이미지 크기 | expo-image 캐싱 + 리사이즈 |
| 키보드가 입력 가림 | iOS/Android 차이 | KeyboardAvoidingView 사용 |
| 푸시 알림 미수신 | 토큰 미등록/만료 | 앱 재시작 시 토큰 재등록 |
| Android 뒤로가기 | 기본 동작 차이 | BackHandler 이벤트 처리 |
| 앱 심사 거부 | 메타데이터 부족 | 스크린샷, 설명 보완 |

---

## 부록 A: 웹 서버 수정 사항 요약

앱 지원을 위해 기존 웹 프로젝트에 필요한 수정사항:

| # | 파일 | 변경 내용 |
|---|------|----------|
| 1 | `middleware.ts` | Authorization Bearer 토큰 인증 추가 |
| 2 | `app/api/auth/login/route.ts` | 응답에 `token` 필드 추가 |
| 3 | `next.config.mjs` | CORS 허용 헤더 추가 (필요 시) |
| 4 | `prisma/schema.prisma` | PushToken 모델 추가 (푸시 알림 시) |
| 5 | `app/api/push/register/route.ts` | 신규 — 푸시 토큰 등록 |
| 6 | `lib/push.ts` | 신규 — Expo Push 발송 유틸 |
| 7 | `app/api/inquiries/route.ts` | POST 시 푸시 알림 발송 추가 |
| 8 | `package.json` | `expo-server-sdk` 의존성 추가 |

## 부록 B: 앱 패키지 전체 목록

```json
{
  "dependencies": {
    "expo": "~52.0.0",
    "expo-router": "~4.0.0",
    "expo-secure-store": "~14.0.0",
    "expo-notifications": "~0.29.0",
    "expo-image": "~2.0.0",
    "expo-font": "~13.0.0",
    "expo-splash-screen": "~0.29.0",
    "expo-device": "~7.0.0",
    "react": "18.3.1",
    "react-native": "0.76.0",
    "react-native-reanimated": "~3.16.0",
    "react-native-gesture-handler": "~2.20.0",
    "react-native-safe-area-context": "4.12.0",
    "react-native-screens": "~4.0.0",
    "@react-native-async-storage/async-storage": "2.1.0",
    "zustand": "^5.0.0",
    "react-hook-form": "^7.71.2",
    "@hookform/resolvers": "^3.9.0",
    "zod": "^4.3.6",
    "nativewind": "^4.1.0"
  },
  "devDependencies": {
    "@types/react": "~18.3.0",
    "typescript": "~5.6.0",
    "tailwindcss": "^3.4.0"
  }
}
```

## 부록 C: 참고 자료

| 자료 | URL |
|------|-----|
| Expo 공식 문서 | https://docs.expo.dev |
| Expo Router 가이드 | https://docs.expo.dev/router/introduction |
| EAS Build 가이드 | https://docs.expo.dev/build/introduction |
| React Native 공식 | https://reactnative.dev |
| NativeWind | https://www.nativewind.dev |
| Zustand | https://docs.pmnd.rs/zustand |
| React Hook Form | https://react-hook-form.com |
| Expo Notifications | https://docs.expo.dev/push-notifications/overview |

---

> 이 매뉴얼은 APEX STUDIO 웹 시스템 (2026-02-25 기준)을 기반으로 작성되었습니다.
> 웹 API가 변경되면 해당 섹션도 업데이트해야 합니다.
