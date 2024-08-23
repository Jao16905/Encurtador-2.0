import { useState } from "react"

let [authType, setAuthType] = useState('');

function AuthModal(props) {

const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`http://localhost:8081/auth/${authType}`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginFormObject),
    }).then(response => {

        if (!response.ok) {
            throw new Error('Login falhou')
        }

            const token = response.headers.get('authorization-token');

            if (token) {
                localStorage.setItem('authorization-token', token)
            }

        handleModal(false)

        return response.json()
    }).catch(error => {
        console.log(error);
    })
}



    const handleModal = (value) =>{
        props.handleModal(value);

    } 

    const handleAuthType = (value) =>{

        if(!value) setAuthType(props.authType) 
        
        setAuthType(value)
    }

    return (
        <article onLoad={handleAuthType} class={`absolute duration-200 ease-out top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-slate-600 bg-opacity-70 w-full h-full items-center justify-center transition-opacity ${props.showModal ? 'flex opacity-100': 'hidden opacity-0'} flex-col opacity-0`}>
            <div onClick={handleModal(false)} class="absolute left-2 top-2 text-slate-50">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-7">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
              
            </div>

            <div class={`z-10 w-80 text-center bg-blue-900 text-white h-64 absolute transform ${authType == "login" ? "rounded-b-lg -translate-b-32" : ""} flex flex-col transition-all items-center justify-center align-middle space-y-10`}>
            <h1 id="auth-title" class="text-5xl font-bold uppercase">{authType == 'login' ? ('Logar') : ('Registrar')}</h1>
            <p id="login-desc" class="font-medium hidden">{authType == 'login' ? ('Logue e administre todos os links incríveis que você tem') : ('Crie uma conta e eleve o controle dos seus links ao próximo nível')}</p>
            <button onClick={authType == 'login' ? handleAuthType('register') : handleAuthType('login')} data-auth-type="register" id="exist-account-btn" class="md:hover:underline active:underline">{authType == 'login' ? ("Não tem uma conta ainda?") : ("Já tem conta?")}</button>
        </div>
        <form onSubmit={handleSubmit} name="auth-form" class="z-0 w-80 transition-opacity bg-white px-5 rounded-t-lg border-0 h-64 flex flex-col justify-center">
            <div class="flex flex-col justify-center">
                <label for="login-email-input">Email</label>
                <input type="email" name="email" id="login-email-input" class="border-2 border-slate-300"/>
            </div>
            <div class="flex flex-col justify-center">
                <label for="login-password">Senha</label>
                <input type="password" name="password" id="login-password" class="border-2 border-slate-300"/>
            </div>
            <div class="flex pt-5 justify-between items-center">
                <button type="submit" class="bg-emerald-500 p-2 text-white rounded-lg">Logar</button>
            </div>
        </form>
         <form onSubmit={handleSubmit} name="auth-form" class=" transition-opacity z-0 w-80 border-0 bg-white p-5 rounded-b-lg h-64 flex flex-col justify-center">
            <div class="flex flex-col justify-center">
                <label for="name-input">Nome</label>
                <input type="text" name="name" id="name-input" class="border-2 border-slate-300"/>
            </div>
            <div class="flex flex-col justify-center">
                <label for="register-email-input">Email</label>
                <input type="email" name="email" id="registr-email-input" class="border-2 border-slate-300"/>
            </div>
            <div class="flex flex-col justify-center">
                <label for="register-password">Senha</label>
                <input type="password" name="password" id="register-password" class="border-2 border-slate-300"/>
            </div>
            <div class="flex pt-5 justify-between items-center">
                <button type="submit" class="bg-emerald-500 p-2 text-white rounded-lg">Criar conta</button>
            </div>
        </form>


        </article>
    )
}

export default AuthModal