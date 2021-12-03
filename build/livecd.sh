sudo debootstrap --arch=amd64 --variant=minbase bullseye livecd/chroot http://ftp.us.debian.org/debian/
sudo chroot livecd/chroot


# after chrooting in
echo "SelfServer" > /etc/hostname

apt-get update && apt-get install --no-install-recommends linux-image-amd64 live-boot systemd-sysv -y
apt-get install sudo -y

useradd -G sudo -m -p SelfServer administrator
apt-get install snapraid parted gdisk mergerfs -y
mkdir -p /mnt/data
mkdir -p /mnt/parity

echo "
# SnapRAID Data Disks

# SnapRAID Parity Disks

# MergerFS Pool
/mnt/data/* /storage fuse.mergerfs allow_other,direct_io,use_ino,category.create=lfs,moveonenospc=true,minfreespace=20G,fsname=mergerfsPool 0 0

" >> /etc/fstab

# firewall
# live cd does not have this because I can't figure out why --dport isn't working 
# echo iptables-persistent iptables-persistent/autosave_v4 boolean true | sudo debconf-set-selections
# echo iptables-persistent iptables-persistent/autosave_v6 boolean true | sudo debconf-set-selections
# apt-get install iptables iptables-persistent -y
# iptables -t nat -A PREROUTING -p tcp -m tcp --dport 80 -j REDIRECT --to-ports 8080
# /sbin/iptables-save > /etc/iptables/rules.v4

# install selfserver
apt-get install wget -y
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

# set up kiosk

apt-get install unclutter xorg chromium openbox lightdm locales -y
mkdir -p /home/administrator/.config/openbox


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
    --kiosk "http://localhost:8080/"
  sleep 5
done &
EOF
chown -R administrator:administrator /home/administrator/.config

passed root
exit

# back in host os (ie, my desktop)
mkdir -p livecd/{staging/{EFI/boot,boot/grub/x86_64-efi,isolinux,live},tmp}
sudo mksquashfs \
    livecd/chroot \
    livecd/staging/live/filesystem.squashfs \
    -e boot

cp livecd/chroot/boot/vmlinuz-* \
    livecd/staging/live/vmlinuz && \
cp livecd/chroot/boot/initrd.img-* \
    livecd/staging/live/initrd    

cat <<'EOF' > livecd/staging/isolinux/isolinux.cfg
UI vesamenu.c32

MENU TITLE SelfServer
DEFAULT selfserver
TIMEOUT 0
MENU RESOLUTION 640 480
MENU COLOR border       30;44   #40ffffff #a0000000 std
MENU COLOR title        1;36;44 #9033ccff #a0000000 std
MENU COLOR sel          7;37;40 #e0ffffff #20ffffff all
MENU COLOR unsel        37;44   #50ffffff #a0000000 std
MENU COLOR help         37;40   #c0ffffff #a0000000 std
MENU COLOR timeout_msg  37;40   #80ffffff #00000000 std
MENU COLOR timeout      1;37;40 #c0ffffff #00000000 std
MENU COLOR msg07        37;40   #90ffffff #a0000000 std
MENU COLOR tabmsg       31;40   #30ffffff #00000000 std

LABEL selfserver
  MENU LABEL SelfServer [BIOS/ISOLINUX]
  MENU DEFAULT
  KERNEL /live/vmlinuz
  APPEND initrd=/live/initrd boot=live
EOF

cat <<'EOF' > livecd/staging/boot/grub/grub.cfg
search --set=root --file /SELFSERVER

set default="0"
set timeout=0

# If X has issues finding screens, experiment with/without nomodeset.

menuentry "SelfServer [EFI/GRUB]" {
    linux ($root)/live/vmlinuz boot=live
    initrd ($root)/live/initrd
}
EOF

cat <<'EOF' > livecd/tmp/grub-standalone.cfg
search --set=root --file /SELFSERVER
set prefix=($root)/boot/grub/
configfile /boot/grub/grub.cfg
EOF

touch livecd/staging/SELFSERVER

cp /usr/lib/ISOLINUX/isolinux.bin livecd/staging/isolinux/ && \
cp /usr/lib/syslinux/modules/bios/* livecd/staging/isolinux/

cp -r /usr/lib/grub/x86_64-efi/* livecd/staging/boot/grub/x86_64-efi/

grub-mkstandalone \
    --format=x86_64-efi \
    --output=livecd/tmp/bootx64.efi \
    --locales="" \
    --fonts="" \
    "boot/grub/grub.cfg=livecd/tmp/grub-standalone.cfg"


(cd /home/jason/selfserver/livecd/staging/EFI/boot && \
    dd if=/dev/zero of=efiboot.img bs=1M count=20 && \
    mkfs.vfat efiboot.img && \
    mmd -i efiboot.img efi efi/boot && \
    mcopy -vi efiboot.img /home/jason/selfserver/livecd/tmp/bootx64.efi ::efi/boot/
)    

xorriso \
    -as mkisofs \
    -iso-level 3 \
    -o "selfserver.iso" \
    -full-iso9660-filenames \
    -volid "SELFSERVER" \
    -isohybrid-mbr /usr/lib/ISOLINUX/isohdpfx.bin \
    -eltorito-boot \
        isolinux/isolinux.bin \
        -no-emul-boot \
        -boot-load-size 4 \
        -boot-info-table \
        --eltorito-catalog isolinux/isolinux.cat \
    -eltorito-alt-boot \
        -e /EFI/boot/efiboot.img \
        -no-emul-boot \
        -isohybrid-gpt-basdat \
    -append_partition 2 0xef livecd/staging/EFI/boot/efiboot.img \
    "livecd/staging"