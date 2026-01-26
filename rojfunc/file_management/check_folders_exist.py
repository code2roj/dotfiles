import os
import sys

def check_folder(path, create_if_missing: bool):
    """
    Checks if the folder at `path` exists.
    - If create_if_missing is True, creates the folder if it doesn't exist.
    - If create_if_missing is False, exits with error if folder doesn't exist.
    Returns True if the folder exists (or was created), otherwise exits.
    """
    if os.path.isdir(path):
        print(f"Folder exists: {path}")
        return True

    if create_if_missing:
        try:
            os.makedirs(path, exist_ok=True)
            print(f"Successfully created folder: {path}")
            return True
        except OSError as e:
            print(f"Error creating folder {path}: {e}")
            sys.exit(1)
    else:
        print(f"Error: Folder does not exist: {path}")
        sys.exit(1)
