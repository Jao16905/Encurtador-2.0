import { useState } from "react";

let [form, setForm] = useState({});
let [newUrl, setNewUrl] = useState('');
let [isChecked, setIsChecked] = useState(false);

const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://localhost:8081/api/create', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
    }).then(response => response.json()).then(data => {
        setNewUrl(data);
    }
    )
}

const handleChange = (e) =>{
    const {name, value} = e.target;

    setForm({...form, [name]: value})
}

const handleCheck = (e) =>{
    setIsChecked(e.target.checked)
}


const LinkForm = () => {
  return (

    <div>
        <form name="link-form" className="w-80" onSubmit={handleSubmit}>
            <div class="flex flex-col justify-center">
                <label for="link-input">URL</label>
                <input type="text" name="URL" id="link-input" onChange={handleChange} class="border-2 border-slate-300"/>
        
            </div>
            <div class="flex flex-col justify-center">
                <label for="title-input">Título</label>
                <input type="text" name="title" id="title-input" onChange={handleChange} class="border-2 border-slate-300"/>
            </div>
            <div class="flex pt-5 justify-between items-center">
                <button id="link-submit" type="submit" class="bg-emerald-500 p-2 text-white rounded-lg">Criar URL</button>
                <div class="flex flex-row-reverse gap-2">
                <input type="number" title="number" id="limit-input" name="limit" class="border-2 border-slate-300 w-14 py-1.5 text-center" min="0" disabled = {!isChecked}/>
                <div class="flex space-x-2 items-center">
                    <label for="used-checkbox">Limite de uso</label>
                    <input type="checkbox" name="used" id="used-checkbox" onChange={handleCheck}/>
                </div>
                </div>
            </div>
        </form>
    </div>
  )
}

export default LinkForm