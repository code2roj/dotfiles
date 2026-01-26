


### PDF

Split and convert pdf files to png
```bash
for file in *.pdf; do
    echo "Processing $file"
    mogrify -density 300 -format png -quality 100 -alpha remove -background white -flatten "$file"
done
```

```bash
for file in *.pdf; do
	echo "Processing $file"
	mogrify -density 300 -format png -quality 100 -alpha 
remove "$file" 
	for png in "${file%.*}"-*.png; do
		tesseract "$png" "${png%.*}" -l eng 
	done
done
```

```bash
for i in {1..10}; do
    gs -sDEVICE=pdfwrite -dNOPAUSE -dQUIET -dBATCH \
       -dFirstPage=$i -dLastPage=$i \
       -sOutputFile="page-$i.pdf" compressed-3.pdf
done
```
#### Decrease PDF File
```bash
gs -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 \
   -dPDFSETTINGS=/ebook \
   -dNOPAUSE -dQUIET -dBATCH 
   -sOutputFile=compressed-${file_name}.pdf {original_pdf}
```


gs -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 \
   -dPDFSETTINGS=/ebook \
   -dNOPAUSE -dQUIET -dBATCH 
   -sOutputFile=compressed-${file_name}.pdf /home/roj/rojsidian/personal/family/behy/Behy Exhibition-Portfolio.pdf

#### Combine PDF Files
```bash
gs -dBATCH -dNOPAUSE -q -sDEVICE=pdfwrite -sOutputFile=all_combined.pdf *.pdf

```
