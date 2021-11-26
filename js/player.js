const playerContainer = document.querySelector('.player')
const player          = document.querySelector('.player-audio')
const playPauseToggle = document.querySelector('.player-play-pause-toggle')
const playMuteToggle  = document.querySelector('.player-mute-unmute-toggle')
const playerStatus    = document.querySelectorAll('.player-status p')

let currentStation = null

playPauseToggle.addEventListener('click', function(e) {
  if (!currentStation) return

  if (playPauseToggle.classList.contains('fa-play')) {
    playPauseToggle.classList.replace('fa-play', 'fa-pause')
    playerStatus[0].innerText = 'Now playing'
    player.play()
  } else {
    playPauseToggle.classList.replace('fa-pause', 'fa-play')
    playerStatus[0].innerText = 'Paused'
    player.pause()
  }
})

playMuteToggle.addEventListener('click', function() {
  if (playMuteToggle.classList.contains('fa-volume-up')) {
    playMuteToggle.classList.replace('fa-volume-up', 'fa-volume-off')
    player.volume = 0
  } else {
    playMuteToggle.classList.replace('fa-volume-off', 'fa-volume-up')
    player.volume = 1
  }
})

export function play(station) {
  currentStation = station
  player.src = station.url
  playerStatus[0].innerText = 'Establishing connection...'
  playerStatus[1].innerText = station.name
  playerContainer.classList.remove('error')
  playPauseToggle.classList.replace('fa-play', 'fa-pause')

  if (!playerContainer.classList.contains('visible'))
    playerContainer.classList.add('visible')

  player
    .play()
    .then(function() {
      playerContainer.classList.remove('error')
      playerStatus[0].innerText = 'Now playing'
    })
    .catch(function() {
      playerContainer.classList.add('error')
      playerStatus[0].innerText = 'Connection error'
    })
}