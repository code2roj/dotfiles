#!/bin/bash

ISO_PATH="/home/roj/Downloads/xubuntu-24.04.2-desktop-amd64.iso"
USB_MOUNT="/media/roj/d-live 12.7.0 gn amd64"

# Detect USB device (adjust manually if needed)
USB_DEV=$(lsblk -o MOUNTPOINT,PKNAME | grep "$USB_MOUNT" | awk '{print $2}')
USB_PATH="/dev/$USB_DEV"

if [ -z "$USB_DEV" ]; then
    echo "Error: USB device not found at $USB_MOUNT."
    exit 1
fi

echo "USB device detected: $USB_PATH"

# Unmount the USB drive
echo "Unmounting $USB_PATH..."
sudo umount "$USB_PATH"* || echo "Already unmounted."

# Wipe and format the USB
echo "Formatting USB as FAT32..."
sudo mkfs.vfat -F32 "$USB_PATH"

# Write the ISO to USB
echo "Flashing Xubuntu ISO to USB..."
sudo dd if="$ISO_PATH" of="$USB_PATH" bs=4M status=progress oflag=sync

# Sync to ensure all data is written
sync

echo "Done! You can now boot from the USB."
