import { playlists } from './main.js'
import * as importer from './importer.js'
import * as stationList from './stationList.js'
import save from './save.js'

const welcomeContainer = document.querySelector('.welcome-container')
const welcomeNewBtn    = document.getElementById('welcome-new-btn')
const welcomeETS2Btn   = document.getElementById('welcome-ets2-btn')
const welcomeATSBtn    = document.getElementById('welcome-ats-btn')

welcomeNewBtn.addEventListener('click', function() {
  playlists.push({
    name:     '_nameless.000.0000.0000',
    stations: [],
  })

  stationList.fill()
  hide()
  save()
})

welcomeETS2Btn.addEventListener('click', function() {
  fetch('/ets2.sii')
    .then(blob => blob.text())
    .then(text => {
      const { name, stations } = importer.parse(text)
  
      playlists.push({name, stations})
    
      stationList.fill()
      hide()
      save()
    })
})

welcomeATSBtn.addEventListener('click', function() {
  fetch('/ats.sii')
    .then(blob => blob.text())
    .then(text => {
      const { name, stations } = importer.parse(text)
  
      playlists.push({name, stations})
  
      stationList.fill()
      hide()
      save()
    })
})

export function show() {
  welcomeContainer.classList.add('visible')
}

export function hide() {
  welcomeContainer.classList.remove('visible')
}