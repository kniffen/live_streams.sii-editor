import './siteHeader.js'
import './importer.js'
import './exporter.js'
import './addEditForm.js'
import './privacy.js'
import * as stationList from './stationList.js'
import * as welcome from './welcome.js'

export const playlists = []

if (localStorage.playlists) {
  const _playlists = JSON.parse(localStorage.playlists)

  for (const playlist of _playlists)
    playlists.push(playlist)

  stationList.fill()
  welcome.hide()

} else {
  welcome.show()
}