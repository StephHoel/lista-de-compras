// session storage
export function getUser() {
  return sessionStorage.getItem('user')
}

export function setUser(value: string) {
  sessionStorage.setItem('user', value)
}

export function removeUser() {
  sessionStorage.removeItem('user')
}

// local storage
export function storageGet(item: string) {
  return localStorage.getItem(item)
}

export function storageSet(key: string, value: string) {
  localStorage.setItem(key, value)
}

export function storageRemove(item: string) {
  localStorage.removeItem(item)
}
