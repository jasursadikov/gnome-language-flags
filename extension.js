import { Extension } from 'resource:///org/gnome/shell/extensions/extension.js';
import GLib from 'gi://GLib';

export default class LanguageFlags extends Extension {
	constructor(metaData) {
		super(metaData);
		this.extensionDir = metaData.path;
		this.evdevPath = `/usr/share/X11/xkb/rules/evdev.xml`;
		this.backupPath = `${this.extensionDir}/evdev.bkp`;
		this.outputPath = `${this.extensionDir}/evdev/emoji.xml`;
	}
	enable() {
		if (!GLib.file_test(this.backupPath, GLib.FileTest.EXISTS))
			GLib.spawn_command_line_sync(`cp "${this.evdevPath}" "${this.backupPath}"`);
		GLib.spawn_command_line_sync(`cp "${this.outputPath}" "${this.evdevPath}"`);
	}
	disable() {
		GLib.spawn_command_line_sync(`cp "${this.backupPath}" "${this.evdevPath}"`);
	}
}