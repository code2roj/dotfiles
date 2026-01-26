
# Python Snippets

This document contains my personal python snippets

## Strings

### Replace Placeholders in an String
```python
# Replace placeholders with the actual variable values
replacedContent = content.replace("{var_1}", var_1) .replace("{var_2}", var_2) .replace("{var_3}", var_3)
```
## Files

### Open and Read a File
```python
with open("filePath", "r") as source:
	source.read(content)
```

### Open and Write a File
```python
with open("filePth", "w") as destination:
	destination.write(content)
```
****Note:** This mode **overwrites** the file if it exists. Otherwise it creates a new file.*
### Open and Append to a File
```python
with open("filePath", "a") as destination:
    destination.write(content)
```
****Note:** In this mode the content are added at the end of an existing file. If the file doesn't exist, it will creates a new file.*
