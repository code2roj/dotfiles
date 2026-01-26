import os

def create_file_alias(src_path: str, target_dir: str = None) -> str:
    """
    Creates an alias (symlink) of a file with `-alias` suffix.
    - src_path: source file (mandatory)
    - target_dir: optional destination directory
    Returns the path of the alias file.
    """
    if not os.path.isfile(src_path):
        raise FileNotFoundError(f"Source file does not exist: {src_path}")

    dirname = target_dir if target_dir else os.path.dirname(src_path)
    os.makedirs(dirname, exist_ok=True)

    name, ext = os.path.splitext(os.path.basename(src_path))
    alias_name = f"{name}-alias{ext}"
    alias_path = os.path.join(dirname, alias_name)

    if os.path.exists(alias_path):
        os.remove(alias_path)  # remove existing alias if already present

    os.symlink(src_path, alias_path)
    return alias_path
