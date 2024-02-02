import { Extension } from 'resource:///org/gnome/shell/extensions/extension.js';
import GLib from 'gi://GLib';

export default class LanguageFlags extends Extension {
	constructor(metaData) {
		super(metaData);
		this.extensionDir = metaData.path;
		this.evdevPath = '/usr/share/X11/xkb/rules/evdev.xml';
		this.backupPath = `${this.extensionDir}/evdev.bkp`;
		this.glyphs2flagsPath = `${this.extensionDir}/glyphs2flags.py`;
		this.outputPath = `${this.extensionDir}/evdev.xml`;
		this.defaultResultPath = `${this.extensionDir}/evdev/emoji.xml`;
	}
	
	_executeCommand(command) {
		let [success, , , exitStatus] = GLib.spawn_command_line_sync(command);
		return success && exitStatus === 0;
	}

	enable() {
		if (!GLib.file_test(this.backupPath, GLib.FileTest.EXISTS)) {
			this._executeCommand(`cp "${this.evdevPath}" "${this.backupPath}"`);
		}
		
		const executedSuccessfully = this._executeCommand(`python3 "${this.glyphs2flagsPath}"`) &&
		                             this._executeCommand(`cp "${this.outputPath}" "${this.evdevPath}"`);
		
		if (!executedSuccessfully) {
			this._executeCommand(`cp "${this.defaultResultPath}" "${this.evdevPath}"`);
		}
	}

	disable() {
		this._executeCommand(`cp "${this.backupPath}" "${this.evdevPath}"`);
	}
}
