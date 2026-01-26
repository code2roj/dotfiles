# Rojfile Package Documenation


## `rojfile-organize-downloads`

### Overview

This Bash script organizes files in the `$HOME/Downloads` directory by performing the following tasks:
1. Moves files larger than 50MB to a dedicated folder.
2. Renames file extensions from uppercase to lowercase.
3. Organizes files into a destination directory structure based on their file extensions and prefixes.
4. Skips files with specific extensions or in folders containing certain file types.
5. Removes empty directories after processing.
6. Logs all actions and errors to a timestamped report file.

The script ensures robust file handling with error checking and logging, making it suitable for automating file organization tasks.

### Prerequisites

- **Operating System**: Linux or any Unix-like system with Bash.
- **Dependencies**:
  - `bash` (Bourne Again Shell)
  - `find` (for file searching)
  - `tr` (for text transformation)
  - `cut` (for text processing)
  - `grep` (for pattern matching)
- **Permissions**: Write access to `$HOME/Downloads` and `/media/mydata/ROJ_2/1-filebase/`.
- **Storage**: The destination directory (`/media/mydata/ROJ_2/1-filebase/`) must exist and be accessible.

### Script Configuration

The script uses the following variables for configuration:

- **Source Directory**:
  ```bash
  DOWNLOAD_DIR="$HOME/Downloads"
  ```
  The directory where files are initially located (default: user's Downloads folder).

- **Destination Directory**:
  ```bash
  DEST_PARENT_DIR="/media/mydata/ROJ_2/1-filebase/"
  ```
  The root directory where files will be organized into subdirectories.

- **Large Files Directory**:
  ```bash
  LARGE_FILES_DIR="$DOWNLOAD_DIR/large_files-check_them"
  ```
  A folder within `DOWNLOAD_DIR` for storing files larger than 50MB.

- **Report File**:
  ```bash
  REPORT_FILE="$HOME/Downloads/report-$DATE.rojfile"
  ```
  A log file with a timestamped name (e.g., `report-2025-06-29-16-47-00.rojfile`) to record all actions and errors.

- **Ignored Extensions**:
  ```bash
  IGNORE_EXTENSIONS=("rojfile" "tmp" "part" "crdownload" "download" "exe" "zip" "tar" "gz" "bz2" "xz" "7z" "rar" "iso" "img")
  ```
  Files with these extensions are skipped during processing.

- **Folder Ignore Extensions**:
  ```bash
  FOLDER_IGNORE_EXTENSIONS=("iso" "img")
  ```
  Folders containing files with these extensions are skipped entirely.

### Script Workflow

The script performs the following steps:

1. **Initialization**:
   - Generates a timestamp (`DATE` and `TIMESTAMP`) for naming the report file and logging.
   - Creates the report file (`$REPORT_FILE`) in the Downloads directory.
   - Defines source, destination, and large files directories.

2. **Directory Validation**:
   - Checks if `DOWNLOAD_DIR` and `DEST_PARENT_DIR` exist. If either does not, logs an error and exits with status code 1.

3. **Move Large Files**:
   - Creates the `large_files-check_them` directory if it doesn't exist.
   - Uses `find` to identify files larger than 50MB in `DOWNLOAD_DIR` (excluding `large_files-check_them`).
   - Moves these files to `LARGE_FILES_DIR` and logs the result (success or failure).

4. **Rename Uppercase Extensions**:
   - Searches for files with extensions containing uppercase letters in `DOWNLOAD_DIR` (up to 5 levels deep, excluding `large_files-check_them`).
   - Converts extensions to lowercase using `tr` and renames the files.
   - Logs each successful rename or any errors.

5. **Build Skip Folders List**:
   - Identifies folders containing files with extensions in `FOLDER_IGNORE_EXTENSIONS` (e.g., `.iso`, `.img`).
   - Marks these folders and `large_files-check_them` in the `SKIP_FOLDERS` associative array to exclude them from further processing.

6. **Process Files**:
   - Finds all files in `DOWNLOAD_DIR` (excluding `large_files-check_them`).
   - For each file:
     - Skips if the file's directory is in `SKIP_FOLDERS`.
     - Skips if the file has no extension or has an extension in `IGNORE_EXTENSIONS`.
     - Extracts the file extension and prefix (before the first `-` in the filename; defaults to `uncategorized` if no `-` is present).
     - Creates a destination directory: `$DEST_PARENT_DIR/$file_extension/$file_prefix`.
     - Appends a random 6-character string to the filename to avoid conflicts.
     - Moves the file to the destination directory and logs the result.
     - Increments a counter for successful moves.

7. **Remove Empty Directories**:
   - Identifies directories in `DOWNLOAD_DIR` (excluding `large_files-check_them`) that contain no files.
   - Removes these directories and logs the action.

8. **Finalization**:
   - Logs the total number of files moved.
   - Logs completion of the script.

### Directory Structure

The script organizes files into the following structure under `DEST_PARENT_DIR`:
```
/media/mydata/ROJ_2/1-filebase/
├── <file_extension>/
│   ├── <file_prefix>/
│   │   ├── <original_filename>_<random_string>.<file_extension>
│   │   └── ...
│   └── ...
└── ...
```
- Example: A file named `photo-vacation.jpg` with extension `jpg` and prefix `photo` would be moved to `/media/mydata/ROJ_2/1-filebase/jpg/photo/vacation_<random_string>.jpg`.

### Logging

All actions are logged to `$REPORT_FILE` with timestamps. Example log entries:
```
2025-06-29 16:47:00    Checking for files larger than 50MB in /home/user/Downloads
2025-06-29 16:47:00    /home/user/Downloads/video.mp4 moved to large_files-check_them due to its large size
2025-06-29 16:47:00    Renamed /home/user/Downloads/doc.PDF to /home/user/Downloads/doc.pdf
2025-06-29 16:47:00    Moved /home/user/Downloads/photo-vacation.jpg to /media/mydata/ROJ_2/1-filebase/jpg/photo/vacation_X7pQz9.jpg
2025-06-29 16:47:00    Successfully moved 10 file(s).
2025-06-29 16:47:00    Finished organizing downloads.
```

### Usage

1. Save the script as `organize_files.sh`.
2. Make it executable:
   ```bash
   chmod +x organize_files.sh
   ```
3. Run the script:
   ```bash
   ./organize_files.sh
   ```
4. Check the report file in `$HOME/Downloads` (e.g., `report-2025-06-29-16-47-00.rojfile`) for details.

### Error Handling

The script includes robust error handling:
- Exits with status code 1 if `DOWNLOAD_DIR` or `DEST_PARENT_DIR` does not exist.
- Logs errors for failed file moves, renames, or directory creations.
- Skips files in folders with ignored extensions or the `large_files-check_them` directory.
- Skips files with no extensions or ignored extensions to prevent processing temporary or system files.

### Limitations

- **Depth Limitation**: Extension renaming is limited to 5 levels deep, and folder ignore checks are limited to 4 levels deep.
- **Filename Assumptions**: Assumes filenames with a `-` delimiter for prefix extraction; files without a `-` are categorized as `uncategorized`.
- **No Overwrite Protection**: Uses a random string to avoid filename conflicts but does not handle cases where the destination file already exists with the same random string (highly unlikely).
- **No Rollback**: The script does not provide a mechanism to undo changes if an error occurs mid-execution.

### Example Use Case

Suppose the Downloads directory contains:
- `video.mp4` (60MB)
- `doc.PDF`
- `photo-vacation.jpg`
- `backup.iso`
- `note.txt`

The script will:
- Move `video.mp4` to `large_files-check_them`.
- Rename `doc.PDF` to `doc.pdf`.
- Move `photo-vacation.jpg` to `/media/mydata/ROJ_2/1-filebase/jpg/photo/vacation_<random_string>.jpg`.
- Skip `backup.iso` (ignored extension).
- Skip `note.txt` (no extension).
- Remove any empty directories.
- Log all actions to the report file.

### Customization

To modify the script:
- Update `IGNORE_EXTENSIONS` or `FOLDER_IGNORE_EXTENSIONS` to include additional file types to skip.
- Change the `+50M` size threshold for large files.
- Modify `DEST_PARENT_DIR` to point to a different destination.
- Adjust the random string length (`head -c 6`) for filename uniqueness.

### Notes

- Ensure sufficient disk space in `DEST_PARENT_DIR`.
- Run the script as a user with appropriate permissions.
- Test the script in a non-critical environment first to verify behavior.