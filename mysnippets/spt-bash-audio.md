
### Audio

#### Extract Audio from Video as MP3 320 kbps
```bash
ffmpeg -i input_video.mp4 -vn -acodec libmp3lame -b:a 320k output_audio.mp3
```

#### Extract Audio from Video as WAV 24/48000
```bash
ffmpeg -i input_video.mp4 -vn -acodec pcm_s24le -ar 48000 output_audio.wav
```

#### Extract Audio from Video as AAC
```bash
ffmpeg -i input.mp4 -c:v copy -c:a libfdk_aac -b:a 960k output.m4a
```

#### Extract Audio from Video as FLAC
```bash
ffmpeg -i input_video.mp4 -vn -c:a flac output_audio.flac
```

#### Resample the audio file

```bash
sox input.aif -r 48000 output.aif dither -s
```

- `sox`: The main command to invoke SoX
- `input.aif`: The source AIF file
- `-r 48000`: Sets the output sample rate to 48000 Hz
- `output.aif`: The destination 48000 Hz AIF file
- `dither -s`: Applies dithering with noise-shaping for optimal quality

##### Loop the Resampling through all files

```bash
output_folder="path/to/output/folder" 
for file in *.aif; do
	sox "$file" -r 48000 "${output_folder}/48k_${file##*/}" dither -s
done
```


#### Get the information of an audio file
```bash
soxi {audioFile.extention}
```
