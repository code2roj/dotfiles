import time
import os
import re # Import the regular expression module
import sys
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler

# --- Configuration ---
# Define the list of folders to watch.
# Ensure these are absolute paths for clarity and robustness,
# especially when running as a systemd service.
folders_to_watch = ['/home/roj/rojtest2', '/home/roj/rojtest'] # Add your desired paths here

# --- Helper Function to Validate/Create Folders ---

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


# function~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
# >>>>>>>>>>>>>>--- GET FILE PREFIX ---<<<<<<<<<<<<<<<
# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

def get_file_prefix(filename: str) -> str:
    """
    Extracts the first segment of a filename before the first hyphen.
    Note: This function is currently not used by add_date_after_prefix,
    as date addition logic handles prefix detection internally for robustness.
    """
    prefix = filename.split("-")[0]
    return prefix

# function~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
# >>>>>>>>>>>>--- ADD DATE TO FILE NAME ---<<<<<<<<<<<
# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

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


# ==============================================
# >>>>>>>>>>>--- Event Handler Class ---<<<<<<<<
# ==============================================
class FileEventHandler(FileSystemEventHandler):
    """
    Handles file system events.
    The 'event.src_path' attribute provides the full path where the event occurred.
    """
    # ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    # >>>>>>>>>>>--- FUNCITON:ON CREATED ---<<<<<<<<
    # ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    
    def on_created(self, event):    # Function to handle file creation event
        """
        Called when a file or directory is created.
        This method includes logic to prefix new file names based on their parent directory.
        """
        if not event.is_directory:  # Check if the event is for a file, not a directory
            file_path = event.src_path
            directory_name = os.path.dirname(file_path)
            print(f"[{time.ctime()}] New file detected in '{directory_name}': {file_path}")
            
            # Call the improved renaming function
            date_stamped_file_path = add_date_after_prefix(file_path)
            
            # --- Process the newly created files ---
            # Gets the folder's index (result is not used, can be removed if not needed)
            try:
                folder_index = folders_to_watch.index(directory_name)
                print(f"Index of '{directory_name}': {folder_index}")
            except ValueError:
                print(f"Warning: Created file in a directory not listed in folders_to_watch: {directory_name}")


# --- Main Execution Block ---
if __name__ == "__main__":
    # Ensure all specified folders to watch exist (and create them if they don't)
    if not check_folders_exist(folders_to_watch):
        print("Failed to ensure all watch folders exist. Exiting.")
        exit(1)

    event_handler = FileEventHandler()
    observer = Observer()

    # Schedule the observer to watch each specified folder.
    # recursive=False means it will only watch the immediate folder, not its subdirectories.
    # Set to True if you want to monitor subdirectories as well.
    for folder in folders_to_watch:
        observer.schedule(event_handler, folder, recursive=False)

    print(f"Starting file system monitor for folders: {folders_to_watch}")
    print("Press Ctrl+C to stop the monitoring.")

    # Start the observer in a separate thread
    observer.start()

    try:
        # Keep the main thread alive, allowing the observer thread to run
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        # Gracefully stop the observer when a KeyboardInterrupt (Ctrl+C) is received
        observer.stop()
    finally:
        # Wait until the observer thread terminates
        observer.join()
        print("File system monitoring stopped.")
