import { playlists } from './main.js'
import * as warning from  './warning.js'
import * as strParser from './strParser.js'

const exportBtn = document.querySelector('.export-btn')

exportBtn.addEventListener('click', function(e) {
  if (!playlists[0].name || '' === playlists[0].name) {
    warning.alert('Export error', 'Please provide a playlist name.')
    return
  }

  if (playlists[0].stations.length <= 0) {
    warning.alert('Export error', 'Your playlist is empty,\nPlease provide at leat one radio station.')
    return
  }


  try {
    const output =
`SiiNunit
{
live_stream_def : ${playlists[0].name} {
 stream_data: ${playlists[0].stations.length}
${playlists[0].stations.map((station, index) => {
  return ` stream_data[${index}]: "${station.url}|${strParser.encode(station.name)}|${station.genre}|${station.language}|${station.bitrate}|${station.favorite}"`
}).join('\n')}
}

}
`

    const textToBLOB = new Blob([output], { type: 'text/plain' })
    const link       = document.createElement('a')

    link.download = 'live_streams.sii'

    if (null != window.webkitURL) {
      link.href = window.webkitURL.createObjectURL(textToBLOB)
    }
    else {
      link.href = window.URL.createObjectURL(textToBLOB)
      link.style.display = 'none'
      document.body.appendChild(link)
    }

    link.click()
  
  } catch (err) {
    console.log(err)
    warning.alert('Export failed', 'Something went wrong when trying to export your playlist.\n\n' + err.message)
  }
})