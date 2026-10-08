#!/usr/bin/env bash
# mkcert 로 igccert.org 로컬 HTTPS 인증서를 만듭니다. (Mac 브라우저에서 신뢰됨)
#   사전 설치: brew install mkcert nss
set -euo pipefail

KIT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
DOMAIN="${SITE_DOMAIN:-igccert.org}"

command -v mkcert >/dev/null || { echo "mkcert 가 없습니다: brew install mkcert nss" >&2; exit 1; }

mkdir -p "$KIT_DIR/certs"
mkcert -install
mkcert -cert-file "$KIT_DIR/certs/$DOMAIN.pem" -key-file "$KIT_DIR/certs/$DOMAIN-key.pem" \
  "$DOMAIN" "www.$DOMAIN" localhost 127.0.0.1

echo "인증서 생성 완료 → docker compose restart web 후 https://$DOMAIN 접속"
