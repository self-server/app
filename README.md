# SelfServer

Opinionated Self-Hosting Platform

## **WORK IN PROGRESS**
This README is basically a mission statement right now. 
After banging out a really promising proof-of-concept halfway
into the long Thanksgiving weekend, I'm keeping the momentum going.
I'm 100% capable of pulling this off, just need to stay focused.

### Proof of Concepts
- SnapRAID + MergeFS
  - installation/setup process looks to be easy enough to automate.
  - bash? ansible? puppet? chef?  what else is out there that vibes with the goals?
- self contained executable for management interface
  - expressjs + websockets + vuejs + pkggit 

## Purpose
Provide a low maintenance, self-hosting platform by mixing simple, 
reasonable, and robust standards with quality open-source software.

## Features

### Runs on Junk
A minimal footprint is vital to longevity and reducing waste.
SelfServer is responsible with the resources you give it.

| | Current Test Server | Planned Test Server|
| - | ------- | ------- |
| **CPU** | i7-2600 (3.4GHz, 4C/8T) | i3-3220 (3.3GHz, 2C/4T) |
| **RAM** | 16GB DDR3 | 2GB DDR3 |
| **STORAGE** | 2x1TB HDD | 3+x1TB HDD |
| | 16GB flashdrive | 16GB flashdrive


### Just a Bunch of Drives
[MergeFS](https://github.com/trapexit/mergerfs) lets us cobble together a bunch of drives
and treat them as one, while [SnapRAID](https://www.snapraid.it/) helps recover if one
of those drives gives up.

### More than just storage
With [Docker]() integration, how about?
- Content collaboration with [NextCloud]()
- [PiHole]() blocking ads on your entire network
- Play [Minecraft]() with your friends
- Backing up optical discs using [ripper by RiX]()
- Watch those backups on your TV with [Plex]() or [Emby]()
- Track your collection with [Sonarr](), [Radarr]() and [Lidarr]()
- Run your own [Discord Bot]() to generate [Word Clouds]() or [SOME OTHER BOT]()
- A much better example than the Discord Bot thing!
- And countless more.

### But yeah, Network Storage
[Samba]() lets us access files from other possible. 
[FTP](), [SSH](), and [rsync]() are available too if that's your thing.

### Headless
A dedicated monitor, keyboard, and mouse is only needed for the intital setup,
and that's really just to make sure the the thing started.  After that, unplug
that stuff and tuck your new server away in a closet somewhere.

SelfServer is tied together by a custom, web-based interface providing a
satisfying server management experience, even if you're just sitting on
the couch.

### Virtual Private Network
access while away, safer when public - expand on this.

### Open Source
This project wouldn't be possible without open-source software, and
personally, I wouldn't be where I am today without it either.  The code
is as much yours as it is mine.

If you've got the capabilities to improve my work, or extend it with your own ideas, do it.
Make it your own, or help me make it better.

### Live Installation
built with booting off usb in mind, but not restricted to installing to 
a drive.

### Programmers in Mind
- fully documented api (token? oauth? facebook?) 
