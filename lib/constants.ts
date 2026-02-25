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
  { label: "홈", href: "#" },
  { label: "포트폴리오", href: "#portfolio" },
  { label: "비용&기간", href: "#pricing" },
  { label: "서비스", href: "#services" },
  { label: "문의하기", href: "#contact" },
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

export const AI_CONTENT_IMAGES = [
  { src: "https://picsum.photos/400/500?random=10", alt: "AI 제품 이미지 1" },
  { src: "https://picsum.photos/400/300?random=11", alt: "AI 라이프스타일 1" },
  { src: "https://picsum.photos/400/400?random=12", alt: "AI 제품 이미지 2" },
  { src: "https://picsum.photos/400/600?random=13", alt: "AI 인물 이미지" },
  { src: "https://picsum.photos/400/350?random=14", alt: "AI 음식 이미지" },
  { src: "https://picsum.photos/400/450?random=15", alt: "AI 공간 이미지" },
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
