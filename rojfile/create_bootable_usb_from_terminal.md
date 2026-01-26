## Use Terminal to create the bootable installer

1. Open Terminal, which is in the Utilities folder of your Applications folder. Or use Spotlight![](https://cdsassets.apple.com/live/7WUAS350/images/inline-icons/macos-catalina-spotlight-search-menu-icon.png) in the menu bar to find and open it.
    
2. Depending on which macOS you downloaded, drag within the scrollable area of one of these commands to select the full command. Then copy it and paste it into Terminal. Press Return to enter the command.
    
**Sequoia:** 

```bash
sudo /Applications/Install\ macOS\ Sequoia.app/Contents/Resources/createinstallmedia --volume /Volumes/MyVolume`
``` 
**Sonoma:** 
```bash
sudo /Applications/Install\ macOS\ Sonoma.app/Contents/Resources/createinstallmedia --volume /Volumes/MyVolume
```
**Ventura:** 
```bash
sudo /Applications/Install\ macOS\ Ventura.app/Contents/Resources/createinstallmedia --volume /Volumes/MyVolume
```
        
**Monterey:** 
```bash
sudo /Applications/Install\ macOS\ Monterey.app/Contents/Resources/createinstallmedia --volume /Volumes/MyVolume
```
        
**Big Sur:** 
```bash
sudo /Applications/Install\ macOS\ Big\ Sur.app/Contents/Resources/createinstallmedia --volume /Volumes/MyVolume
```
        
**Catalina:** 
```bash
sudo /Applications/Install\ macOS\ Catalina.app/Contents/Resources/createinstallmedia --volume /Volumes/MyVolume
```
**Mojave:** 
```bash
sudo /Applications/Install\ macOS\ Mojave.app/Contents/Resources/createinstallmedia --volume /Volumes/MyVolume
```      
**High Sierra:** 
```bash
sudo /Applications/Install\ macOS\ High\ Sierra.app/Contents/Resources/createinstallmedia --volume /Volumes/MyVolume
```     
**El Capitan:** 
```bash
sudo /Applications/Install\ OS\ X\ El\ Capitan.app/Contents/Resources/createinstallmedia --volume /Volumes/MyVolume --applicationpath /Applications/Install\ OS\ X\ El\ Capitan.app
```     
1. When prompted, type your administrator password and press Return. Terminal doesn't show any characters as you type.
    
    - If you get a message that the installer does not appear to be a valid installer application, delete the installer, [use Disk Utility to repair your startup disk](https://support.apple.com/en-us/102611), then download the installer again.
        
    - If you get a message that the command was not found, make sure that you’re using the correct command and the installer is in your Applications folder and named Install [Version Name]. And if creating the bootable installer on a Mac that is using macOS Sierra 10.12.6 or earlier, append `--applicationpath` to the command, followed by the appropriate installer path, similar to what is shown at the end of the command for El Capitan.
        
2. When prompted, type Y to confirm that you want to erase the volume, then press Return. Terminal shows the progress as the volume is erased.
    
    - If you get a message that Terminal would like to access files on a removable volume, click OK to allow Terminal to proceed.
        
    - If Terminal can't erase successfully, use Disk Utility to [erase the volume](https://support.apple.com/guide/disk-utility/erase-and-reformat-a-storage-device-dskutl14079/mac) using Mac OS Extended (Journaled) format, then try again.
        
3. When Terminal says that the install media is now available, your USB flash drive should have the same name as the installer, such as Install macOS Sequoia.
    
4. Quit Terminal, eject the flash drive, and disconnect it from your Mac.
    

This example shows the creation of a bootable installer for macOS Ventura:

![Creating a bootable installer for macOS Ventura in Terminal.](https://cdsassets.apple.com/live/7WUAS350/images/macos/ventura/macos-ventura-terminal-command-createinstallmedia.png)

## Use the bootable installer

Follow the appropriate steps based on whether you’re using the bootable installer on a [Mac with Apple silicon](https://support.apple.com/en-us/116943). Your Mac must be connected to the internet so that the installer can get firmware and other information specific to this Mac model. If the macOS you’re installing is incompatible with your Mac, installation might not complete or your Mac might [start up to a circle with a line through it](https://support.apple.com/en-us/101666).

### Mac with Apple silicon

1. Shut down or turn off your Mac.
    
2. Connect the bootable installer directly to your Mac.
    
3. Press and hold the power button on your Mac. As you continue to hold, your Mac starts up and loads [startup options](https://support.apple.com/en-us/102342), which shows your bootable volumes, including the bootable installer.
    
4. Select the bootable installer, then click Continue.
    
5. When the macOS installer opens, follow the onscreen instructions.
    

### Any other Mac

1. Shut down or turn off your Mac.
    
2. Connect the bootable installer directly to your Mac.
    
3. Turn on your Mac, then immediately press and hold the Option (Alt) key.
    
4. Release the Option key when you see a dark screen showing your bootable volumes, including the bootable installer.
    
5. Select the bootable installer, then click the onscreen arrow or press Return.
    
6. If you're using a [Mac with the Apple T2 Security Chip](https://support.apple.com/en-us/103265) and you can't start up from the bootable installer, make sure that [Startup Security Utility](https://support.apple.com/en-us/102522) is set to allow booting from external or removable media.
    
7. Choose your language, if prompted.
    
8. Select Install macOS (or Install OS X) from the Utilities window, then click Continue and follow the onscreen instructions.
    

Published Date: June 02, 2025