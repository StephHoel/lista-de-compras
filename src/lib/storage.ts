export function setUser(value: string) {
  sessionStorage.setItem('user', value)
}

export function getUser() {
  return sessionStorage.getItem('user')
}

export function removeUser() {
  sessionStorage.removeItem('user')
}
