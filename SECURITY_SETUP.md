# 🔒 Server Security Implementation

## ✅ What Was Implemented

### 1. **Firewall (firewalld)**

- ✅ Active and running
- ✅ Default policy: DROP (deny all except allowed)
- ✅ SSH rate limiting: Max 10 attempts per minute
- ✅ fail2ban integration: 145+ malicious IPs banned

### 2. **Allowed Ports**

```
✅ 22    - SSH (with rate limiting)
✅ 80    - HTTP
✅ 443   - HTTPS
✅ 3022  - Next.js app (adminnode)
✅ 7080  - OpenLiteSpeed
✅ 8090  - CyberPanel
✅ 21    - FTP
✅ 25, 587, 465 - Email (SMTP)
✅ 110, 995 - Email (POP3)
✅ 143, 993 - Email (IMAP)
✅ 53    - DNS
```

### 3. **Cryptocurrency Mining Protection**

Blocked outgoing connections to common mining ports:

- 3333, 4444, 5555, 7777, 8888, 14444, 19999
- Blocked mining pool IP: 144.126.146.50

### 4. **Security Monitoring Scripts**

#### Check Security Status

```bash
ssh root@185.149.234.57 '/root/check_security.sh'
```

Shows:

- Firewall status
- Open ports
- Banned IPs
- Suspicious connections
- Suspicious processes
- Recent login attempts

#### Check Server Health

```bash
ssh root@185.149.234.57 '/root/check_server.sh'
```

Shows:

- Memory usage
- PM2 app status
- Top memory consumers

---

## 🛡️ Security Features Active

| Feature        | Status    | Description                           |
| -------------- | --------- | ------------------------------------- |
| Firewall       | ✅ Active | Blocks all except allowed ports       |
| SSH Rate Limit | ✅ Active | Max 10 attempts/minute                |
| fail2ban       | ✅ Active | Auto-bans brute force attempts        |
| Mining Block   | ✅ Active | Blocks crypto mining connections      |
| Memory Limits  | ✅ Active | Apps restart before consuming all RAM |
| Monitoring     | ✅ Active | Tracks memory/security every 5 min    |

---

## 📋 Regular Security Checks

### Daily (First Week)

```bash
# Check if server is healthy
ssh root@185.149.234.57 'pm2 list && free -h'

# Check for suspicious activity
ssh root@185.149.234.57 '/root/check_security.sh'
```

### Weekly

```bash
# Check banned IPs count
ssh root@185.149.234.57 'fail2ban-client status sshd'

# Check for malware
ssh root@185.149.234.57 'find /tmp /var/tmp /etc -type f -executable -mtime -7'
```

---

## 🚨 Security Alerts to Watch For

### 🔴 Critical (Act Immediately)

1. Unauthorized processes running
2. Connections to unknown mining pools
3. Firewall stopped/disabled
4. Multiple failed root login attempts

### 🟡 Warning (Investigate Soon)

1. High number of banned IPs (500+)
2. Unusual outgoing connections
3. New executable files in /tmp
4. Unexpected port openings

---

## 🔧 Security Management Commands

### Check Firewall Status

```bash
ssh root@185.149.234.57 'firewall-cmd --state'
```

### List All Open Ports

```bash
ssh root@185.149.234.57 'firewall-cmd --zone=work --list-all'
```

### Check fail2ban Banned IPs

```bash
ssh root@185.149.234.57 'fail2ban-client status sshd'
```

### Unban an IP (if needed)

```bash
ssh root@185.149.234.57 'fail2ban-client set sshd unbanip <IP_ADDRESS>'
```

### Add New Allowed Port

```bash
ssh root@185.149.234.57 'firewall-cmd --permanent --zone=work --add-port=<PORT>/tcp && firewall-cmd --reload'
```

### Block Specific IP

```bash
ssh root@185.149.234.57 'firewall-cmd --permanent --zone=drop --add-source=<IP_ADDRESS> && firewall-cmd --reload'
```

---

## 🔐 Additional Security Recommendations

### 1. Change Root Password (Do This Week!)

```bash
ssh root@185.149.234.57 'passwd'
```

Use a strong password with:

- At least 16 characters
- Mix of uppercase, lowercase, numbers, symbols
- No dictionary words

### 2. Disable Root Password Login (After Setting Up SSH Keys)

```bash
# Generate SSH key on your local machine (if you don't have one)
ssh-keygen -t ed25519 -C "your_email@example.com"

# Copy key to server
ssh-copy-id root@185.149.234.57

# Test key-based login works
ssh root@185.149.234.57 'whoami'

# Then disable password login
ssh root@185.149.234.57 'sed -i "s/^#*PermitRootLogin.*/PermitRootLogin prohibit-password/" /etc/ssh/sshd_config && systemctl restart sshd'
```

### 3. Check for Rootkits

```bash
# Install rkhunter
ssh root@185.149.234.57 'yum install rkhunter -y'

# Run scan
ssh root@185.149.234.57 'rkhunter --check --skip-keypress'
```

### 4. Enable Automatic Security Updates

```bash
ssh root@185.149.234.57 'yum install yum-cron -y && systemctl enable yum-cron && systemctl start yum-cron'
```

---

## 📊 Monitoring Logs

### Memory Monitor Log

```bash
ssh root@185.149.234.57 'tail -50 /var/log/memory_monitor.log'
```

### SSH Login Attempts

```bash
ssh root@185.149.234.57 'tail -100 /var/log/secure | grep -i "failed\|accepted"'
```

### Firewall Logs

```bash
ssh root@185.149.234.57 'journalctl -u firewalld -n 50'
```

### fail2ban Logs

```bash
ssh root@185.149.234.57 'tail -100 /var/log/fail2ban.log'
```

---

## 🎯 Security Checklist

- [x] Firewall installed and configured
- [x] fail2ban protecting SSH
- [x] Mining ports blocked
- [x] SSH rate limiting enabled
- [x] Malware removed
- [ ] Root password changed (**DO THIS WEEK!**)
- [ ] SSH key authentication set up
- [ ] Root password login disabled
- [ ] Rootkit scanner installed
- [ ] Automatic security updates enabled

---

## 📞 When to Seek Help

1. **Firewall stops working** - Server becomes unreachable
2. **Malware detected** - Suspicious processes or connections
3. **Massive failed login attempts** - 1000+ in short time
4. **Unexpected port openings** - Ports you didn't configure
5. **Server performance degradation** - High CPU/memory from unknown processes

---

## 🔄 Automatic Security Features

These run automatically without your intervention:

1. **Every 5 minutes:** Memory monitoring log
2. **Every 10 minutes:** Emergency restart check
3. **Continuous:** fail2ban monitoring SSH attempts
4. **Continuous:** Firewall blocking unauthorized connections
5. **Continuous:** PM2 restarting apps at memory limits

---

## ✅ Current Security Status

```
✓ Firewall: Running
✓ fail2ban: Active (145+ IPs banned)
✓ SSH Rate Limit: 10/minute
✓ Mining Ports: Blocked
✓ Monitoring: Active
✓ Memory Limits: Applied
✓ Malware: Removed
```

**Your server is now significantly more secure!** 🎉

The main remaining task is to **change your root password** since your server was compromised by the cryptocurrency miner.
