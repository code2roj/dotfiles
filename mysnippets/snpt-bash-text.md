



### Text
##### Add Text to the end of ALL files in a Directory Recursively 
#recursive
```bash
find . -type f -name "*.md" -exec sh -c 'echo "---" >> "$1"' _ {} \;
```

#### combine

concatenates the contents of the sorted files
```bash

cat $(ls *.md | sort) > combined_file.txt
cat "scita-csv-complete-2024-10-14-csv/convertedToCSV/*.csv" > "scita-csv-complete-2024-10-14-csv/output.csv"
```

##### add page break to empty lines 
```bash
awk '
BEGIN {page=1}
/^$/ {printf "\f\n[Page %d]\n", page++; next}
{print}
' src-03.md > ouput3.md
```

