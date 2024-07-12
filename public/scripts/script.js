const linkForm = document.querySelector("#link-form");
const linkBtn = document.querySelector("#link-submit");
const limitInput = document.querySelector("#limit-input");
const useCheckbox = document.querySelector("#used-checkbox");

linkForm.addEventListener("submit", function(e){

    e.preventDefault();

    const formData = new FormData(linkForm);

    const formObject = {};

    formData.forEach((data, key) => {
        formObject[key] = data;
    })

    console.log(formObject)

    fetch('http://localhost:8081/api/create', {
        method: "POST",
        headers:{
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formObject),
    }).then(response => response.json()).then(data =>{
        console.log(data);}
    )


})

useCheckbox.addEventListener("change", () =>{
    if(limitInput.getAttribute('disabled') != null){
        limitInput.removeAttribute('disabled');

    }else{
        limitInput.setAttribute("disabled", true)
        limitInput.value = 0;
    }
})

