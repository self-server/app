sudo su
cd /usr/sbin
wget https://github.com/self-server/app/raw/master/release/selfserver
chmod +x selfserver

cat > /etc/systemd/system/selfserver.service << EOF
[Unit]
Description=SelfServer

Wants=network.target
After=multi-user.target syslog.target network-online.target

[Service]
Type=simple
ExecStart=/usr/sbin/selfserver
Restart=on-failure
RestartSec=10
KillMode=process

[Install]
WantedBy=multi-user.target

EOF
chmod 640 /etc/systemd/system/selfserver.service
systemctl enable selfserver