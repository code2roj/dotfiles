import os
import time

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
        
        # Call the function to perform when a new file is added to the folder        