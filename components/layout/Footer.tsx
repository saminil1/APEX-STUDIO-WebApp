import { SITE_NAME, TAGLINE } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="text-center py-10 px-6 text-[13px] text-[#444] border-t border-[#111]">
      <p>&copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved.</p>
      <p className="mt-2">{TAGLINE}</p>
    </footer>
  );
}
