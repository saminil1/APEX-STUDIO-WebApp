# 🌐 Project APEX-STUDIO — 도메인 & 호스팅 설정 가이드

---

## 1. 도메인 추천

### 1순위 추천
| 도메인 | 특징 | 등록처 | 연 비용 |
|--------|------|--------|---------|
| **apex-studio.kr** | 한국 타겟, .kr 신뢰도 | 가비아/후이즈 | ~2만원 |
| **apexstudio.co.kr** | 기업형, 가장 신뢰 | 가비아/후이즈 | ~2만원 |
| **apex-studio.com** | 글로벌 확장 가능 | Namecheap/GoDaddy | ~1.5만원 |

### 2순위 (가용 시)
| 도메인 | 특징 |
|--------|------|
| apex-web.kr | 웹 에이전시 강조 |
| apex-digital.kr | 디지털 에이전시 |
| apexdesign.kr | 디자인 에이전시 |

### 추천: **apex-studio.kr** 또는 **apexstudio.co.kr**
> .co.kr은 기업 신뢰도가 높고, 한국 고객 타겟에 최적

---

## 2. 도메인 등록 방법

### 가비아 (추천 — 한국 1위)
1. gabia.com 접속 → 로그인
2. 도메인 검색: "apex-studio" 입력
3. .kr / .co.kr 선택 → 장바구니 → 결제
4. 1년 또는 3년 등록 (3년 할인 있음)

### 후이즈 (대안)
1. whois.co.kr 접속
2. 동일 방식으로 등록

> ⚠️ 도메인 등록 후 **WHOIS 개인정보보호** 설정 필수

---

## 3. 호스팅 옵션

### Option A: Vercel (★★★★★ 추천)

**장점:**
- Next.js 공식 지원 (같은 회사)
- 무료 플랜으로 시작 가능
- 자동 HTTPS/SSL
- GitHub 연동 → 코드 push 시 자동 배포
- 전 세계 CDN 자동 적용
- 커스텀 도메인 무료 연결

**무료 플랜 제한:**
- 대역폭: 100GB/월
- 빌드 시간: 6,000분/월
- 초기 에이전시 사이트로 충분

**설정 방법:**
```bash
# 1. Vercel CLI 설치
npm install -g vercel

# 2. 프로젝트 폴더에서 실행
cd apex-studio
vercel

# 3. 안내에 따라 설정
# - 프로젝트명: apex-studio
# - 프레임워크: Next.js (자동 감지)
# - 빌드 설정: 기본값 사용

# 4. 배포 완료 → xxx.vercel.app URL 발급
```

**커스텀 도메인 연결:**
```
Vercel Dashboard → 프로젝트 선택 → Settings → Domains
→ apex-studio.kr 입력 → Add

DNS 설정 (가비아 관리 페이지):
- A 레코드: @ → 76.76.21.21
- CNAME: www → cname.vercel-dns.com
```

---

### Option B: AWS (Mark님 전문성 활용)

**구성:**
```
Route 53 (DNS)
    ↓
CloudFront (CDN + HTTPS)
    ↓
S3 (정적 파일) 또는 EC2 (Next.js 서버)
```

**비용 (월):**
- S3: ~$1
- CloudFront: ~$3
- Route 53: $0.50/도메인
- 합계: **약 $5/월**

**Next.js 정적 배포 (S3+CloudFront):**
```bash
# next.config.js
module.exports = {
  output: 'export',  // 정적 HTML 생성
}

# 빌드
npm run build

# S3 업로드
aws s3 sync ./out s3://apex-studio-bucket --delete

# CloudFront 캐시 무효화
aws cloudfront create-invalidation \
  --distribution-id XXXXX \
  --paths "/*"
```

---

### Option C: GitHub Pages (무료, 단순)

- **무료** 완전 무료
- 정적 사이트만 가능 (Next.js output: 'export' 필요)
- 커스텀 도메인 지원
- HTTPS 자동 제공

```bash
# next.config.js
module.exports = {
  output: 'export',
  basePath: '',
}

# GitHub Actions 자동 배포 설정
# .github/workflows/deploy.yml 생성
```

---

## 4. 최종 추천 조합

```
도메인: apex-studio.kr (가비아 등록)
호스팅: Vercel 무료 플랜
SSL: Vercel 자동 제공 (무료)
CDN: Vercel Edge Network (자동)

총 비용: 연 2만원 (도메인만)
```

> 트래픽이 증가하거나 서버 기능 필요 시 AWS로 이전

---

## 5. SSL 인증서

Vercel 사용 시 자동으로 Let's Encrypt SSL이 적용됩니다.
별도 구매 불필요.

AWS 사용 시:
- AWS Certificate Manager (ACM): 무료
- 한국 도메인 (.kr): ACM에서 직접 발급 가능

---

## 6. 이메일 설정

도메인 연결 후 비즈니스 이메일 설정:

### 방법 1: Google Workspace (추천)
- 월 $6/계정
- contact@apex-studio.kr 사용 가능
- Gmail UI + Drive + Meet 포함

### 방법 2: 가비아 기업메일 (저렴)
- 월 1,100원/계정
- 한국 서버, 간단한 웹메일

### 방법 3: Zoho Mail (무료)
- 5계정까지 무료
- contact@apex-studio.kr 설정 가능

---

## 7. Vercel 배포 전체 흐름

```
1. GitHub 저장소 생성
   github.com → New Repository → apex-studio

2. 로컬 프로젝트 푸시
   git init
   git add .
   git commit -m "Initial commit: APEX-STUDIO"
   git remote add origin https://github.com/[username]/apex-studio.git
   git push -u origin main

3. Vercel 연동
   vercel.com → Import Git Repository
   → apex-studio 선택 → Deploy

4. 커스텀 도메인 연결
   Vercel Dashboard → Domains → apex-studio.kr 추가
   가비아 DNS 설정

5. 환경변수 설정
   Vercel Dashboard → Settings → Environment Variables
   NEXT_PUBLIC_GA_ID = G-XXXXXXXXXX

6. 완료! apex-studio.kr 접속 확인
```

---

## 8. 배포 후 체크리스트

- [ ] https://apex-studio.kr 정상 접속 확인
- [ ] 모바일에서 반응형 확인
- [ ] 신청하기 버튼 클릭 → 문의 폼 이동 확인
- [ ] Google Search Console 등록
- [ ] Google Analytics 데이터 수집 확인
- [ ] Meta Pixel 설치 확인
- [ ] 페이지 속도 확인 (PageSpeed Insights)
- [ ] SEO 메타태그 확인 (og:image, description)
- [ ] 카카오톡 채널 링크 연결 확인
