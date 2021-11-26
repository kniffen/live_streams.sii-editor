import { playlists } from './main.js'

export default function save() {
  if (!localStorage.privacy) return
  
  console.log('Saving playlists')
  localStorage.playlists = JSON.stringify(playlists)
}