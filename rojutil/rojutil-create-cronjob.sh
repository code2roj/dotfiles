#!/bin/bash

# This script gets an script file as argument and a repetition sequence indicator as the second argument. 
# Then it will move the copy and creates a copy of the script and moves the copy to the cron directory.

# important notes:
# - The script must be executable if not make it executable with chmod +x script.sh
# - The script must check for the correct permissions of the file in order to be able to run it from the cron folders
# - The destination for the folder will be defined by the second argument. The second arhument must be one of the following:
#  - daily
#  - weekly
#  - monthly
#  - hourly
#  and then it will set the destination for the file as cron.daily, cron.weekly, cron.monthly, cron.hourly etc.

if [ $# -ne 2 ]; then
    echo "Usage: $0 <script-file> <daily|weekly|monthly|hourly>"
    exit 1
fi

SCRIPT_FILE="$1"
PERIOD="$2"

case "$PERIOD" in
    daily|weekly|monthly|hourly)
        CRON_DIR="/etc/cron.$PERIOD"
        ;;
    *)
        echo "Error: Second argument must be one of: daily, weekly, monthly, hourly"
        exit 2
        ;;
esac

if [ ! -f "$SCRIPT_FILE" ]; then
    echo "Error: Script file '$SCRIPT_FILE' does not exist."
    exit 3
fi

if [ ! -x "$SCRIPT_FILE" ]; then
    echo "Info: Script '$SCRIPT_FILE' is not executable. Making it executable."
    chmod +x "$SCRIPT_FILE"
fi

BASENAME=$(basename "$SCRIPT_FILE")
DEST="$CRON_DIR/$BASENAME"

if sudo cp "$SCRIPT_FILE" "$DEST"; then
    echo "Successfully copied '$SCRIPT_FILE' to '$DEST'"
    sudo chmod 755 "$DEST"
else
    echo "Error: Failed to copy '$SCRIPT_FILE' to '$DEST'"
    exit 4
fi