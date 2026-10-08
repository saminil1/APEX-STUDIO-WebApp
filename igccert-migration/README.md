# igccert.org 복원 키트 (AWS → Mac Docker → Oracle Cloud)

Mac에 받아 둔 **igccert.org Full Backup**을 Docker로 그대로 띄우는 키트입니다.
같은 키트를 **Oracle Cloud Always Free VM**에 올리면 실제 서비스도 할 수 있습니다.

| 구성 | 컨테이너 | 접속 |
|---|---|---|
| Apache + PHP 8.2 (WordPress/일반 PHP 호환) | `igccert-web` | http(s)://igccert.org |
| MariaDB 10.11 (MySQL 호환) | `igccert-db` | 127.0.0.1:3306 |
| phpMyAdmin | `igccert-pma` | http://localhost:8081 |
| Cloudflare Tunnel (선택) | `igccert-tunnel` | 인터넷 공개용 |

> 원본 백업은 **수정하거나 삭제하지 않습니다.** 복사본이 `site/`와 `db-init/`에 만들어지며, 두 폴더와 `.env`는 git에 올라가지 않습니다(`.gitignore`).

---

## 1. 사전 준비 (Mac, 최초 1회)

1. Docker Desktop을 설치합니다: https://www.docker.com/products/docker-desktop/ (Apple Silicon/Intel 자동 선택)
2. 이 저장소를 받습니다.
   ```bash
   git clone https://github.com/saminil1/APEX-STUDIO-WebApp.git
   cd APEX-STUDIO-WebApp
   git checkout claude/igccert-aws-to-free-hosting-ntj293
   cd igccert-migration
   ```

## 2. 백업 복원 (명령 3개)

```bash
# ① 백업 → site/, db-init/ 복사 + .env 자동 생성 + wp-config.php DB 정보 변경
./scripts/restore.sh ~/Backup/igccert          # ← 실제 백업 폴더 경로

# ② 컨테이너 빌드 및 실행 (첫 실행은 5~10분, DB 덤프는 이때 자동 import)
docker compose up -d --build

# ③ 이 Mac에서 igccert.org를 로컬 Docker로 연결 (관리자 암호 필요)
./scripts/hosts.sh on
```

이제 브라우저에서 **http://igccert.org** 에 접속합니다.

- 웹 루트를 자동으로 찾지 못하면 두 번째 인자로 하위 경로를 지정합니다: `./scripts/restore.sh ~/Backup/igccert var/www/html`
- 백업이 PHP 7.4용이면 `.env`에서 `PHP_VERSION=7.4`로 바꾼 뒤 `docker compose up -d --build`를 다시 실행합니다.
- 실제 인터넷의 igccert.org로 되돌리려면 `./scripts/hosts.sh off`를 실행합니다.

## 3. HTTPS로 접속하기 (선택)

```bash
brew install mkcert nss
./scripts/make-cert.sh
docker compose restart web
```
이후 **https://igccert.org** 로 접속합니다. WordPress의 siteurl이 https로 되어 있다면 이 단계가 필요합니다.

## 4. 문제 해결

| 증상 | 해결 |
|---|---|
| `Error establishing a database connection` | `docker compose logs db`로 import 오류를 확인합니다. WordPress가 아니면 사이트 설정 파일의 DB 정보를 `host=db`와 `.env` 값으로 바꿉니다. |
| DB 덤프를 다시 import해야 할 때 | 덤프는 **DB 볼륨이 비어 있을 때 한 번만** import됩니다. `docker compose down -v`는 로컬 DB 볼륨을 **삭제**하므로 반드시 필요한지 확인한 뒤 실행하고, 그다음 `up -d`를 합니다. |
| 화면이 계속 https로 넘어가거나 리다이렉트가 반복됨 | 3번(mkcert) 단계를 진행합니다. |
| 80 포트를 이미 사용 중 | `.env`에서 `HTTP_PORT=8080`으로 바꾸고 http://igccert.org:8080 으로 접속합니다. |
| 한글이 깨짐 | 덤프의 문자셋을 확인합니다. DB 서버는 utf8mb4로 설정되어 있습니다. |
| 로그 보기 | `docker compose logs -f web` 또는 `logs/apache/error.log` |

## 5. Mac에서 인터넷에 바로 공개하기 (선택, 임시용)

Mac을 계속 켜 두어야 하므로 **임시나 데모 용도**로만 권장합니다.
1. Cloudflare에 igccert.org를 등록합니다(무료). 그다음 Zero Trust → Networks → Tunnels → Create tunnel에서 Public hostname을 `igccert.org → http://web:80`으로 지정합니다.
2. 발급받은 토큰을 `.env`의 `CLOUDFLARE_TUNNEL_TOKEN=`에 넣습니다.
3. `docker compose --profile tunnel up -d`를 실행합니다.

## 6. 실제 서비스: Oracle Cloud Always Free

→ [docs/oracle-cloud-guide.md](docs/oracle-cloud-guide.md) (가입 → VM 생성 → 이 키트로 배포 → SSL)

## 보안 체크리스트 (ISO/IEC 27001·27701)

- [ ] 백업에 들어 있던 **AWS Access Key, RDS 비밀번호, SMTP 비밀번호**를 폐기하고 새로 발급합니다.
- [ ] `.env`, `site/`, `db-init/`(개인정보 포함)는 외부에 공유하거나 커밋하지 않습니다.
- [ ] phpMyAdmin과 DB 포트는 `127.0.0.1`에만 열려 있습니다. 서버에서는 phpMyAdmin을 끄거나 SSH 터널로만 접속합니다.
- [ ] 이전이 끝나면 WordPress 관리자 비밀번호를 바꾸고 플러그인과 코어를 업데이트합니다.
