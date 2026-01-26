import subprocess
import os

def get_file_metadata(file_path: str) -> dict:
    """
    Returns metadata of a file as a dictionary using exiftool.
    """
    if not os.path.isfile(file_path):
        raise FileNotFoundError(f"File does not exist: {file_path}")

    result = subprocess.run(["exiftool", file_path],
                            capture_output=True, text=True, check=True)

    metadata = {"FileName": os.path.basename(file_path)}

    for line in result.stdout.splitlines():
        if ":" not in line:
            continue
        key, value = line.split(":", 1)
        metadata[key.strip()] = value.strip()

    return metadata
