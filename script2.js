//Factory function to create song objects
function createSong(title, artist, source) {
  return {
    title,
    artist,
    source,
  };
}

//songs
const song1 = createSong("Terroriser - Shave My Balls", "Terroriser", "Terroriser - Shave My Balls (feat. Cosmic).mp3");
const song2 = createSong("GigaChad Phonk", "g3ox_em", "g3ox_em - GigaChad Theme (Phonk House Version).mp3");

//initialize the music player with the first song
const audioPlayer = document.querySelector("audio");
const songTitle = document.querySelector("h2");
const artistName = document.querySelector("p");

let currentSong = song1;
audioPlayer.src = currentSong.source;
songTitle.textContent = currentSong.title;
artistName.textContent = currentSong.artist;

//Play button click event
const playPauseButton = document.getElementById("play-pause");
playPauseButton.addEventListener("click", () => {
  if (audioPlayer.paused) {
    audioPlayer.play();
  } else {
    audioPlayer.pause();
  }
});

//Update play/pause button based on audio state
audioPlayer.addEventListener("play", () => {
  playPauseButton.textContent = "Pause";
});

audioPlayer.addEventListener("pause", () => {
  playPauseButton.textContent = "Play";
});

//Next Button click event
const nextButton = document.getElementById('next-song');
nextButton.addEventListener("click", () => {
  if (currentSong === song1) {
    currentSong = song2;
  } else {
    currentSong = song1;
  }

  audioPlayer.src = currentSong.source;
  audioPlayer.play();
  songTitle.textContent = currentSong.title;
  artistName.textContent = currentSong.artist;
});

//Previous button click event
const prevButton = document.getElementById('prev-song');
prevButton.addEventListener("click", () => {
  if (currentSong === song2) {
    currentSong = song1;
  } else {
    currentSong = song2;
  }

  audioPlayer.src = currentSong.source;
  audioPlayer.play();
  songTitle.textContent = currentSong.title;
  artistName.textContent = currentSong.artist;
})

//Update duration bar
audioPlayer.addEventListener("loadedmetadata", () => {
  const durationFill = document.getElementById("duration-fill");
  const durationBar = document.querySelector(".duration-bar");
  const duration = audioPlayer.duration;

  durationFill.style.width = "0";

  audioPlayer.addEventListener("timeupdate", () => {
      const currentTime = audioPlayer.currentTime;
      const progress = (currentTime / duration) * 100;

      durationFill.style.width = `${progress}%`;
  });
  //Forward audio based on click event position
  durationBar.addEventListener("click", (event) => {
      const clickX = event.pageX - durationBar.getBoundingClientRect().left;
      const durationBarWidth = durationBar.clientWidth;
      const clickPercentage = (clickX / durationBarWidth) * 100;
      const newTime = (clickPercentage / 100) * audioPlayer.duration;
  
      audioPlayer.currentTime = newTime;
  });
});

//Volume control bar
const volumeControl = document.getElementById('volume');

volumeControl.addEventListener("input", () => {
  audioPlayer.volume = volumeControl.value;
});