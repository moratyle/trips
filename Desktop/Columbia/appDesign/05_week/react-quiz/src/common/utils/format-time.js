function msToTime(s) {
  // Pad to 2 or 3 digits, default is 2
  function pad(n, z) {
    z = z || 2
    return ('00' + n).slice(-z)
  }

  const ms = s % 1000
  s = (s - ms) / 1000
  const secs = s % 60
  s = (s - secs) / 60
  const mins = s % 60

  return pad(mins) + ':' + pad(secs) + '.' + pad(ms, 2)
}

export default msToTime
