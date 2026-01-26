import os
import re
import time

def add_date_after_prefix(file_path):
    """
    Gets a file path and adds today's date to the file name.
    The date is inserted after an existing custom prefix (if any) or at the beginning.
    If a file with the same name already exists, it appends a counter to the file name.
    """
    directory = os.path.dirname(file_path)
    base_name = os.path.basename(file_path)
    file_name_without_ext, file_extension = os.path.splitext(base_name)
    date_stamp = time.strftime("%Y-%m-%d")

    # Regex to match existing date patterns:
    # 1. CustomPrefix-YYYY-MM-DD-OriginalName
    # 2. YYYY-MM-DD-OriginalName
    # group(1) captures custom prefix (optional), group(2) captures date, group(3) captures original name
    existing_date_pattern = re.compile(r"^(.*?)(?:-(\d{4}-\d{2}-\d{2}))-(.*)$")
    match_existing_date = existing_date_pattern.match(file_name_without_ext)

    if match_existing_date:
        # File already has a date in the expected format
        existing_date_part = match_existing_date.group(2)
        if existing_date_part == date_stamp:
            print(f"File '{base_name}' already has the current date in the correct format. Skipping date addition.")
            return file_path
        else:
            # Optionally, you could add logic here to update the date if it's different.
            # For now, if *any* date is present, we consider it processed.
            print(f"File '{base_name}' already has a date '{existing_date_part}' in its name. Skipping new date addition.")
            return file_path

    # If no date in YYYY-MM-DD format was found, proceed to add the date.
    new_file_name_without_ext = ""

    # Try to find a custom prefix (e.g., "bank") that isn't a date itself
    # This regex looks for a sequence of alphanumeric characters followed by a hyphen
    # and then the rest of the string. It specifically avoids matching if the first part is a date (YYYY-MM-DD).
    custom_prefix_detection_regex = re.compile(r"^([a-zA-Z0-9_]+)-(.+)$")
    custom_prefix_match = custom_prefix_detection_regex.match(file_name_without_ext)

    if custom_prefix_match:
        potential_custom_prefix = custom_prefix_match.group(1)
        original_remainder_after_prefix = custom_prefix_match.group(2)

        # Confirm the potential_custom_prefix isn't actually a date itself (e.g., "2024-report.pdf" -> "2024")
        if not re.match(r"^\d{4}-\d{2}-\d{2}$", potential_custom_prefix):
            # It's a valid custom prefix (e.g., "bank")
            new_file_name_without_ext = f"{potential_custom_prefix}-{date_stamp}-{original_remainder_after_prefix}"
        else:
            # The initial part was a date-like string (e.g., "2024"). Treat as no custom prefix.
            new_file_name_without_ext = f"{date_stamp}-{file_name_without_ext}"
    else:
        # No custom prefix found, just add date at the beginning
        new_file_name_without_ext = f"{date_stamp}-{file_name_without_ext}"

    # Now, handle the counter logic for uniqueness
    new_base_name_template = new_file_name_without_ext
    final_new_path = os.path.join(directory, f"{new_base_name_template}{file_extension}")

    counter = 1
    while os.path.exists(final_new_path):
        print(f"File '{final_new_path}' already exists. Trying with counter {counter}...")
        # Append counter before the file extension
        final_new_path = os.path.join(directory, f"{new_base_name_template}_{counter}{file_extension}")
        counter += 1

    print(f"Renaming '{file_path}' to '{final_new_path}'...")
    try:
        os.rename(file_path, final_new_path)
        print(f"Successfully renamed '{file_path}' to '{final_new_path}'")
    except OSError as e:
        print(f"Error renaming file '{file_path}' to '{final_new_path}': {e}")
        return None # Indicate failure if rename fails

    return final_new_path