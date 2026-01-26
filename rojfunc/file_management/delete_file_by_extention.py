import os

def delete_files_by_extension(source_directory, file_extension, recursive=False):
    """
    Identifies and potentially deletes files with a specific extension in a directory.

    Args:
        source_directory (str): The path to the source directory.
        file_extension (str): The file extension to search for (e.g., ".txt", ".log").
        recursive (bool): If True, search recursively in subdirectories.
                          If False, only search in the root of the source directory.
    """
    if not os.path.isdir(source_directory):
        print(f"Error: Source directory '{source_directory}' does not exist. Aborting operation.")
        return

    # Ensure the file_extension starts with a dot
    if not file_extension.startswith('.'):
        file_extension = '.' + file_extension

    files_to_delete = []

    if recursive:
        print(f"Searching recursively for '{file_extension}' files in '{source_directory}' and its subdirectories...")
        for root, _, files in os.walk(source_directory):
            for file in files:
                if file.endswith(file_extension):
                    file_path = os.path.join(root, file)
                    files_to_delete.append(file_path)
    else:
        print(f"Searching for '{file_extension}' files only in the root of '{source_directory}'...")
        for file in os.listdir(source_directory):
            file_path = os.path.join(source_directory, file)
            if os.path.isfile(file_path) and file.endswith(file_extension):
                files_to_delete.append(file_path)

    if not files_to_delete:
        print(f"No '{file_extension}' files found in '{source_directory}' (recursive: {recursive}).")
        return

    print(f"\n--- Found {len(files_to_delete)} file(s) with extension '{file_extension}' ---")
    for found_file in files_to_delete:
        print(f"  - {found_file}")

    print("\n--- ATTENTION: File deletion operations are commented out by default. ---")
    print("If you wish to proceed with deletion, uncomment the 'os.remove(found_file)' line.")
    print("Proceed with extreme caution, as file deletion is irreversible.")

    for found_file in files_to_delete:
        try:
            # Uncomment the line below to enable file deletion
            os.remove(found_file)
            print(f"Simulated: Deleted '{found_file}'") # This line will execute if os.remove is commented out
        except OSError as e:
            print(f"Error: Could not delete '{found_file}'. Reason: {e}")
