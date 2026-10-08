#!/usr/bin/env bash
# igccert.org Full Backup → Mac 로컬 Docker 복원 준비 스크립트
#
#   사용법: ./scripts/restore.sh <백업폴더경로> [웹루트_하위경로]
#   예시  : ./scripts/restore.sh ~/Backup/igccert
#           ./scripts/restore.sh ~/Backup/igccert var/www/html
#
# 원본 백업은 절대 수정/삭제하지 않습니다. (복사본만 site/, db-init/ 에 생성)
set -euo pipefail

KIT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
SRC="${1:-}"
WEBROOT_HINT="${2:-}"

if [[ -z "$SRC" || ! -d "$SRC" ]]; then
  echo "사용법: $0 <백업폴더경로> [웹루트_하위경로]" >&2
  exit 1
fi
SRC="$(cd "$SRC" && pwd)"

info() { printf '\033[1;35m[igccert]\033[0m %s\n' "$*"; }
warn() { printf '\033[1;33m[주의]\033[0m %s\n' "$*"; }

# ── 1) 웹 루트 탐지 ───────────────────────────────────────────
find_webroot() {
  if [[ -n "$WEBROOT_HINT" ]]; then echo "$SRC/$WEBROOT_HINT"; return; fi
  local c
  for c in "" public_html www html htdocs var/www/html var/www/igccert.org var/www; do
    if [[ -f "$SRC/$c/index.php" || -f "$SRC/$c/index.html" || -f "$SRC/$c/wp-config.php" ]]; then
      echo "${SRC}${c:+/$c}"; return
    fi
  done
  # 그래도 못 찾으면 wp-config.php / index.php 위치로 추정
  c="$(find "$SRC" -maxdepth 5 \( -name wp-config.php -o -name index.php \) -not -path '*/wp-content/*' -not -path '*/vendor/*' 2>/dev/null | head -n1)"
  [[ -n "$c" ]] && dirname "$c"
}

WEBROOT="$(find_webroot || true)"
if [[ -z "$WEBROOT" || ! -d "$WEBROOT" ]]; then
  echo "웹 루트(index.php/index.html)를 찾지 못했습니다. 두 번째 인자로 하위 경로를 지정하세요." >&2
  exit 1
fi
info "웹 루트: $WEBROOT"

if [[ -d "$KIT_DIR/site" && -n "$(ls -A "$KIT_DIR/site" 2>/dev/null)" ]]; then
  warn "site/ 폴더가 이미 비어있지 않습니다. 덮어쓰지 않고 중단합니다."
  warn "다시 하려면 site/ 폴더 이름을 바꾼 뒤(예: site_old) 재실행하세요."
  exit 1
fi
mkdir -p "$KIT_DIR/site" "$KIT_DIR/db-init" "$KIT_DIR/certs" "$KIT_DIR/logs/apache"

info "웹 파일 복사 중 (원본 유지)…"
if command -v rsync >/dev/null; then
  rsync -a --exclude '.DS_Store' "$WEBROOT/" "$KIT_DIR/site/"
else
  cp -Rp "$WEBROOT/." "$KIT_DIR/site/"
fi

# ── 2) DB 덤프 탐지 → db-init/ ────────────────────────────────
DUMPS=()
while IFS= read -r f; do DUMPS+=("$f"); done < <(
  find "$SRC" -maxdepth 6 -type f \( -name '*.sql' -o -name '*.sql.gz' \) -not -path "$WEBROOT/wp-content/*" 2>/dev/null | sort
)
if [[ ${#DUMPS[@]} -eq 0 ]]; then
  warn "DB 덤프(*.sql / *.sql.gz)를 찾지 못했습니다. 정적 사이트가 아니라면 db-init/ 에 직접 넣으세요."
else
  for f in "${DUMPS[@]}"; do
    info "DB 덤프 발견: $f"
    cp "$f" "$KIT_DIR/db-init/"
  done
  [[ ${#DUMPS[@]} -gt 1 ]] && warn "덤프가 여러 개입니다. 필요한 것만 db-init/ 에 남기세요 (이름순으로 모두 import 됨)."
fi

# ── 3) .env 생성 (임의 비밀번호) ──────────────────────────────
if [[ ! -f "$KIT_DIR/.env" ]]; then
  cp "$KIT_DIR/.env.example" "$KIT_DIR/.env"
  rootpw="$(openssl rand -hex 16)"
  userpw="$(openssl rand -hex 16)"
  perl -pi -e "s/^DB_ROOT_PASSWORD=.*/DB_ROOT_PASSWORD=$rootpw/; s/^DB_PASSWORD=.*/DB_PASSWORD=$userpw/" "$KIT_DIR/.env"
  info ".env 생성 완료 (DB 비밀번호 자동 생성)"
fi
# shellcheck disable=SC1091
set -a; source "$KIT_DIR/.env"; set +a

# ── 4) WordPress 라면 wp-config.php(복사본) DB 접속정보 교체 ─
WPCFG="$KIT_DIR/site/wp-config.php"
if [[ -f "$WPCFG" ]]; then
  cp "$WPCFG" "$WPCFG.aws-original"
  perl -pi -e "
    s/(define\(\s*['\"]DB_NAME['\"]\s*,\s*)['\"][^'\"]*['\"]/\$1'${DB_NAME}'/;
    s/(define\(\s*['\"]DB_USER['\"]\s*,\s*)['\"][^'\"]*['\"]/\$1'${DB_USER}'/;
    s/(define\(\s*['\"]DB_PASSWORD['\"]\s*,\s*)['\"][^'\"]*['\"]/\$1'${DB_PASSWORD}'/;
    s/(define\(\s*['\"]DB_HOST['\"]\s*,\s*)['\"][^'\"]*['\"]/\$1'db'/;
  " "$WPCFG"
  info "WordPress 감지 → site/wp-config.php DB 정보를 Docker 용으로 변경 (원본: wp-config.php.aws-original)"
else
  warn "WordPress 가 아닙니다. 사이트 설정 파일의 DB 접속정보를 아래 값으로 직접 바꾸세요:"
  echo "      host=db  name=${DB_NAME}  user=${DB_USER}  password=(.env 의 DB_PASSWORD)"
  grep -rlE "mysqli_connect|new PDO|DB_HOST|db_host" "$KIT_DIR/site" --include='*.php' 2>/dev/null | grep -v -E '/(vendor|wp-includes|wp-admin)/' | head -n 10 | sed 's/^/      후보: /' || true
fi

cat <<EOF

$(info "준비 완료! 다음 순서로 실행하세요.")
  1) cd "$KIT_DIR" && docker compose up -d --build
  2) ./scripts/hosts.sh on            # igccert.org → 127.0.0.1 (관리자 암호 필요)
  3) 브라우저: http://igccert.org     # phpMyAdmin: http://localhost:${PMA_PORT:-8081}
  (HTTPS 필요 시: ./scripts/make-cert.sh 후 docker compose restart web)
EOF
