def get_file_prefix(filename: str) -> str:
    """
    Extracts the first segment of a filename before the first hyphen.
    Note: This function is currently not used by add_date_after_prefix,
    as date addition logic handles prefix detection internally for robustness.
    """
    prefix = filename.split("-")[0]
    return prefix