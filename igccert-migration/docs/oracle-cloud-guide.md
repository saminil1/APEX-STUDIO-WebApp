# Oracle Cloud Always Free 가입 및 VM 생성 가이드 (igccert.org 이전용)

> Oracle 콘솔 화면과 메뉴 이름은 수시로 바뀝니다. 메뉴 위치가 다르면 콘솔 상단 검색창에 **Instances**를 입력하세요.

## 0. 무료로 받을 수 있는 것 (Always Free, 기간 제한 없음)

| 자원 | 무료 한도 |
|---|---|
| Ampere A1(ARM) VM | 합계 **4 OCPU / 24GB RAM** (1대 또는 여러 대로 나눠 쓰기 가능) |
| AMD Micro VM | VM.Standard.E2.1.Micro **2대** (1/8 OCPU, 1GB RAM) |
| 블록 스토리지 | 합계 **200GB** (부트 볼륨 포함) |
| 아웃바운드 트래픽 | 월 10TB |

→ igccert.org에는 **A1 Flex 4 OCPU / 24GB, 부트 볼륨 100~200GB** 1대를 권장합니다.

---

## 1. 가입 (약 15분)

1. https://www.oracle.com/cloud/free/ 에서 **Start for free**를 누릅니다.
2. **Country/Territory**: South Korea를 선택하고, 이름과 이메일을 입력한 뒤 이메일 인증을 합니다.
3. **Cloud Account Name**을 정합니다(예: `igccert`). 로그인할 때 쓰는 테넌시 이름이 됩니다.
4. **Home Region**은 ⚠️ **나중에 바꿀 수 없습니다.**
   - **South Korea North (Chuncheon)** 또는 **South Korea Central (Seoul)** 중 하나를 고릅니다.
   - Always Free 자원은 **홈 리전에서만** 만들 수 있습니다. 서울은 A1 재고가 부족한 경우가 많아 **춘천을 추천**합니다.
5. 주소와 휴대폰 번호를 입력하고 SMS 인증을 합니다.
6. **신용/체크카드로 본인 인증**을 합니다. 소액 승인 후 취소되며, 무료 한도 안에서는 과금되지 않습니다.
7. 가입 완료 메일이 오면 https://cloud.oracle.com 에 로그인합니다. 계정 활성화까지 수 분에서 수 시간이 걸릴 수 있습니다.

### (권장) 가입 직후 설정
- **MFA**: 프로필 → 보안 → 다중 인증을 설정합니다(iPhone 인증 앱 사용).
- **예산 알림**: Billing & Cost Management → Budgets → 월 1달러 초과 시 이메일 알림을 설정합니다.
- **Pay As You Go 업그레이드(선택)**: Free Tier 계정의 Always Free VM은 오래 놀고 있으면(약 7일간 CPU·네트워크·메모리 사용률이 낮으면) **회수될 수 있습니다.** PAYG로 바꾸면 회수 대상에서 빠지고, Always Free 한도 안에서는 계속 0원입니다. 예산 알림과 함께 사용하세요.

---

## 2. SSH 키 만들기 (Mac 터미널)

```bash
ssh-keygen -t ed25519 -C "igccert-oracle" -f ~/.ssh/igccert_oracle
cat ~/.ssh/igccert_oracle.pub   # ← 이 내용(공개키)을 VM 생성 시 붙여넣기
```
개인키(`igccert_oracle`, .pub가 없는 파일)는 **절대 공유하지 마세요.**

---

## 3. VM(인스턴스) 생성

콘솔 메뉴 ☰ → **Compute → Instances → Create instance**

| 항목 | 설정값 |
|---|---|
| Name | `igccert-web` |
| Compartment | (root) 기본값 |
| Placement | AD-1 (재고 부족 오류가 나면 다른 AD 선택) |
| **Image** | Change image → **Canonical Ubuntu 22.04 또는 24.04** (aarch64 버전 자동 선택) |
| **Shape** | Change shape → **Ampere** → **VM.Standard.A1.Flex** → OCPU **4**, Memory **24GB** ("Always Free-eligible" 표시 확인) |
| Networking | **Create new virtual cloud network** + **Create new public subnet** |
| Public IPv4 | **Assign a public IPv4 address** 체크 |
| SSH keys | **Paste public keys** → 위에서 만든 `.pub` 내용 붙여넣기 |
| Boot volume | **Specify a custom boot volume size** → 100~200GB |

→ **Create**를 누르고 1~2분 기다리면 상태가 **RUNNING**으로 바뀝니다. 화면에 나온 **Public IP address**를 메모합니다.

### "Out of capacity for shape VM.Standard.A1.Flex" 오류가 날 때
- 다른 AD를 선택하거나, 2 OCPU / 12GB로 줄여서 먼저 만들고 나중에 **Edit → Shape**로 늘립니다.
- 몇 시간 뒤 또는 새벽에 다시 시도합니다(재고가 수시로 풀립니다).
- 계속 실패하면 PAYG로 업그레이드합니다. 재고 우선순위가 올라갑니다.

---

## 4. 방화벽 열기 (두 군데 모두 필요)

### ① OCI 보안 목록(Security List)
Instances → igccert-web → **Subnet** 링크 → **Security Lists → Default Security List** → **Add Ingress Rules**

| Source CIDR | Protocol | Dest. Port | 설명 |
|---|---|---|---|
| 0.0.0.0/0 | TCP | 80 | HTTP |
| 0.0.0.0/0 | TCP | 443 | HTTPS |

(22번 SSH는 기본으로 열려 있습니다. 보안을 위해 Source를 내 사무실 IP/32로 좁히길 권장합니다.)

### ② Ubuntu 내부 iptables (Oracle 이미지는 기본으로 막혀 있음)
```bash
ssh -i ~/.ssh/igccert_oracle ubuntu@<공인IP>
sudo iptables -I INPUT 6 -m state --state NEW -p tcp --dport 80 -j ACCEPT
sudo iptables -I INPUT 6 -m state --state NEW -p tcp --dport 443 -j ACCEPT
sudo netfilter-persistent save
```

---

## 5. 서버에 이 키트로 igccert.org 배포

```bash
# (서버) Docker 설치
sudo apt update && sudo apt -y upgrade
curl -fsSL https://get.docker.com | sudo sh
sudo usermod -aG docker ubuntu && exit        # 재접속해야 그룹 적용

# (Mac) 키트 + 백업 업로드
scp -i ~/.ssh/igccert_oracle -r ./igccert-migration ubuntu@<공인IP>:~/
rsync -avz -e "ssh -i ~/.ssh/igccert_oracle" ~/Backup/igccert/ ubuntu@<공인IP>:~/backup/

# (서버) 복원 및 실행 — Mac 로컬과 동일
ssh -i ~/.ssh/igccert_oracle ubuntu@<공인IP>
cd ~/igccert-migration
./scripts/restore.sh ~/backup
docker compose up -d --build
curl -I http://localhost -H "Host: igccert.org"   # 200/301 이면 정상
```

> 서버에서는 `hosts.sh`, `make-cert.sh`(Mac 전용)를 쓰지 않습니다. 대신 아래 6~7단계를 진행합니다.

---

## 6. DNS 연결

도메인 관리 업체(또는 Cloudflare DNS)에서 다음과 같이 설정합니다.

| Type | Name | Value |
|---|---|---|
| A | `@` (igccert.org) | `<Oracle 공인IP>` |
| A | `www` | `<Oracle 공인IP>` |

> 현재 igccert.org는 DNS 조회가 되지 않는 상태입니다. **도메인 만료 여부**와 **네임서버가 삭제된 AWS Route 53을 가리키고 있지 않은지** 먼저 확인하세요. Route 53을 그만 쓴다면 네임서버를 Cloudflare(무료)나 등록 업체 DNS로 바꿉니다.

확인: Mac 터미널에서 `dig +short igccert.org` → Oracle IP가 나오면 정상입니다.

---

## 7. 무료 SSL 인증서 (Let's Encrypt)

```bash
cd ~/igccert-migration
docker compose stop web
sudo apt -y install certbot
sudo certbot certonly --standalone -d igccert.org -d www.igccert.org -m <관리자이메일> --agree-tos -n
sudo cp /etc/letsencrypt/live/igccert.org/fullchain.pem certs/igccert.org.pem
sudo cp /etc/letsencrypt/live/igccert.org/privkey.pem  certs/igccert.org-key.pem
sudo chown ubuntu:ubuntu certs/*.pem
docker compose start web
```

**자동 갱신**(90일 주기): `sudo crontab -e`에 아래 한 줄을 추가합니다.
```
0 4 * * 1 certbot renew --quiet --pre-hook "docker compose -f /home/ubuntu/igccert-migration/docker-compose.yml stop web" --post-hook "cp /etc/letsencrypt/live/igccert.org/fullchain.pem /home/ubuntu/igccert-migration/certs/igccert.org.pem && cp /etc/letsencrypt/live/igccert.org/privkey.pem /home/ubuntu/igccert-migration/certs/igccert.org-key.pem && docker compose -f /home/ubuntu/igccert-migration/docker-compose.yml start web"
```

---

## 8. 운영 체크리스트

- [ ] 공인 IP 고정: 인스턴스를 삭제하고 다시 만들면 임시 IP가 바뀝니다. 고정이 필요하면 Networking → **Reserved Public IPs**를 사용합니다(무료 한도는 콘솔에서 확인).
- [ ] DB 정기 백업: `docker exec igccert-db sh -c 'mariadb-dump -uroot -p"$MARIADB_ROOT_PASSWORD" --all-databases' | gzip > ~/db-$(date +%F).sql.gz`
- [ ] 부트 볼륨 백업 정책: Block Storage → Boot Volumes → Backup Policy (무료 한도 확인)
- [ ] SSH 비밀번호 로그인 금지, 22번 포트는 사무실 IP로 제한
- [ ] 이전이 안정된 뒤 AWS(EC2, RDS, S3, Route 53) 리소스를 정리하고 요금 0원 확인
