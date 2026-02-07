#!/bin/bash

DOMAIN_NAME="placeHolder"
NGINX_CONFIG_PATH="/etc/nginx/sites-available/$DOMAIN_NAME"

sudo apt update && sudo apt install nginx certbot python3-certbot-nginx -y

sudo tee $NGINX_CONFIG_PATH > /dev/null <<EOF
server {
    listen 80;
    server_name $DOMAIN_NAME;
    location / { return 301 https://\$host\$request_uri; }
}

server {
    listen 443 ssl;
    server_name $DOMAIN_NAME;
    ssl_certificate /etc/letsencrypt/live/$DOMAIN_NAME/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/$DOMAIN_NAME/privkey.pem;

    location / {
        proxy_pass http://127.0.0.1:5678;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection "Upgrade";
        proxy_buffering off;
    }
}
EOF

# Crucial: Stop Nginx so Certbot can use port 80
sudo systemctl stop nginx
sudo certbot certonly --standalone -d $DOMAIN_NAME --non-interactive --agree-tos -m code2roj@gmail.com

sudo ln -sf $NGINX_CONFIG_PATH /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl restart nginx
