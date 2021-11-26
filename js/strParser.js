export function decode(str) {
  const parsedStr = str.replace(/\\(?:(\\)|x([\s\S]{0,2}))/g, function(char, backslash, hex) {
    const hexInt = !hex.match(/[^a-f0-9]/i) ? parseInt(hex, 16) : NaN
    
    return (!Number.isNaN(hexInt)) ? String.fromCharCode(hexInt) : char
  })

  return decodeURIComponent(escape(parsedStr))
}

export function encode(str) {
  return unescape(encodeURIComponent(str)).replace(/[^a-z0-9 <>!#$%&()=?'--+_.]/gi, (c) => `\\x${c.charCodeAt(0).toString(16)}`)
}