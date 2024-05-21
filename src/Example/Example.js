import React, { useState } from "react";
import './Example.css'

function Example() {
    const[input, setInput] = useState('')

    const validate = () => {
        if(input){
            E
        } else console.log('neexistuje')
    }
    const handleChange = (event) => {
        setInput(event.target.value)
    }
    return(
        <>
        <label class="name">Pouzivatelske meno:</label>
        <input type="text" value={input} onChange={handleChange}></input>
        <p>Moj input: {input}</p>
        <button onClick={validate}>Tlacitko</button>
        </>
    )
    
}

export default Example;