export default {
  formatterTime (value, type) {
    var date = new Date(value)
    var Y = date.getFullYear()
    var m = date.getMonth() + 1
    var d = date.getDate()
    var H = date.getHours()
    var i = date.getMinutes()
    var s = date.getSeconds()
    if (m < 10) {
      m = '0' + m
    }
    if (d < 10) {
      d = '0' + d
    }
    if (H < 10) {
      H = '0' + H
    }
    if (i < 10) {
      i = '0' + i
    }
    if (s < 10) {
      s = '0' + s
    }
    var t = Y + '-' + m + '-' + d + ' ' + H + ':' + i + ':' + s
    if (type === 'day') {
      return Y + '-' + m + '-' + d
    } else if (type === 'second') {
      return H + ':' + i + ':' + s
    }
    return t
  },
  calcOnlineTime (start) {
    if (!start) {
      return '-'
    }
    let now = new Date().getTime()
    let day = Math.floor((now - start) / (1000 * 3600 * 24))
    let leave1 = (now - start) % (24 * 3600 * 1000)
    let hour = Math.floor(leave1 / (3600 * 1000))
    let leave2 = leave1 % (3600 * 1000)
    let minutes = Math.floor(leave2 / (60 * 1000))
    let leave3 = leave2 % (60 * 1000)
    let seconds = Math.round(leave3 / 1000)
    return (day > 0 ? day + '天' : '') + (hour > 0 ? hour + '小时' : '') + (minutes > 0 ? minutes + '分' : '') + (seconds > 0 ? seconds + '秒' : '')
  },
  statusCN (status) {
    const StatusCN = {
      'Up': '运行',
      'Down': '关机'
    }
    return StatusCN[status]
  }
}
