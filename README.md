# GNOME Language emoji flag indicator
![](img/img.png)

Enhances language labels in `evdev.xml` by replacing them with Emoji flags based on ISO 3166 codes.

## Installation
1. Clone this repository.
2. Run `python3 glyphs2flags.py` to generate `evdev.xml`.
3. Make a backup `cp /usr/share/X11/xkb/rules/evdev.xml evdev.bkp`
4. Replace original `evdev.xml` with modified one `cp evdev.xml /usr/share/X11/xkb/rules/evdev.xml`
5. Restart GDM `killall -SIGQUIT gnome-shell` or reboot to apply changes.
6. Enjoy improved language labels with Emoji flags.

To revert changes, return the backup to it's place `cp evdev.bkp /usr/share/X11/xkb/rules/evdev.xml` and restart GDM.

## Customize Emoji Set
Change the emoji set using different fonts.
| | | ArchLinux | Ubuntu |
| --- | --- | --- | --- |
| <img src="https://em-content.zobj.net/source/google/387/flag-denmark_1f1e9-1f1f0.png" width=24 height=24> <img src="https://em-content.zobj.net/source/google/387/flag-uzbekistan_1f1fa-1f1ff.png" width=24 height=24> | JoyPixels | `paru -S ttf-joypixels` | `sudo apt-get install fonts-joypixels` |
| <img src="https://em-content.zobj.net/source/apple/354/flag-denmark_1f1e9-1f1f0.png" width=24 height=24> <img src="https://em-content.zobj.net/source/apple/354/flag-uzbekistan_1f1fa-1f1ff.png" width=24 height=24> | Apple Emoji | `paru -S ttf-apple-emoji` | `sudo apt-get install fonts-noto-color-emoji` |
| <img src="https://em-content.zobj.net/source/twitter/376/flag-denmark_1f1e9-1f1f0.png" widht=24 height=24> <img src="https://em-content.zobj.net/source/twitter/376/flag-uzbekistan_1f1fa-1f1ff.png" widht=24 height=24> | Twemoji | `paru -S ttf-twemoji-color` | `sudo apt-get install fonts-twemoji` |
