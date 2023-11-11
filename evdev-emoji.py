import xml.etree.ElementTree as ET
import shutil

evdev_path = '/usr/share/X11/xkb/rules/evdev.xml'
backup_path = 'evdev.xml.bkp'
output_file_path = 'evdev.xml'

shutil.copy(evdev_path, backup_path)

tree = ET.parse(evdev_path)
root = tree.getroot()

def iso3166_to_emoji_flag(iso_code):
    return chr(ord(iso_code[0]) - ord('A') + 0x1F1E6) + chr(ord(iso_code[1]) - ord('A') + 0x1F1E6)

for layout in root.findall('.//configItem'):
    short_description = layout.find('shortDescription')
    iso3166_codes = layout.findall('.//iso3166Id')

    if short_description is not None and iso3166_codes:
        country_code = iso3166_codes[0].text

        try:
            emoji = iso3166_to_emoji_flag(country_code)
            print(f'{short_description.text} {emoji}')
            short_description.text = emoji
        except IndexError:
            print('Invalid country code:', country_code)

tree.write(output_file_path, encoding='utf-8', xml_declaration=True)