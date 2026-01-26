
### Video

#### Remove Audio From Videos

#### Boomrang

```bash
# Step 1: Trim the original segment (no quality loss)
ffmpeg -i input.mp4 -ss 00:00:00 -t 10 -c copy original_segment.mp4

# Step 2: Reverse the trimmed segment (apply quality parameters)
ffmpeg -i original_segment.mp4 -vf reverse -c:v libx264 -crf 18 -preset slow reversed_segment.mp4

# Step 3: Concatenate original and reversed segments (again apply quality parameters)
ffmpeg -f concat -safe 0 -i <(printf "file '%s'\n" original_segment.mp4 reversed_segment.mp4) -c:v libx264 -crf 18 -preset slow boomerang_effect.mp4

```

#### Metadata

---

#### File Conversion


##### Convert large video to a small video for logic pro x

```bash
ffmpeg -i suryar-for-preview.mov -c:v libx264 -crf 28 -preset veryfast -c:a copy -map_metadata 0 output.mp4
```
