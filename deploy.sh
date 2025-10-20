#!/bin/bash

# Behimelobot Deployment Script
# This script sets up the Behimelobot music web app on a Linux VPS

set -e

echo "🎵 Behimelobot Deployment Script 🎵"
echo "=================================="

# Check if running as root
if [[ $EUID -eq 0 ]]; then
   echo "❌ This script should not be run as root for security reasons"
   exit 1
fi

# Update system packages
echo "📦 Updating system packages..."
sudo apt update && sudo apt upgrade -y

# Install required packages
echo "🔧 Installing required packages..."
sudo apt install -y curl wget git nginx certbot python3-certbot-nginx

# Install Docker
if ! command -v docker &> /dev/null; then
    echo "🐳 Installing Docker..."
    curl -fsSL https://get.docker.com -o get-docker.sh
    sudo sh get-docker.sh
    sudo usermod -aG docker $USER
    rm get-docker.sh
fi

# Install Docker Compose
if ! command -v docker-compose &> /dev/null; then
    echo "🐳 Installing Docker Compose..."
    sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
fi

# Create application directory
APP_DIR="/opt/behimelobot"
echo "📁 Creating application directory at $APP_DIR..."
sudo mkdir -p $APP_DIR
sudo chown $USER:$USER $APP_DIR

# Clone or update repository
if [ -d "$APP_DIR/.git" ]; then
    echo "🔄 Updating existing repository..."
    cd $APP_DIR
    git pull origin main
else
    echo "📥 Cloning repository..."
    git clone https://github.com/your-username/behimelobot.git $APP_DIR
    cd $APP_DIR
fi

# Set up environment variables
if [ ! -f "$APP_DIR/.env" ]; then
    echo "⚙️ Setting up environment variables..."
    cp .env.example .env
    echo "✏️ Please edit the .env file with your configuration:"
    echo "   - ONE_API_TOKEN: Your One-API token"
    echo "   - Add any other required configuration"
    read -p "Press Enter to continue after editing .env file..."
fi

# Generate SSL certificates (Let's Encrypt)
read -p "🔒 Enter your domain name for SSL certificate (e.g., behimelobot.com): " DOMAIN_NAME
if [ ! -z "$DOMAIN_NAME" ]; then
    echo "🔒 Generating SSL certificate for $DOMAIN_NAME..."
    sudo certbot certonly --nginx -d $DOMAIN_NAME --non-interactive --agree-tos --email admin@$DOMAIN_NAME
    
    # Copy certificates to project directory
    sudo mkdir -p $APP_DIR/ssl
    sudo cp /etc/letsencrypt/live/$DOMAIN_NAME/fullchain.pem $APP_DIR/ssl/cert.pem
    sudo cp /etc/letsencrypt/live/$DOMAIN_NAME/privkey.pem $APP_DIR/ssl/key.pem
    sudo chown -R $USER:$USER $APP_DIR/ssl
fi

# Build and start the application
echo "🚀 Building and starting Behimelobot..."
docker-compose down --remove-orphans
docker-compose build --no-cache
docker-compose up -d

# Wait for services to start
echo "⏳ Waiting for services to start..."
sleep 30

# Check if services are running
if docker-compose ps | grep -q "Up"; then
    echo "✅ Behimelobot is running successfully!"
    echo ""
    echo "🌐 Access your application at:"
    if [ ! -z "$DOMAIN_NAME" ]; then
        echo "   https://$DOMAIN_NAME"
    else
        echo "   http://$(curl -s ifconfig.me):5000"
    fi
    echo ""
    echo "📊 Monitor logs with: docker-compose logs -f"
    echo "🔄 Restart with: docker-compose restart"
    echo "🛑 Stop with: docker-compose down"
else
    echo "❌ Something went wrong. Check logs with: docker-compose logs"
    exit 1
fi

# Set up automatic SSL renewal
if [ ! -z "$DOMAIN_NAME" ]; then
    echo "🔄 Setting up automatic SSL renewal..."
    (crontab -l 2>/dev/null; echo "0 12 * * * /usr/bin/certbot renew --quiet && docker-compose restart nginx") | crontab -
fi

# Set up log rotation
echo "📝 Setting up log rotation..."
sudo tee /etc/logrotate.d/behimelobot > /dev/null <<EOF
$APP_DIR/logs/*.log {
    daily
    missingok
    rotate 52
    compress
    notifempty
    create 644 $USER $USER
    postrotate
        docker-compose restart behimelobot
    endscript
}
EOF

echo ""
echo "🎉 Deployment completed successfully!"
echo "🎵 Behimelobot is now ready to stream Persian music!"
echo ""
echo "📋 Next steps:"
echo "   1. Configure your DNS to point to this server"
echo "   2. Test the application thoroughly"
echo "   3. Set up monitoring and backups"
echo "   4. Enjoy streaming music! 🎶"