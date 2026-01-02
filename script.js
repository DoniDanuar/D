document.addEventListener('DOMContentLoaded', () => {
  const audio = document.getElementById('bgMusic');
  const playBtn = document.getElementById('playPauseBtn');
  const playIcon = document.getElementById('playIcon');
  const pauseIcon = document.getElementById('pauseIcon');
  const progressBar = document.getElementById('progressBar');
  const currentTimeEl = document.getElementById('currentTime');
  const totalDurationEl = document.getElementById('totalDuration');

  // Format waktu: detik → menit:detik
  function formatTime(seconds) {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }

  // Saat metadata lagu dimuat
  audio.addEventListener('loadedmetadata', () => {
    totalDurationEl.textContent = formatTime(audio.duration);
  });

  // Update progress saat lagu diputar
  audio.addEventListener('timeupdate', () => {
    if (audio.duration > 0) {
      const percent = (audio.currentTime / audio.duration) * 100;
      progressBar.style.width = `${percent}%`;
      currentTimeEl.textContent = formatTime(audio.currentTime);
    }
  });

  // Play / Pause
  playBtn.addEventListener('click', async () => {
    try {
      if (audio.paused) {
        await audio.play();
        playIcon.classList.add('d-none');
        pauseIcon.classList.remove('d-none');
      } else {
        audio.pause();
        playIcon.classList.remove('d-none');
        pauseIcon.classList.add('d-none');
      }
    } catch (error) {
      console.warn('Gagal memutar audio:', error);
      alert('Tidak bisa memutar audio. Pastikan file tersedia dan format MP3 valid.');
    }
  });

  // Klik progress bar untuk skip
  document.querySelector('.progress').addEventListener('click', (e) => {
    const width = e.currentTarget.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    if (duration > 0) {
      audio.currentTime = (clickX / width) * duration;
    }
  });

  // Fallback jika duration berubah
  audio.addEventListener('durationchange', () => {
    if (!isNaN(audio.duration) && audio.duration > 0) {
      totalDurationEl.textContent = formatTime(audio.duration);
    }
  });
});