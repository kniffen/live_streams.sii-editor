import { playlists } from './main.js'
import * as player from './player.js'
import * as forms from './addEditForm.js'
import save from './save.js'

const stationList       = document.querySelector('.station-list')
const playlistNameField = document.getElementById('playlist-name')

let dragIndex = -1

export function fill() {
  playlistNameField.value = playlists[0].name
  stationList.innerHTML   = ''

  const stations = playlists[0].stations
  for (let i = 0; i < stations.length; i++) {
    const station = stations[i]
  
    const li = document.createElement('li')
  
    li.classList.add('station-list-item')
    li.dataset.index = i

    li.addEventListener('dragenter', function(e) {
      if (!e.target.classList.contains('station-list-item')) return
      e.target.classList.add('dragover')
      dragIndex = e.target.getAttribute('data-index')
    })

    li.addEventListener('dragleave', function(e) {
      if (!e.target.classList.contains('station-list-item')) return
      e.target.classList.remove('dragover')
    })

    li.addEventListener('dragover', function(e) {
      e.preventDefault()
    })

    li.addEventListener('dragend', function(e) {
      if (0 > dragIndex || playlists[0].stations.length <= dragIndex) return

      playlists[0].stations.splice(dragIndex, 0, playlists[0].stations.splice(li.dataset.index, 1)[0])
      dragIndex = -1
      
      save()
      fill()
    })
  
    const stationListItemNumber       = document.createElement('span')
    const stationListItemFavorite     = document.createElement('span')
    const stationListItemName         = document.createElement('span')
    const stationListItemGenre        = document.createElement('span')
    const stationListItemLanguage     = document.createElement('span')
    const stationListItemBitrate      = document.createElement('span')
    const stationListItemControls     = document.createElement('span')
    const stationListItemFavoriteStar = document.createElement('i')
  
    stationListItemNumber.classList.add('station-list-item__number')
    stationListItemFavorite.classList.add('station-list-item__favorite')
    stationListItemName.classList.add('station-list-item__name')
    stationListItemGenre.classList.add('station-list-item__genre')
    stationListItemLanguage.classList.add('station-list-item__language')
    stationListItemBitrate.classList.add('station-list-item__bitrate')
    stationListItemControls.classList.add('station-list-item__controls')
    stationListItemFavoriteStar.classList.add('fa', `fa-star${station.favorite ? '' : '-o'}`)
  
    stationListItemNumber.innerText   = i + 1
    stationListItemName.innerText     = station.name
    stationListItemGenre.innerText    = station.genre
    stationListItemLanguage.innerText = station.language
    stationListItemBitrate.innerText  = station.bitrate > 0 ? station.bitrate : ''

    stationListItemFavorite.append(stationListItemFavoriteStar)

    stationListItemFavorite.addEventListener('click', function() {
      stations[i].favorite = 0 === stations[i].favorite ? 1 : 0
      
      if (stations[i].favorite) {
        stationListItemFavoriteStar.classList.replace('fa-star-o', 'fa-star')
      } else {
        stationListItemFavoriteStar.classList.replace('fa-star', 'fa-star-o')
      }

      save()
    })
  
    const controlsPlay   = document.createElement('i')
    const controlsEdit   = document.createElement('i')
    const controlsDelete = document.createElement('i')
    const controlsMove   = document.createElement('i')

    controlsPlay.classList.add('fa', 'fa-play')
    controlsEdit.classList.add('fa', 'fa-cog')
    controlsDelete.classList.add('fa', 'fa-trash')
    controlsMove.classList.add('fa', 'fa-bars')

    controlsPlay.setAttribute('title', `Listen to ${station.name}`)
    controlsEdit.setAttribute('title', `Edit to ${station.name}`)
    controlsDelete.setAttribute('title', `Remove to ${station.name}`)
    controlsMove.setAttribute('title', `Move to ${station.name}`)
  
    controlsPlay.addEventListener('click', (e) => player.play(station))
    
    controlsEdit.addEventListener('click', function() {
      forms.set(station, i)
    })
    
    controlsDelete.addEventListener('click', function() {
      stations.splice(i, 1)

      save()
      fill()
    })

    controlsMove.addEventListener('mousedown', function(e) {
      li.setAttribute('draggable', 'true')
    })

    controlsMove.addEventListener('mouseup', function(e) {
      li.setAttribute('draggable', 'false')
    })

    controlsMove.addEventListener('mouseleave', function(e) {
      li.setAttribute('draggable', 'false')
    })
   
    stationListItemControls.append(
      controlsPlay,
      controlsEdit,
      controlsDelete,
      controlsMove,
    )
  
    li.append(
      stationListItemNumber,
      stationListItemFavorite,
      stationListItemName,
      stationListItemGenre,
      stationListItemLanguage,
      stationListItemBitrate,
      stationListItemControls,
    )
  
    stationList.append(li)
  }
}
