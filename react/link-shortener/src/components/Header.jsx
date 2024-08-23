import { useContext } from "react"
import { Link } from "react-router-dom"

function Header(props) {

  const userLogin = useContext(LoginContext);

  
  const handleLogout = () => {
    localStorage.removeItem('authorization-token');
    userLogin.setLogin({...userLogin.login, value:false, token: ''})
  }

  const handleAuth = (type) => {
    props.handleAuthType(type)
  }

  return (
    <header>
      <nav id="default-header" className="space-x-2 justify-end flex">
            {!userLogin.login.value ? (<><button onClick={handleAuth('register')} className="p-2 bg-white text-black rounded-md active:bg-black md:hover:bg-black md:hover:text-white active:text-white">Register</button></>) : (<><Link to={`/user/${userLogin.login.token.name}`} class="p-2 bg-white text-black rounded-md active:bg-black md:hover:bg-black md:hover:text-white active:text-white">Manage Links</Link></>)}
            <button onClick={userLogin.login.value ? handleLogout : handleAuth('login')} className="p-2 bg-white text-black rounded-md active:bg-black md:hover:bg-black md:hover:text-white active:text-white transition">{userLogin.login.value ? "Sair" : "Login"}</button>
        </nav>    
    </header>
  )
}

export default Header