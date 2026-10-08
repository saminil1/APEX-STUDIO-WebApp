#!/bin/sh
# DOCROOT_SUBDIR 가 지정되면 문서 루트를 /var/www/html/<하위폴더> 로 바꾼다.
# (예: 백업이 site/public_html/ 구조일 때 DOCROOT_SUBDIR=public_html)
set -e

DOCROOT="/var/www/html"
if [ -n "${DOCROOT_SUBDIR}" ]; then
  DOCROOT="/var/www/html/${DOCROOT_SUBDIR}"
fi
export APACHE_DOCROOT="${DOCROOT}"
export SITE_DOMAIN="${SITE_DOMAIN:-igccert.org}"

if [ -f "/etc/apache2/certs/${SITE_DOMAIN}.pem" ]; then
  echo "[igccert] HTTPS 인증서 발견 → 443 활성화 (${SITE_DOMAIN})"
else
  echo "[igccert] 인증서 없음 → HTTP(80)만 서비스. HTTPS 는 README 의 mkcert 절 참고"
fi

exec docker-php-entrypoint "$@"
