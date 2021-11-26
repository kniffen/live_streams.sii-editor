import { playlists } from './main.js'
import * as stationsList from './stationList.js'
import save from './save.js'

const clearAllBtn       = document.querySelector('.clear-all-btn')
const playlistNameField = document.getElementById('playlist-name')

clearAllBtn.addEventListener('click', function(e) {
  playlists[0].stations.splice(0, playlists[0].stations.length)
  localStorage.removeItem('playlists')

  stationsList.fill()
})

playlistNameField.addEventListener('change', function(e) {
  e.target.value    = e.target.value.replace(/[^a-z0-9._]/gi, '').toLowerCase()
  playlists[0].name = e.target.value || '_nameless.000.0000.0000'
  
  stationsList.fill()
  save()
})