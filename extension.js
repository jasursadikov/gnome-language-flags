import { Extension } from 'resource:///org/gnome/shell/extensions/extension.js';
import GLib from 'gi://GLib';
import Gio from 'gi://Gio';

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
			Gio.File.copy(this.evdevPath, this.backupPath);
		Gio.File.copy(this.outputPath, this.evdevPath);
	}
	disable() {
		Gio.File.copy(this.backupPath, this.evdevPath);
	}
}