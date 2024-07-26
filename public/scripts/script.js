const linkForm = document.querySelector("#link-form");
const linkBtn = document.querySelector("#link-submit");
const limitInput = document.querySelector("#limit-input");
const useCheckbox = document.querySelector("#used-checkbox");
const loginBtn = document.querySelector("#login-btn");
const registerBtn = document.querySelector("#register-btn");
const authModal = document.querySelector("#auth-modal");
const closeBtn = document.querySelector("#close-btn");
const loginAuthForm = document.querySelector("#login-auth-form");
const registerAuthForm = document.querySelector("#register-auth-form");
const alreadyAccountBtn = document.querySelector("#exist-account-btn");
const headerAuthDiv = document.querySelector("#header-auth-div");
const authTitle = document.querySelector("#auth-title");
const token = localStorage.getItem('authorization-token')

closeBtn.addEventListener("click", () => {

    if (authModal.classList.contains("hidden")) return;

    requestAnimationFrame(() => {

        authModal.classList.add("opacity-0");
        authModal.classList.remove("opacity-100");
    })

    authModal.addEventListener("transitionend", () => {
        authModal.classList.add("hidden");
        authModal.classList.remove("flex");
    }, { once: true })

})




linkForm.addEventListener("submit", function (e) {

    e.preventDefault();

    const formData = new FormData(linkForm);

    const formObject = {};

    formData.forEach((data, key) => {
        formObject[key] = data;
    })

    console.log(formObject)

    fetch('http://localhost:8081/api/create', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formObject),
    }).then(response => response.json()).then(data => {
        console.log(data);
    }
    )

})

if(localStorage.getItem("authorization-token") != null){
    loginBtn.addEventListener("click", () => {showAuthModal("login")

            alreadyAccountBtn.setAttribute("data-auth-type", "register")

            authTitle.textContent = "Login"
             
            alreadyAccountBtn.innerHTML = "Não tem uma conta?";
})};
    registerBtn.addEventListener("click", () => { 
        showAuthModal("register")  
        alreadyAccountBtn.setAttribute("data-auth-type", "login")
         authTitle.textContent = "Registrar"
        alreadyAccountBtn.innerHTML = "Já tem conta?";
});

alreadyAccountBtn.addEventListener("click", () =>{

    let authAttr = alreadyAccountBtn.dataset.authType;

    if(authAttr == "login"){
        alreadyAccountBtn.setAttribute("data-auth-type", "register")
        authTitle.textContent = "Login"
        switchFormType(authAttr);
        alreadyAccountBtn.innerHTML = "Não tem uma conta?";
       
    }else{
        alreadyAccountBtn.setAttribute("data-auth-type", "login")
        authTitle.textContent = "Registrar"
        switchFormType(authAttr);
        alreadyAccountBtn.innerHTML = "Já tem conta?"
    }


})


registerAuthForm.addEventListener("submit", (event) => {

    event.preventDefault();

    authFormFunction("register", registerAuthForm)

})

loginAuthForm.addEventListener("submit", (event) => {

    event.preventDefault()

    authFormFunction("login", loginAuthForm)

})

useCheckbox.addEventListener("change", () => {

    if (limitInput.getAttribute('disabled') != null) {
        limitInput.removeAttribute('disabled');

    } else {
        limitInput.setAttribute("disabled", true)
        limitInput.value = 0;
    }
})

function authFormFunction(type, form) {


    const loginFormData = new FormData(form);

    const loginFormObject = {};

    loginFormData.forEach((data, key) => {
        loginFormObject[key] = data;
    })

    fetch(`http://localhost:8081/auth/${type}`, {
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

        setTimeout()
        return response.json()
    }).catch(error => {
        console.log(error);
    })


}

function loginUser(){

    if(token != null){

    }
}

function updateLink(){

    if(token != null){

    }

}

function deleteLink(){

    if(token != null){

    }

}

function showLinks(){

    if(token != null){

    }

}

function logout(){

    localStorage.removeItem('authorization-token')

}

function showAuthModal(type){
    if (authModal.classList.contains("flex")) return;

    authModal.classList.add("flex");
    authModal.classList.remove("hidden");
    requestAnimationFrame(() => {
        authModal.classList.add("opacity-100");
        authModal.classList.remove("opacity-0")
    })

    switchFormType(type)
}

function switchFormType(type){

    if(type == "register"){
        if(headerAuthDiv.classList.contains("-translate-y-32", "rounded-t-lg")) return console.log("no")

        headerAuthDiv.classList.add("-translate-y-32", "rounded-t-lg");
        headerAuthDiv.classList.remove("translate-y-32", "rounded-b-lg");
        requestAnimationFrame(() =>{

            loginAuthForm.classList.add("opacity-0");
            registerAuthForm.classList.remove("opacity-0")

        })

    }else{
        if(headerAuthDiv.classList.contains("translate-y-32", "rounded-b-lg")) return console.log("no")
            requestAnimationFrame(() =>{

                loginAuthForm.classList.remove("opacity-0");
                registerAuthForm.classList.add("opacity-0");
    
            })
    
        headerAuthDiv.classList.remove("-translate-y-32", "rounded-t-lg");
        headerAuthDiv.classList.add("translate-y-32", "rounded-b-lg");

    }

}