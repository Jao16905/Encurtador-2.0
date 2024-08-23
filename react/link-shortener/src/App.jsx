
import './App.css'
import { Outlet } from 'react-router-dom'
import { createContext, useEffect, useState } from 'react'

function App() {

  let [login, setLogin] = useState({value:false, token: ''});

  useEffect(() =>{
    const token = localStorage.getItem('authorization-token');
    if(!token) return
    fetch('http://localhost:8081/user/verify', {
      method: "GET",
      headers: {
          'authorization-token': `${token}`,
          'Content-Type': 'application/json'
      },
  }).then(response => {if(!response.ok){
      localStorage.removeItem("authorization-token");
  }else{
      setLogin({...login, value:true, token:token})
    }
  })},[])

  const LoginContext = createContext()

  return (
    <LoginContext.Provider value={{login, setLogin}}>
    <div className="flex flex-col justify-center w-screen bg-blue-950 ">
      <Outlet/>
    </div>
    </LoginContext.Provider>
        )
}

export default App
