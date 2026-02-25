import { SITE_NAME, TAGLINE } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="text-center py-10 px-6 text-[13px] text-[#444] border-t border-[#111] space-y-1.5">
      <p>&copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved.</p>
      <p>{TAGLINE}</p>
      <div className="mt-4 space-y-1 text-[12px] text-[#555]">
        <p>회사명: 에이펙스튜디오 | 대표: Mark</p>
        <p>주소: 서울특별시 강북구 오패산로52사길77</p>
        <p>이메일: saminil@hanmail.net | 전화: 010-2299-5655 | 팩스: 02)2277-1009</p>
        <p>사업자 등록번호: 788-04-01596 | 통신판매업 신고번호: 2017-서울중구-0183</p>
      </div>
    </footer>
  );
}
