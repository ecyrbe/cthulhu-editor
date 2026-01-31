#!/usr/bin/env python3
import os
import subprocess
import sys
from fontTools.ttLib import TTFont

# Configuration
SOURCE_FONT = "/usr/share/fonts/truetype/noto/NotoColorEmoji.ttf" # You'll need the original full TTF for this
OUTPUT_DIR = "src/assets/fonts"
FONT_NAME = "Noto Color Flags"
PS_NAME = "NotoColorFlags"
OUTPUT_FILENAME = "NotoColorFlags.woff2"

# Unicode for current flags: FR, GB, ES, DE, PT :
# U+1F1EB U+1F1F7 (FR) 🇫🇷
# U+1F1EC U+1F1E7 (GB) 🇬🇧
# U+1F1EA U+1F1F8 (ES) 🇪🇸
# U+1F1DE U+1F1EA (DE) 🇩🇪
# U+1F1F5 U+1F1F9 (PT) 🇵🇹
UNICODES = "U+1F1DE,U+1F1EA,U+1F1EC,U+1F1E7,U+1F1EA,U+1F1F8,U+1F1EB,U+1F1F7,U+1F1F5,U+1F1F9"

def rename_font(path, new_name, ps_name):
    print(f"Renaming internal metadata to '{new_name}'...")
    font = TTFont(path)
    for record in font['name'].names:
        # 1: Family, 4: Full, 16: Typographic Family, 21: WWS Family
        if record.nameID in [1, 4, 16, 21]:
            record.string = new_name.encode(record.getEncoding())
        # 6: PostScript name
        elif record.nameID == 6:
            record.string = ps_name.encode(record.getEncoding())
    
    temp_path = path + ".renamed"
    font.save(temp_path)
    return temp_path

def subset_font(input_path, output_path, unicodes):
    print(f"Subsetting font for unicodes: {unicodes}")
    cmd = [
        "pyftsubset",
        input_path,
        f"--unicodes={unicodes}",
        "--layout-features=*",
        "--flavor=woff2",
        f"--output-file={output_path}"
    ]
    subprocess.run(cmd, check=True)

def main():
    if not os.path.exists(SOURCE_FONT):
        print(f"Error: Source font not found at {SOURCE_FONT}")
        print("Please place the full NotoColorEmoji.ttf at that location to run this script.")
        sys.exit(1)

    os.makedirs(OUTPUT_DIR, exist_ok=True)
    
    renamed_temp = None
    try:
        # 1. Rename metadata in a copy of the source
        renamed_temp = rename_font(SOURCE_FONT, FONT_NAME, PS_NAME)
        
        # 2. Subset to WOFF2
        output_path = os.path.join(OUTPUT_DIR, OUTPUT_FILENAME)
        subset_font(renamed_temp, output_path, UNICODES)
        
        print(f"Successfully created {output_path}")
        
    finally:
        if renamed_temp and os.path.exists(renamed_temp):
            os.remove(renamed_temp)

if __name__ == "__main__":
    main()
