sudo su
apt-get install snapraid parted gdisk mergerfs -y
mkdir -p /mnt/data
mkdir -p /mnt/parity

# https://zackreed.me/setting-up-snapraid-on-ubuntu/
# https://zackreed.me/mergerfs-another-good-option-to-pool-your-snapraid-disks/

echo "
# SnapRAID Data Disks

# SnapRAID Parity Disks

# MergerFS Pool
/mnt/data/* /storage fuse.mergerfs allow_other,direct_io,use_ino,category.create=lfs,moveonenospc=true,minfreespace=20G,fsname=mergerfsPool 0 0

" >> /etc/fstab