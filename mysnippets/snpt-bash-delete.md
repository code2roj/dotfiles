

### Secure Delete

#### Overwrite free space on the disk

```bash
sfill -v /
```

#### Overwrite free space with random data
```bash
dd if=/dev/urandom of=~/random_fill bs=1m
rm ~/random_fill
```
#### Shred file

```bash
shred -u -n  sensitive_file.txt
```

#### Shred folder

```bash
find sensitive_folder/ -type f -exec shred -u -n 3 {} \;
```

#### Delete everything including free space

```bash
srm -rfv /
```

#### Delete home directory

```bash
srm -rfv ~/ 
```

