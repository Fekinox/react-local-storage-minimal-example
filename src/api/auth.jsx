export async function login(name) {
  // Wait about half a second to fake doing an actual API call,
  // then store the login info in local storage
  await new Promise(res => setTimeout(res, 500));
  console.log('logging in')

  localStorage.setItem('loggedIn', true)
  localStorage.setItem('user', name)
}

export async function logout() {
  console.log('logging out')
  localStorage.removeItem('loggedIn')
  localStorage.removeItem('user')
}
