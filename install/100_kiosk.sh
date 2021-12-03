su -

apt-get install unclutter xorg chromium openbox lightdm locales -y
mkdir -p /home/administrator/.config/openbox
chown -R administrator:administrator /home/administration/.config

cat > /etc/X11/xorg.conf.d/15-no-vt.conf << EOF
Section "ServerFlags"
    Option "DontVTSwitch" "true"
EndSection
EOF

sed -i.bak '/^\[Seat:\*\]$/a autologin-user=administrator\nautologin-user-timeout=0' /etc/lightdm/lightdm.conf


cat > /home/administrator/.config/openbox/autostart << EOF
#!/bin/bash
unclutter -idle 0.1 -grab -root &
while :
do
  chromium \
    --no-first-run \
    --start-maximized \
    --window-position=0,0 \
    --window-size=1024,768 \
    --disable \
    --disable-translate \
    --disable-infobars \
    --disable-suggestions-service \
    --disable-save-password-bubble \
    --disable-session-crashed-bubble \
    --incognito \
    --kiosk "http://localhost/"
  sleep 5
done &
EOF