
# Code Snippets for Conda 
## Configurations

**Prevent Conda from being activated when openning the terminal**
```bash
conda config --set auto_activate_base false
```


## Environments

**Create a new python virtual environment**
```bash
conda create --name c2r-3-06 python=3.6
```

**Remove a virtual environment**
```bash
conda remove --name c2r-3-10 --all
```

**List all Conda environments:**
```bash
conda env list
```

or

```bash
conda info --envs
```

**Activate Virtual Environment**
```bash
conda activate environmentName
```

---


