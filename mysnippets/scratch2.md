
```bash                          
#!/bin/bash

find . -type f -name "*.md" -exec sh -c 'echo "--" >> "$1"' _ {} \;
```
