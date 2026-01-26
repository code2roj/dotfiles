#!/bin/bash
TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')
REPORT_FILE="$HOME/Downloads/clamscan_report-$DATE.rojfile"
touch "$REPORT_FILE"


# Update clamav
if ! sudo freshclam; then
    echo "$TIMESTAMP    Error: clamav update failed." >> "$REPORT_FILE"
    exit 1
fi

QUARANTINE_DIR="$HOME/Downloads/quarantine"
LARGE_FILES_DIR="$DOWNLOAD_DIR/large_files-check_them"
# Scan the entire Downloads directory, excluding large_files-check_them
mkdir -p "$QUARANTINE_DIR"
echo "$TIMESTAMP    Starting virus scan on $DOWNLOAD_DIR" >> "$REPORT_FILE"
clamscan -r --move="$QUARANTINE_DIR" --log="$REPORT_FILE" --exclude-dir="$LARGE_FILES_DIR" "$DOWNLOAD_DIR"
SCAN_STATUS=$?
if [ $SCAN_STATUS -eq 0 ]; then
    echo "$TIMESTAMP    No viruses found." >> "$REPORT_FILE"
elif [ $SCAN_STATUS -eq 1 ]; then
    echo "$TIMESTAMP    Viruses found and moved to quarantine." >> "$REPORT_FILE"
else
    echo "$TIMESTAMP    Error during virus scan (exit status $SCAN_STATUS)." >> "$REPORT_FILE"
    exit 1
fi

