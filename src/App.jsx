import { useContext, useEffect, useState } from 'react'
import './App.css'
import { NavLink, Route, Routes, useLocation, useNavigate, } from 'react-router-dom'
import { AuthContext } from './context/auth'

function LoginStatus({ loggedIn, user }) {
  if (loggedIn) {
    return (
      <div>
        logged in as {user}
      </div>
    )
  } else {
    return (
      <div>
      not logged in
      </div>
    )
  }
}

const protectedRoutes = ['/protected']

function App() {
  const { signIn, signOut, loggedIn, user } = useContext(AuthContext)
  const [inputUser, setInputUser] = useState('')

  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (protectedRoutes.includes(location.pathname) && !loggedIn) {
      navigate('/login', { replace: true })
    }
  }, [loggedIn, navigate, location])


  function handleSubmit(evt) {
    evt.preventDefault()
    signIn(inputUser)
  }

  return (
    <>
      <LoginStatus loggedIn={loggedIn} user={user} />
      <div className='buttons'>
        <NavLink to="/"><button>main</button></NavLink>
        <NavLink to="/protected"><button>protected</button></NavLink>
        <NavLink to="/login"><button>login</button></NavLink>
        <button onClick={signOut}>logout</button>
      </div>
      <Routes>
        <Route path="/" element={
          <div>main path</div>
        } />
        <Route path="/protected" element={
          <div>protected path</div>
        } />
        <Route path="/login" element={
          <form onSubmit={handleSubmit}>
            <input type="text" name="username" onChange={(evt) => setInputUser(evt.target.value)}></input>
            <button type="submit">submit</button>
          </form>
        } />
      </Routes>
    </>
  )
}

export default App
