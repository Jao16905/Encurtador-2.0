import { useState } from "react"
import LinkForm from "../components/LinkForm"
import AuthModal from "../components/Login"

let [authType, setAuthType] = useState('');
let [showModal, setShowModal] = useState(false)

const handleAuthType = (data) =>{
    setAuthType(data);
    setShowModal(true)
}

const handleModal = (data) =>{
    setShowModal(data)
}

function Home(){
    return(
        <>
        <Header handleAuthType = {handleAuthType}/>
        <main className="flex justify-center bg-white p-5 rounded-lg py-5 mt-20">
            <LinkForm/>
            <AuthModal authType = {authType} showModal={showModal} handleModal = {handleModal}/>
        </main>
        </>
    )
}

export default Home