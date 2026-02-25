export const SITE_NAME = "APEX STUDIO";
export const TAGLINE = "성공하는 디자인으로 매출을 만드는 에이전시";
export const CONTACT_EMAIL = "contact@apex-studio.kr";
export const KAKAO_CHANNEL = "@apex-studio";

export const STATS = [
  { label: "프로젝트", value: 50, suffix: "+" },
  { label: "유지보수", value: 20, suffix: "+" },
  { label: "고객 만족도", value: 4.9, suffix: "", decimal: true },
];

export const NAV_ITEMS = [
  { label: "APEX STUDIO", href: "/" },
  {
    label: "포트폴리오",
    href: "/portfolio",
    children: [
      { label: "홈페이지", href: "/portfolio" },
      { label: "상세페이지", href: "/portfolio/detail" },
      { label: "Ai컨텐츠", href: "/portfolio/ai" },
    ],
  },
  { label: "비용&기간", href: "/#pricing" },
  { label: "제작 과정", href: "/#process" },
  { label: "상담 신청", href: "/#contact" },
];

export const PORTFOLIO_ITEMS = [
  {
    category: "브랜드 쇼핑몰",
    name: "APEX 뷰티",
    desc: "프리미엄 뷰티 브랜드 홈페이지",
    img: "https://picsum.photos/800/450?random=1",
  },
  {
    category: "기업 홈페이지",
    name: "KTI 시스템",
    desc: "IT 솔루션 기업 홈페이지",
    img: "https://picsum.photos/800/450?random=2",
  },
  {
    category: "음식점/프랜차이즈",
    name: "APEX 피자",
    desc: "프랜차이즈 피자 브랜드 홈페이지",
    img: "https://picsum.photos/800/450?random=3",
  },
  {
    category: "병원/클리닉",
    name: "스튜디오 연",
    desc: "뷰티 클리닉 홈페이지",
    img: "https://picsum.photos/800/450?random=4",
  },
  {
    category: "전문 서비스",
    name: "새벽 월",
    desc: "아웃도어 브랜드 홈페이지",
    img: "https://picsum.photos/800/450?random=5",
  },
];

/* ── 포트폴리오 전체 목록 (별도 페이지용) ── */
export type PortfolioType = "전체" | "회사홈페이지" | "1P랜딩페이지" | "쇼핑몰" | "웹서비스";
export type IndustryType = "전체" | "일반" | "IT, 기술" | "F&B" | "건축, 인테리어" | "병원" | "뷰티" | "교육" | "제조";

export const PORTFOLIO_TYPES: PortfolioType[] = [
  "전체", "회사홈페이지", "1P랜딩페이지", "쇼핑몰", "웹서비스",
];

export const INDUSTRY_TYPES: IndustryType[] = [
  "전체", "일반", "IT, 기술", "F&B", "건축, 인테리어", "병원", "뷰티", "교육", "제조",
];

export interface PortfolioWork {
  id: string;
  name: string;
  desc: string;
  type: PortfolioType;
  industry: IndustryType;
  plan: string;
  tags: string[];
  img: string;
}

export const PORTFOLIO_WORKS: PortfolioWork[] = [
  {
    id: "1",
    name: "케이엠에스테틱",
    desc: "회사홈페이지",
    type: "회사홈페이지",
    industry: "뷰티",
    plan: "회사홈페이지",
    tags: ["고객 DB수집"],
    img: "https://picsum.photos/600/400?random=101",
  },
  {
    id: "2",
    name: "펠리체컴퍼니",
    desc: "회사홈페이지",
    type: "회사홈페이지",
    industry: "건축, 인테리어",
    plan: "회사홈페이지",
    tags: ["고객 DB수집", "포트폴리오"],
    img: "https://picsum.photos/600/400?random=102",
  },
  {
    id: "3",
    name: "어썸웰스파라운지",
    desc: "회사홈페이지",
    type: "회사홈페이지",
    industry: "뷰티",
    plan: "회사홈페이지",
    tags: ["고객 DB수집"],
    img: "https://picsum.photos/600/400?random=103",
  },
  {
    id: "4",
    name: "글로벌 IT솔루션",
    desc: "회사홈페이지",
    type: "회사홈페이지",
    industry: "IT, 기술",
    plan: "회사홈페이지",
    tags: ["포트폴리오", "고객 DB수집"],
    img: "https://picsum.photos/600/400?random=104",
  },
  {
    id: "5",
    name: "맛있는 한끼",
    desc: "1P랜딩페이지",
    type: "1P랜딩페이지",
    industry: "F&B",
    plan: "랜딩페이지",
    tags: ["이벤트", "고객 DB수집"],
    img: "https://picsum.photos/600/400?random=105",
  },
  {
    id: "6",
    name: "스마트 클리닉",
    desc: "회사홈페이지",
    type: "회사홈페이지",
    industry: "병원",
    plan: "회사홈페이지",
    tags: ["예약시스템", "고객 DB수집"],
    img: "https://picsum.photos/600/400?random=106",
  },
  {
    id: "7",
    name: "드림 인테리어",
    desc: "회사홈페이지",
    type: "회사홈페이지",
    industry: "건축, 인테리어",
    plan: "회사홈페이지",
    tags: ["포트폴리오"],
    img: "https://picsum.photos/600/400?random=107",
  },
  {
    id: "8",
    name: "프레시 마켓",
    desc: "쇼핑몰",
    type: "쇼핑몰",
    industry: "F&B",
    plan: "브랜드 쇼핑몰",
    tags: ["쇼핑몰", "결제시스템"],
    img: "https://picsum.photos/600/400?random=108",
  },
  {
    id: "9",
    name: "에듀플러스 아카데미",
    desc: "웹서비스",
    type: "웹서비스",
    industry: "교육",
    plan: "웹서비스",
    tags: ["회원시스템", "LMS"],
    img: "https://picsum.photos/600/400?random=109",
  },
  {
    id: "10",
    name: "미래 제조",
    desc: "회사홈페이지",
    type: "회사홈페이지",
    industry: "제조",
    plan: "회사홈페이지",
    tags: ["고객 DB수집", "카탈로그"],
    img: "https://picsum.photos/600/400?random=110",
  },
  {
    id: "11",
    name: "뷰티 라운지 서울",
    desc: "1P랜딩페이지",
    type: "1P랜딩페이지",
    industry: "뷰티",
    plan: "랜딩페이지",
    tags: ["이벤트", "고객 DB수집"],
    img: "https://picsum.photos/600/400?random=111",
  },
  {
    id: "12",
    name: "코드 팩토리",
    desc: "웹서비스",
    type: "웹서비스",
    industry: "IT, 기술",
    plan: "웹서비스",
    tags: ["SaaS", "대시보드"],
    img: "https://picsum.photos/600/400?random=112",
  },
];

export const AI_CONTENT_IMAGES = [
  { src: "https://picsum.photos/400/500?random=10", alt: "AI 제품 이미지 1" },
  { src: "https://picsum.photos/400/300?random=11", alt: "AI 라이프스타일 1" },
  { src: "https://picsum.photos/400/400?random=12", alt: "AI 제품 이미지 2" },
  { src: "https://picsum.photos/400/600?random=13", alt: "AI 인물 이미지" },
  { src: "https://picsum.photos/400/350?random=14", alt: "AI 음식 이미지" },
  { src: "https://picsum.photos/400/450?random=15", alt: "AI 공간 이미지" },
];

/* ── 상세페이지 포트폴리오 데이터 ── */
export type DetailCategory = "전체" | "쇼핑몰" | "제품" | "서비스" | "병원" | "뷰티" | "F&B" | "교육";

export const DETAIL_CATEGORIES: DetailCategory[] = [
  "전체", "쇼핑몰", "제품", "서비스", "병원", "뷰티", "F&B", "교육",
];

export interface DetailWork {
  id: string;
  name: string;
  category: DetailCategory;
  desc: string;
  tags: string[];
  img: string;
}

export const DETAIL_WORKS: DetailWork[] = [
  {
    id: "d1",
    name: "프리미엄 에센스 세럼",
    category: "뷰티",
    desc: "성분 강조 + 사용후기 중심 구성",
    tags: ["상세페이지", "전환 최적화"],
    img: "https://picsum.photos/600/800?random=201",
  },
  {
    id: "d2",
    name: "오가닉 그래놀라",
    category: "F&B",
    desc: "원재료 스토리텔링 + 영양정보 시각화",
    tags: ["상세페이지", "식품"],
    img: "https://picsum.photos/600/800?random=202",
  },
  {
    id: "d3",
    name: "스마트 공기청정기",
    category: "제품",
    desc: "기능 비교 + 3D 렌더링 활용",
    tags: ["리텐츠", "고객 DB수집"],
    img: "https://picsum.photos/600/800?random=203",
  },
  {
    id: "d4",
    name: "루미에르 클리닉",
    category: "병원",
    desc: "시술 전후 비교 + 의료진 소개",
    tags: ["상세페이지", "예약 유도"],
    img: "https://picsum.photos/600/800?random=204",
  },
  {
    id: "d5",
    name: "키즈 영어 클래스",
    category: "교육",
    desc: "커리큘럼 시각화 + 학부모 후기",
    tags: ["상세페이지", "수강 신청"],
    img: "https://picsum.photos/600/800?random=205",
  },
  {
    id: "d6",
    name: "프리미엄 침구 세트",
    category: "쇼핑몰",
    desc: "소재 강조 + 라이프스타일 연출",
    tags: ["리텐츠", "전환 최적화"],
    img: "https://picsum.photos/600/800?random=206",
  },
  {
    id: "d7",
    name: "헤어 에센스 오일",
    category: "뷰티",
    desc: "성분 인포그래픽 + 사용법 안내",
    tags: ["상세페이지", "뷰티"],
    img: "https://picsum.photos/600/800?random=207",
  },
  {
    id: "d8",
    name: "프로틴 쉐이크",
    category: "F&B",
    desc: "영양성분 비교 + 운동 루틴 연계",
    tags: ["상세페이지", "건강식품"],
    img: "https://picsum.photos/600/800?random=208",
  },
  {
    id: "d9",
    name: "온라인 코딩 부트캠프",
    category: "서비스",
    desc: "수강 과정 타임라인 + 수료생 후기",
    tags: ["리텐츠", "전환 최적화"],
    img: "https://picsum.photos/600/800?random=209",
  },
  {
    id: "d10",
    name: "반려동물 영양제",
    category: "제품",
    desc: "수의사 추천 + 급여 가이드",
    tags: ["상세페이지", "반려동물"],
    img: "https://picsum.photos/600/800?random=210",
  },
];

/* ── AI 컨텐츠 포트폴리오 데이터 (별도 페이지용) ── */
export type AiCategory = "전체" | "제품" | "인물" | "음식" | "공간" | "라이프스타일" | "패션";

export const AI_CATEGORIES: AiCategory[] = [
  "전체", "제품", "인물", "음식", "공간", "라이프스타일", "패션",
];

export interface AiWork {
  id: string;
  category: AiCategory;
  desc: string;
  img: string;
  aspect: "portrait" | "landscape" | "square";
}

export const AI_WORKS: AiWork[] = [
  { id: "a1", category: "제품", desc: "프리미엄 화장품 제품컷", img: "https://picsum.photos/600/800?random=301", aspect: "portrait" },
  { id: "a2", category: "음식", desc: "파인다이닝 메뉴 촬영", img: "https://picsum.photos/600/400?random=302", aspect: "landscape" },
  { id: "a3", category: "인물", desc: "브랜드 모델 프로필", img: "https://picsum.photos/600/800?random=303", aspect: "portrait" },
  { id: "a4", category: "공간", desc: "카페 인테리어 연출", img: "https://picsum.photos/600/600?random=304", aspect: "square" },
  { id: "a5", category: "라이프스타일", desc: "홈 라이프스타일 무드", img: "https://picsum.photos/600/400?random=305", aspect: "landscape" },
  { id: "a6", category: "패션", desc: "스트릿 패션 룩북", img: "https://picsum.photos/600/800?random=306", aspect: "portrait" },
  { id: "a7", category: "제품", desc: "전자기기 제품 목업", img: "https://picsum.photos/600/600?random=307", aspect: "square" },
  { id: "a8", category: "음식", desc: "디저트 카페 메뉴", img: "https://picsum.photos/600/800?random=308", aspect: "portrait" },
  { id: "a9", category: "공간", desc: "오피스 인테리어 시안", img: "https://picsum.photos/600/400?random=309", aspect: "landscape" },
  { id: "a10", category: "인물", desc: "기업 대표 프로필 사진", img: "https://picsum.photos/600/800?random=310", aspect: "portrait" },
  { id: "a11", category: "라이프스타일", desc: "여행 컨셉 비주얼", img: "https://picsum.photos/600/800?random=311", aspect: "portrait" },
  { id: "a12", category: "패션", desc: "시즌 컬렉션 비주얼", img: "https://picsum.photos/600/600?random=312", aspect: "square" },
  { id: "a13", category: "제품", desc: "스킨케어 라인업", img: "https://picsum.photos/600/400?random=313", aspect: "landscape" },
  { id: "a14", category: "음식", desc: "한식 코스 요리", img: "https://picsum.photos/600/600?random=314", aspect: "square" },
  { id: "a15", category: "공간", desc: "호텔 로비 렌더링", img: "https://picsum.photos/600/800?random=315", aspect: "portrait" },
];

/* ── 가격 패키지 데이터 ── */
export const PRICING_PLANS = [
  {
    name: "랜딩페이지",
    desc: "광고, 이벤트에 딱 맞는 단일 페이지 홈페이지",
    specs: [
      { label: "페이지수", value: "1 Page" },
      { label: "수정횟수", value: "무제한" },
      { label: "섹션수", value: "8 Section" },
      { label: "제작기간", value: "2주~3주" },
    ],
    price: "210",
    priceNote: "만원",
    popular: false,
  },
  {
    name: "일반 쇼핑몰",
    desc: "기본 디자인만으로 부담 없이 만드는 실속형 쇼핑몰",
    specs: [
      { label: "페이지수", value: "무제한" },
      { label: "수정횟수", value: "무제한" },
      { label: "제작기간", value: "3주~4주" },
    ],
    price: "280",
    priceNote: "만원",
    popular: false,
  },
  {
    name: "브랜드 쇼핑몰",
    desc: "브랜딩 목적의 맞춤 디자인 쇼핑몰",
    specs: [
      { label: "페이지수", value: "무제한" },
      { label: "수정횟수", value: "무제한" },
      { label: "제작기간", value: "3주~4주" },
    ],
    price: "380",
    priceNote: "만원",
    popular: true,
  },
  {
    name: "회사 홈페이지",
    desc: "기업, 브랜드 소개 목적의 회사 홈페이지",
    specs: [
      { label: "페이지수", value: "무제한" },
      { label: "수정횟수", value: "무제한" },
      { label: "제작기간", value: "3주~4주" },
    ],
    price: "420",
    priceNote: "만원",
    popular: false,
  },
];

export const ADDITIONAL_SERVICES = [
  {
    icon: "📝",
    name: "상세페이지 리텐츠",
    desc: "매출을 올리는 상세페이지 기획 및 디자인",
    price: "80만원~",
  },
  {
    icon: "📄",
    name: "상세페이지",
    desc: "제품/서비스 상세페이지 디자인 제작",
    price: "30만원~",
  },
  {
    icon: "🎨",
    name: "인스타 비전",
    desc: "브랜드 인스타그램 피드 디자인 및 콘텐츠 제작",
    price: "50만원~",
  },
  {
    icon: "🤖",
    name: "AI 콘텐츠 제작",
    desc: "AI 기반 카피라이팅, 이미지 생성, 영상 콘텐츠",
    price: "15만원~/건",
  },
  {
    icon: "🔍",
    name: "SEO 최적화",
    desc: "검색엔진 최적화 + GA4 전환 분석 세팅",
    price: "50만원~",
  },
  {
    icon: "🛠",
    name: "월 유지보수",
    desc: "보안 업데이트, 콘텐츠 수정, 기능 추가 관리",
    price: "8만원~/월",
  },
];

export const REASONS = [
  "안정적인 기업처럼 보이고 싶다",
  "거래처에게 신뢰를 주고 싶다",
  "많은 고객을 확보하고 싶다",
  "경쟁사보다 차별됐으면 좋겠다",
];

export const PRINCIPLES = [
  {
    number: "첫번째",
    title: "읽고 싶게 한다",
    points: [
      "고객이 궁금해할 핵심 정보만 선별하면, 한 줄 한 줄이 강력한 메시지가 됩니다.",
      "잘 정리된 콘텐츠는 자연스럽게 시선을 끌고, 다음 내용이 궁금해지게 만들죠.",
      "고객이 궁금해할 정보만 보여주고, 후킹 멘트로 계속 읽게 유도하며, 가독성 있게 정리하면 고객은 끝까지 읽게 됩니다.",
    ],
  },
  {
    number: "두번째",
    title: "믿을 수 있게 한다",
    points: [
      "고객은 눈앞에 보이는 '첫인상'과 '증거'로 신뢰를 결정합니다.",
      "브랜드와 어울리는 깔끔한 디자인은 그 자체로 강력한 신뢰 시그널이 됩니다.",
      "여기에 실제 후기와 사례, 인증서와 현장 사진 같은 근거가 더해지면 설득력이 완성되고, 고객은 자연스럽게 믿게 됩니다.",
    ],
  },
  {
    number: "세번째",
    title: "행동하게 한다",
    points: [
      "좋은 글과 디자인에 한 가지만 더하면 고객은 자연스럽게 행동합니다.",
      "눈에 띄는 곳마다 CTA 버튼을 배치해 신청을 쉽게 만들고, '지금이 가장 좋은 타이밍'이라는 확신을 주는 것이죠.",
      "고객이 편하게 다음 단계로 넘어갈 수 있도록 설계하면, 전환은 자연스럽게 따라옵니다.",
    ],
  },
];
