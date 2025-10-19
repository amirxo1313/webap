# VPN Setup Guide for Behimelobot

This guide explains how to configure your VPS to route Radio Javan API requests through a VPN tunnel, allowing users in Iran to access the service without needing their own VPN.

## Prerequisites

- A VPS running Linux (Ubuntu/Debian recommended)
- Root or sudo access
- A VPN service (WireGuard or OpenVPN recommended)
- VPN credentials from your provider

## Option 1: WireGuard Setup (Recommended)

### 1. Install WireGuard

```bash
sudo apt update
sudo apt install wireguard
```

### 2. Configure WireGuard

Create configuration file `/etc/wireguard/wg0.conf`:

```ini
[Interface]
PrivateKey = <YOUR_PRIVATE_KEY>
Address = <YOUR_VPN_IP>/32
DNS = 1.1.1.1

[Peer]
PublicKey = <SERVER_PUBLIC_KEY>
Endpoint = <VPN_SERVER_IP>:<PORT>
AllowedIPs = 0.0.0.0/0
PersistentKeepalive = 25
```

### 3. Enable IP Forwarding

```bash
echo "net.ipv4.ip_forward=1" | sudo tee -a /etc/sysctl.conf
sudo sysctl -p
```

### 4. Start WireGuard

```bash
sudo wg-quick up wg0
sudo systemctl enable wg-quick@wg0
```

### 5. Verify Connection

```bash
sudo wg show
curl --interface wg0 https://api.ipify.org
```

## Option 2: OpenVPN Setup

### 1. Install OpenVPN

```bash
sudo apt update
sudo apt install openvpn
```

### 2. Copy Configuration

```bash
sudo cp your-vpn-config.ovpn /etc/openvpn/client.conf
```

### 3. Start OpenVPN

```bash
sudo systemctl start openvpn@client
sudo systemctl enable openvpn@client
```

### 4. Verify Connection

```bash
ip addr show tun0
curl --interface tun0 https://api.ipify.org
```

## Configure Node.js to Use VPN

The backend server needs to route API requests through the VPN interface. This is handled in the `server/routes.ts` file using environment variables.

### Set Environment Variable

```bash
export VPN_INTERFACE=wg0  # or tun0 for OpenVPN
```

### Add to systemd service (for production)

Create `/etc/systemd/system/behimelobot.service`:

```ini
[Unit]
Description=Behimelobot Music Streaming Service
After=network.target wg-quick@wg0.service

[Service]
Type=simple
User=nodejs
WorkingDirectory=/var/www/behimelobot
Environment="NODE_ENV=production"
Environment="VPN_INTERFACE=wg0"
Environment="ONE_API_TOKEN=752295:68ef56c8bd6eb"
ExecStart=/usr/bin/node server/index.js
Restart=always

[Install]
WantedBy=multi-user.target
```

## Nginx Configuration

Create `/etc/nginx/sites-available/behimelobot`:

```nginx
server {
    listen 80;
    server_name your-domain.com;

    # Redirect HTTP to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name your-domain.com;

    # SSL Configuration (Let's Encrypt)
    ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable the site:

```bash
sudo ln -s /etc/nginx/sites-available/behimelobot /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## SSL Certificate (Let's Encrypt)

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

## Testing VPN Routing

Test that API requests go through VPN:

```bash
# Without VPN (should fail or be filtered)
curl https://api.one-api.ir/radiojavan/v1/home -H "one-api-token: 752295:68ef56c8bd6eb"

# With VPN (should work)
curl --interface wg0 https://api.one-api.ir/radiojavan/v1/home -H "one-api-token: 752295:68ef56c8bd6eb"
```

## Monitoring

Check VPN status:

```bash
# WireGuard
sudo wg show

# OpenVPN
sudo systemctl status openvpn@client
```

Check application logs:

```bash
sudo journalctl -u behimelobot -f
```

## Troubleshooting

### VPN Connection Issues

1. Check VPN credentials
2. Verify firewall rules allow VPN traffic
3. Check VPN server status
4. Review logs: `sudo journalctl -xe`

### API Requests Not Going Through VPN

1. Verify VPN interface is up: `ip addr`
2. Check routing table: `ip route`
3. Ensure NODE_ENV variables are set correctly
4. Review application logs

### DNS Issues

Add DNS servers to WireGuard config:

```ini
DNS = 1.1.1.1, 8.8.8.8
```

## Security Notes

- Keep your VPN credentials secure
- Use strong SSL/TLS configuration
- Enable firewall (ufw or iptables)
- Regular security updates: `sudo apt update && sudo apt upgrade`
- Monitor logs for suspicious activity
- Use fail2ban to prevent brute force attacks

## Production Checklist

- [x] VPN configured and running
- [x] Systemd service created
- [x] Nginx reverse proxy configured
- [x] SSL certificate installed
- [x] Firewall configured
- [x] Environment variables set
- [x] Logging configured
- [x] Monitoring setup
- [x] Backup strategy in place
