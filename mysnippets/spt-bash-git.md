
## Git

### Create a Repo

```bash
cd pathToRepo
git init
git add . 
git commit -m "Initial commit"
```

### Add the Repo to GitHub and Make it the Reference

```bash
git remote add origin git@github.com:code2roj/drafts.git
git push -u origin main
```
### Fetching updates from the remote repository

This command will fetch the the updates from the remote repo without merging
   ```bash
   git fetch origin
   ```

---
### Merge the changes into your local branch

   ```bash
   git merge origin/main
   ```

---
### Pull the latest changes directly

Fetch and merge changes in one step:
   ```bash
   git pull origin main
   ```

---
### Push local changes

To push the changes from the local repo to the remote repository:
   ```bash
   git push origin main
   ```

---
### Full Log History
```bash
git log --oneline --all --graph --decorate
```

---
### More Detailed History
```bash
git log -p
```

### Delete the Remote Repository

```bash
gh repo delete {repoName}
```

