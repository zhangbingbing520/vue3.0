const KEY = 'tKey'

export default {
  setUser (data) {
    window.sessionStorage.setItem(KEY, JSON.stringify(data))
  },
  getUser () {
    return JSON.parse(window.sessionStorage.getItem(KEY) || '{}')
  },
  clerarUser () {
    window.sessionStorage.removeItem(KEY)
  }
}
