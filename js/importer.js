import { playlists } from './main.js'
import * as stationList from './stationList.js'
import * as welcome from './welcome.js'
import * as warning from './warning.js'
import * as strParser from './strParser.js'
import save from './save.js'

const importFile = document.getElementById('import-file')
const filereader = new FileReader()

importFile.addEventListener('change', function(e) {
  filereader.readAsText(e.target.files[0], 'utf8')
  
  filereader.addEventListener('load', function(e) {
    try {
      const { name, stations } = parse(e.target.result)
    
      if (playlists.length <= 0)
        playlists.push({name: name, stations: []})

      for (const station of stations)
        playlists[0].stations.push(station)
  
      stationList.fill()
      welcome.hide()
      save()
  
    } catch (err) {
      console.log(err)
      warning.alert('Import error', `These was an issue importing your file.\nPlease make sure it's a valid live_streams.sii file.`)
  
    }
  })
})

export function parse(input) {
  const count = parseInt(input.match(/{[\r\n]+ stream_data: (.*?)[\r\n]+/)[1])
  const name = input.match(/live_stream_def : (.*?) {/)[1]
  
  const stations = input.match(/stream_data\[(.*?)\]: "(.*?)"/g).map((str, i) => {
    const [ignore, url, name, genre, language, bitrate, favorite] = str.match(/"(.*?)\|(.*?)\|(.*?)\|(.*?)\|(.*?)\|(.*?)"/)

    return {
      url,
      name: strParser.decode(name),
      genre,
      language,
      bitrate: parseInt(bitrate),
      favorite: parseInt(favorite),
    }
  })

  return JSON.parse(JSON.stringify({ count, name, stations }))
}