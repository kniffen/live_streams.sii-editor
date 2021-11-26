import { playlists } from './main.js'

export default function save() {
  console.log('Saving playlists')
  localStorage.playlists = JSON.stringify(playlists)
}