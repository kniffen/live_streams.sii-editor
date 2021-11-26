import { playlists } from './main.js'
import * as stationList from './stationList.js'
import save from './save.js'

const formContainer      = document.querySelector('.form-container')
const addEditForm        = document.getElementById('add-edit-form')
const addEditFormHeading = document.querySelector('#add-edit-form h2')
const addStationBtn      = document.querySelector('.add-station-btn')
const cancelBtn          = document.getElementById('cancel-add-edit-btn')
const languageInput      = addEditForm.querySelector('#language')

addEditForm.addEventListener('submit', function(e) {
  e.preventDefault()

  const { stations } = playlists[0]
  const index = parseInt(e.target.index.value)

  if (!stations[index])
    stations[index] = {}

  stations[index].url      = e.target.url.value       || ''
  stations[index].name     = e.target.name.value      || ''
  stations[index].genre    = e.target.genre.value     || ''
  stations[index].language = e.target.language.value  || ''
  stations[index].bitrate  = e.target.bitrate.value   || 0
  stations[index].favorite = stations[index].favorite || 0

  stationList.fill()
  save()
  hide()
})

addStationBtn.addEventListener('click', function() {
  addEditForm.index.value    = playlists[0].stations.length
  addEditForm.url.value      = ''
  addEditForm.name.value     = ''
  addEditForm.genre.value    = ''
  addEditForm.language.value = ''
  addEditForm.bitrate.value  = 0

  show()
})

cancelBtn.addEventListener('click', function() {
  hide()
})

languageInput.addEventListener('change', function(e) {
  e.target.value = e.target.value.toUpperCase().slice(0, 3)
})

export function set(station = {}, index = playlists[0].stations.length) {
  addEditForm.index.value    = index
  addEditForm.url.value      = station.url
  addEditForm.name.value     = station.name
  addEditForm.genre.value    = station.genre
  addEditForm.language.value = station.language
  addEditForm.bitrate.value  = parseInt(station.bitrate)

  show()
}

export function show() {
  addEditFormHeading.innerText = addEditForm.index.value >= playlists[0].stations.length ? 'Add station' : 'Edit station'

  formContainer.classList.add('visible')
}

export function hide() {
  formContainer.classList.remove('visible')
}