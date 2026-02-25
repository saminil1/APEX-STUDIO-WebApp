export type FAQCategory = '서비스' | '가격' | '제작과정' | '기술' | '기타';

export interface FAQItem {
  id: number;
  category: FAQCategory;
  question: string;
  answer: string;
  keywords: string[];
}

export const CATEGORIES: FAQCategory[] = ['서비스', '가격', '제작과정', '기술', '기타'];

export const GREETING_MESSAGE =
  '안녕하세요! APEX STUDIO 챗봇입니다.\n궁금하신 내용의 카테고리를 선택하시거나, 키워드를 입력해 주세요.\n\n📞 전화: 010-2299-5655\n📧 이메일: trustia.cert@gmail.com';

export const NO_RESULT_MESSAGE =
  '죄송합니다. 해당 질문에 대한 답변을 찾지 못했습니다.\n아래 문의폼을 통해 직접 문의해 주시거나 전화(010-2299-5655)로 연락해 주시면 빠르게 답변드리겠습니다.';

export const FAQ_DATA: FAQItem[] = [
  {
    id: 1,
    category: '서비스',
    question: '어떤 서비스를 제공하나요?',
    answer:
      '홈페이지 제작, 앱 개발, AI 콘텐츠 제작, 브랜딩 디자인 등 디지털 전반의 서비스를 제공합니다. 매출을 만드는 전환 중심의 웹사이트를 전문으로 합니다.',
    keywords: ['서비스', '제공', '뭐', '무엇', '어떤'],
  },
  {
    id: 2,
    category: '서비스',
    question: '포트폴리오를 볼 수 있나요?',
    answer:
      '네, 홈페이지 내 포트폴리오 섹션에서 확인하실 수 있습니다. 다양한 업종의 제작 사례를 보유하고 있으며, 추가 포트폴리오는 문의 시 별도로 안내드립니다.',
    keywords: ['포트폴리오', '사례', '작업물', '레퍼런스'],
  },
  {
    id: 3,
    category: '가격',
    question: '홈페이지 제작 비용은 얼마인가요?',
    answer:
      '랜딩페이지 210만원, 일반 쇼핑몰 280만원, 브랜드 쇼핑몰 380만원, 회사 홈페이지 420만원부터 시작합니다. 모든 패키지에 수정횟수 무제한이 포함되어 있으며, 정확한 견적은 문의폼을 통해 상담해 주세요.',
    keywords: ['비용', '가격', '얼마', '견적', '요금', '금액', '돈'],
  },
  {
    id: 4,
    category: '가격',
    question: '추가 비용이 발생하나요?',
    answer:
      '초기 상담 시 확정된 범위 내에서는 추가 비용이 발생하지 않습니다. 수정횟수는 무제한이며, 범위 외 기능 추가나 대규모 변경 시에는 사전 협의 후 진행됩니다.',
    keywords: ['추가', '비용', '숨은', '별도'],
  },
  {
    id: 5,
    category: '제작과정',
    question: '제작 기간은 얼마나 걸리나요?',
    answer:
      '랜딩페이지는 2~3주, 쇼핑몰/회사 홈페이지는 3~4주 정도 소요됩니다. 상담 → 기획 → 디자인 → 개발 → 런칭 순서로 진행되며, 상담 시 정확한 일정을 안내드립니다.',
    keywords: ['기간', '얼마나', '시간', '일정', '소요', '걸리'],
  },
  {
    id: 6,
    category: '제작과정',
    question: '제작 과정은 어떻게 진행되나요?',
    answer:
      '상담 → 기획 → 디자인 → 개발 → 테스트 → 런칭 순서로 진행됩니다. 각 단계마다 고객 확인을 거치며, 피드백을 반영하여 완성도를 높입니다.',
    keywords: ['과정', '절차', '프로세스', '진행', '순서', '단계'],
  },
  {
    id: 7,
    category: '기술',
    question: '모바일 반응형으로 제작되나요?',
    answer:
      '네, 모든 프로젝트는 모바일 퍼스트 반응형으로 제작됩니다. PC, 태블릿, 모바일 모든 환경에서 최적화된 경험을 제공합니다.',
    keywords: ['모바일', '반응형', '휴대폰', '스마트폰', '태블릿'],
  },
  {
    id: 8,
    category: '기술',
    question: '유지보수 및 관리도 해주시나요?',
    answer:
      '네, 런칭 후 무상 유지보수를 제공합니다. 이후에는 월 8만원부터 유지보수 계약이 가능하며, 보안 업데이트, 콘텐츠 수정, 기능 추가 등을 지원합니다.',
    keywords: ['유지보수', '관리', '업데이트', '수정', '운영'],
  },
  {
    id: 9,
    category: '기타',
    question: '상담은 어떻게 신청하나요?',
    answer:
      '페이지 하단의 문의폼을 작성해 주시거나, 카카오톡 채널로 문의해 주시면 빠르게 답변드리겠습니다.\n전화 상담도 가능합니다.\n📞 전화번호: 010-2299-5655\n📧 이메일: trustia.cert@gmail.com',
    keywords: ['상담', '문의', '연락', '신청', '카카오', '전화', '전화번호', '번호', '이메일', '메일'],
  },
  {
    id: 10,
    category: '기타',
    question: '타 지역에서도 의뢰가 가능한가요?',
    answer:
      '네, 전국 어디서나 의뢰 가능합니다. 비대면 화상 미팅과 온라인 협업 도구를 활용하여 원활하게 프로젝트를 진행합니다.',
    keywords: ['지역', '지방', '서울', '비대면', '원격', '온라인'],
  },
];

export function searchFAQ(query: string): FAQItem[] {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) return [];

  return FAQ_DATA.filter(
    (item) =>
      item.keywords.some((kw) => normalizedQuery.includes(kw)) ||
      item.question.toLowerCase().includes(normalizedQuery) ||
      normalizedQuery.split(/\s+/).some(
        (word) =>
          word.length >= 2 &&
          (item.keywords.some((kw) => kw.includes(word)) ||
            item.question.toLowerCase().includes(word))
      )
  );
}
