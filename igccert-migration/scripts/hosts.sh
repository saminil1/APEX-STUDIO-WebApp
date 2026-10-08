#!/usr/bin/env bash
# /etc/hosts 에 igccert.org → 127.0.0.1 매핑을 켜고/끕니다. (Mac 전용, sudo 필요)
#   ./scripts/hosts.sh on   : 이 Mac 에서 igccert.org 를 로컬 Docker 로 연결
#   ./scripts/hosts.sh off  : 매핑 해제 (실제 인터넷 DNS 로 복귀)
set -euo pipefail

DOMAIN="${SITE_DOMAIN:-igccert.org}"
MARK="# igccert-local-docker"
HOSTS=/etc/hosts

case "${1:-}" in
  on)
    if grep -q "$MARK" "$HOSTS"; then echo "이미 활성화되어 있습니다."; exit 0; fi
    sudo cp "$HOSTS" "$HOSTS.igccert.bak"
    printf '127.0.0.1 %s www.%s %s\n' "$DOMAIN" "$DOMAIN" "$MARK" | sudo tee -a "$HOSTS" >/dev/null
    ;;
  off)
    sudo cp "$HOSTS" "$HOSTS.igccert.bak"
    sudo sed -i '' "/$MARK/d" "$HOSTS"
    ;;
  *)
    echo "사용법: $0 on|off" >&2; exit 1 ;;
esac

sudo dscacheutil -flushcache
sudo killall -HUP mDNSResponder 2>/dev/null || true
echo "완료: hosts $1 (백업: $HOSTS.igccert.bak)"
