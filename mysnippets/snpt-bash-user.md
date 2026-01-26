

### User Management

**Create a new user**
```bash
sudo adduser username
```

**Add user to sudoers file**
```bash
# Add "roj" to the sudoers file
sudo usermod -aG sudo roj
```

**Change a User's Name**
```bash
sudo usermod -l roj code2roj
```
