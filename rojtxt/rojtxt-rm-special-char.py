#!/bin/python3

import re
import sys

def replace_in_file(regex_pattern, replacement, file_path):
    pattern = re.compile(regex_pattern)
    with open(file_path, "r", encoding="utf-8") as file:
        content = file.read()
    new_content = pattern.sub(replacement, content)
    with open(file_path, "w", encoding="utf-8") as file:
        file.write(new_content)

def main():
    if len(sys.argv) < 2:
        print("Usage: rojtext-rm-special-char <file path>")
        sys.exit(1)
        
    file_path = sys.argv[1]
    
    # Define patterns to remove
    patterns = [r"#", r"\*", r"_", r"^ "]
    
    for pattern in patterns:
        replace_in_file(pattern, "", file_path)

if __name__ == "__main__":
    main()
