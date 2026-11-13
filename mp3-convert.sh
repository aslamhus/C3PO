for f in *.webm; do
	f="${f%.*}"
	ffmpeg -i "${f}.webm" -q:a 0 -map a "${f}.mp3"
done
