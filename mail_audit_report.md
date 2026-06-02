# Mail Server Audit Report
## mail.makhanabazar.com
### Generated: 2026-06-02

---

## 1. Executive Summary

| Category | Status | Score |
|----------|--------|-------|
| DNS Configuration | CRITICAL ISSUES | 2/10 |
| Mail Services | ALL OPERATIONAL | 10/10 |
| TLS/SSL | GOOD (minor issues) | 8/10 |
| Authentication | CRITICAL ISSUES | 3/10 |
| Deliverability | BLACKLISTED | 3/10 |
| Security | MODERATE | 6/10 |
| **OVERALL** | **NEEDS ATTENTION** | **5.3/10** |

### Critical Issues Found:
1. **3 SPF records** -- causes SPF permerror (only 1 allowed)
2. **Blacklisted** on Blitzed (copn.blitzed.de)
3. **DMARC policy = none** -- no enforcement
4. **No aggregate reporting** (missing rua tag)
5. **IP mismatch** -- Cloudflare IPs (104.21.x.x) not in SPF, only old IP 31.97.117.48 listed
6. **No PTR records** -- behind Cloudflare proxy (expected but limits deliverability)
7. **VRFY command enabled** -- information disclosure risk
8. **Fail2ban** only protects SSH, not Postfix/Dovecot
9. **Mail ports (25/587/465) open to world** -- only protected by Postfix ACLs

---

## 2. DNS Audit

### 2.1 A Records
```
mail.makhanabazar.com.  IN  A  104.21.34.238   (Cloudflare)
mail.makhanabazar.com.  IN  A  172.67.166.85   (Cloudflare)
```
**Status:** Cloudflare proxied. Real origin server IP is hidden.

### 2.2 AAAA Records
```
mail.makhanabazar.com.  IN  AAAA  2606:4700:3030::6815:22ee   (Cloudflare)
mail.makhanabazar.com.  IN  AAAA  2606:4700:3032::ac43:a655   (Cloudflare)
```
**Status:** Cloudflare proxied (IPv6).

### 2.3 MX Records
```
makhanabazar.com.  IN  MX  10  _dc-mx.397c584bb413.makhanabazar.com.
```
**Status:** MX points to a CNAME (`_dc-mx.397c584bb413.makhanabazar.com`). 
**Issue:** MX records pointing to CNAME is RFC-non-compliant (though widely supported).

### 2.4 SPF Records -- CRITICAL
```
Record 1: "v=spf1 ip4:31.97.117.48 ~all"
Record 2: "&quot;v=spf1 mx ~all&quot;"   (HTML-encoded, broken)
Record 3: "v=spf1 mx a ip4:31.97.117.48 include:_spf.google.com ~all"
```
**CRITICAL ISSUES:**
- **3 SPF records found** -- DNS only allows ONE. Multiple records cause `permerror`.
- Record 2 is HTML-encoded (`&quot;`) -- completely broken
- Record 1 only allows old IP 31.97.117.48, not current Cloudflare IPs
- Record 3 includes `_spf.google.com` but Google Workspace doesn't appear to be in use
- All use `~all` (softfail) -- should use `-all` (hardfail) for production

### 2.5 DKIM Records
```
Selector 'default': v=DKIM1; k=rsa; p=MIIBIjANBgkqh...  (RSA key, valid)
Selector 's1': s1.domainkey.u59517010.wl011.sendgrid.net.  (SendGrid CNAME)
```
**Status:** DKIM is configured.
**Note:** Two selectors found. The `s1` selector points to SendGrid, suggesting email may be sent via SendGrid.

### 2.6 DMARC Record
```
v=DMARC1; p=none;
```
**Issues:**
- Policy is `none` -- no enforcement of authentication failures
- No `rua` tag -- no aggregate reports configured
- No `ruf` tag -- no forensic/failure reports
- No `pct` tag -- defaults to 100%
- DKIM alignment: Relaxed (default)
- SPF alignment: Relaxed (default)

### 2.7 PTR/rDNS
```
188.114.97.4   -> NO PTR
188.114.96.4   -> NO PTR
```
**Status:** No reverse DNS. This is expected behind Cloudflare proxy but significantly hurts deliverability. Many mail servers (especially large providers) will flag or reject mail without PTR.

---

## 3. Mail Services

### 3.1 Port Scan Results
| Port | Service | Status |
|------|---------|--------|
| 25 | SMTP | OPEN |
| 587 | SMTP Submission | OPEN |
| 465 | SMTPS | OPEN |
| 143 | IMAP | OPEN |
| 993 | IMAPS | OPEN |
| 110 | POP3 | OPEN |
| 995 | POP3S | OPEN |
| 80 | HTTP | OPEN |
| 443 | HTTPS | OPEN |
| 8080 | HTTP-Alt | REFUSED |
| 8443 | HTTPS-Alt | REFUSED |

**Status:** All standard mail and webmail ports are accessible.

### 3.2 SMTP Capabilities (Port 25)
```
220 mail.makhanabazar.com ESMTP Postfix
250-PIPELINING
250-SIZE 10240000
250-VRFY          <-- ENABLED (security concern)
250-ETRN
250-STARTTLS
250-AUTH PLAIN LOGIN
250-ENHANCEDSTATUSCODES
250-8BITMIME
250-DSN
250-CHUNKING
```
- **STARTTLS:** Supported
- **AUTH:** PLAIN, LOGIN (only over STARTTLS on 587)
- **VRFY:** Enabled (discloses user existence)
- **Max message size:** ~10MB

### 3.3 Submission (Port 587)
```
220 mail.makhanabazar.com ESMTP Postfix
250-PIPELINING, SIZE 10240000, VRFY, ETRN, STARTTLS, ENHANCEDSTATUSCODES, 8BITMIME, DSN, CHUNKING
530 5.7.0 Must issue a STARTTLS command first
```
- Auth requires STARTTLS first -- correct behavior

---

## 4. TLS/SSL Certificate

### 4.1 Certificate Details
| Field | Value |
|-------|-------|
| Issuer | Let's Encrypt (E7) |
| Subject CN | mail.makhanabazar.com |
| Valid From | 2026-04-19 |
| Valid To | 2026-07-18 |
| Days Remaining | ~87 days |
| Key Type | ECDSA P-256 |
| Signature | ecdsa-with-SHA384 |
| SAN | DNS:mail.makhanabazar.com |

### 4.2 TLS Protocol Support
| Protocol | Port 993 (IMAPS) | Port 995 (POP3S) | Port 465 (SMTPS) | Port 587 (Sub) |
|----------|-----------------|-----------------|-----------------|----------------|
| TLS 1.3 | AES-256-GCM | AES-256-GCM | AES-256-GCM | Supported |
| TLS 1.2 | ECDHE-ECDSA-AES256-GCM-SHA384 | Same | Same | Supported |
| TLS 1.1 | Supported* | Supported* | Supported* | Supported* |
| TLS 1.0 | Supported* | Supported* | Supported* | Supported* |

*\*TLS 1.0/1.1 connect but return no cipher -- effectively accepted but weak. These should be DISABLED.*

### 4.3 Issues
- **TLS 1.0 and 1.1 are accepted** -- deprecated protocols, should be disabled
- Certificate expires in 87 days -- auto-renewal should be verified

---

## 5. Authentication Validation

### 5.1 SPF -- FAIL
- **3 records found** (only 1 allowed) -- causes `permerror`
- One record is HTML-encoded and broken
- IP 31.97.117.48 listed but current Cloudflare IPs (104.21.x.x, 172.67.x.x) are not
- `include:_spf.google.com` present but Google Workspace not confirmed in use
- All use `~all` (softfail) instead of `-all` (hardfail)

### 5.2 DKIM -- PASS
- Selector `default` has valid RSA public key
- Selector `s1` points to SendGrid (if SendGrid is used for outbound)

### 5.3 DMARC -- WEAK
- Policy: `none` (monitoring only)
- No aggregate report URI (`rua` missing)
- No forensic report URI (`ruf` missing)
- Alignment: Relaxed for both DKIM and SPF

---

## 6. Deliverability

### 6.1 Blacklist Status
| RBL | Status |
|-----|--------|
| Spamhaus ZEN | CLEAN |
| SpamCop | CLEAN |
| Barracuda | CLEAN |
| SORBS | CLEAN |
| CBL | CLEAN |
| Backscatterer | CLEAN |
| Mailspike | CLEAN |
| UCEProtect L1 | CLEAN |
| PSBL | CLEAN |
| Manitu | CLEAN |
| **Blitzed** | **LISTED** |
| Blocklist.de | CLEAN |
| S5H | CLEAN |
| GBUdb | CLEAN |
| WPBL | CLEAN |
| INPS | CLEAN |
| VIRBL | CLEAN |

**LISTED ON:** Blitzed (copn.blitzed.de) -- both Cloudflare IPs (104.21.34.238, 172.67.166.85)

### 6.2 PTR/rDNS
- No PTR records (behind Cloudflare proxy)
- This is a significant deliverability negative

### 6.3 Overall Deliverability Score: POOR
- SPF broken (multiple records) -- major negative
- No PTR -- major negative
- DMARC policy=none -- moderate negative
- Blacklisted on Blitzed -- moderate negative
- VRFY enabled -- minor negative

---

## 7. Security

### 7.1 Open Relay Test
```
MAIL FROM: <test@example.com>
RCPT TO: <admin@gmail.com>
-> 554 5.7.1 <admin@gmail.com>: Relay access denied
```
**Status:** NOT an open relay. Postfix correctly rejects unauthorized relaying.

### 7.2 Postfix Configuration
| Setting | Value | Assessment |
|---------|-------|------------|
| mynetworks | 127.0.0.0/8 | GOOD |
| relay_restrictions | permit_mynetworks, permit_sasl_authenticated, reject_unauth_destination | GOOD |
| smtpd_sasl_auth_enable | yes | GOOD |
| smtpd_sasl_security_options | noanonymous | GOOD |
| VRFY command | ENABLED | BAD (should be disabled) |
| inet_protocols | ipv4 | OK (IPv6 not needed behind CF) |
| Postfix version | 3.7.11 | CURRENT |

### 7.3 Fail2ban
| Jail | Status |
|------|--------|
| sshd | ACTIVE |
| postfix | NOT CONFIGURED |
| dovecot | NOT CONFIGURED |

**Issue:** No brute-force protection for mail services.

### 7.4 Firewall (UFW)
| Rule | Status |
|------|--------|
| 80/tcp (HTTP) | ALLOW |
| 443/tcp (HTTPS) | ALLOW |
| 22/tcp (SSH) | LIMIT |
| 3000/tcp | ALLOW |

**Issue:** Mail ports (25, 587, 465, 993, 995, 143, 110) are NOT explicitly firewalled. They rely entirely on Postfix/Dovecot access controls.

### 7.5 Mail Queue
```
Mail queue is empty
```
**Status:** No stuck messages.

### 7.6 Software Versions
| Software | Version |
|----------|---------|
| Postfix | 3.7.11 |
| Dovecot | 2.3.19.1 |

Both are current/stable versions.

---

## 8. Recommendations

### CRITICAL (Fix Immediately)
1. **Consolidate SPF to single record:** Remove all 3 existing SPF records. Create ONE:
   ```
   v=spf1 mx a ip4:<your-sending-ip> include:_spf.google.com -all
   ```
2. **Request Blitzed delisting:** Visit https://blitzed.de and request removal
3. **Enforce DMARC:** Change from `p=none` to `p=quarantine` (then eventually `p=reject`):
   ```
   v=DMARC1; p=quarantine; rua=mailto:dmarc@makhanabazar.com; adkim=s; aspf=s;
   ```

### HIGH PRIORITY
4. **Disable VRFY:** Add to `main.cf`: `disable_vrfy_command = yes`
5. **Add Fail2ban jails** for postfix and dovecot brute-force protection
6. **Set up DMARC aggregate reporting** (rua tag) to monitor authentication
7. **Disable TLS 1.0/1.1** in Postfix and Dovecot

### MEDIUM PRIORITY
8. **Add firewall rules** to restrict mail port access where possible
9. **Set up SPF with `-all`** (hardfail) once consolidated
10. **Verify auto-renewal** of Let's Encrypt certificate (expires Jul 18)
11. **Consider removing Google SPF include** if not using Google Workspace

### LOW PRIORITY
12. **Set up PTR** if moving away from Cloudflare proxy for mail
13. **Monitor blacklist status** regularly
14. **Consider MTA-STS** for enforced TLS on SMTP

---

## 9. Priority URLs for Indexing (Web)
```
https://www.makhanabazar.com/
https://www.makhanabazar.com/makhana-foxnut-supplier-usa.html
```
