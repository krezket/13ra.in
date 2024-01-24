import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../utils/API';

export default function Search() {
    const navigate = useNavigate();


    const [input, setInput] = useState("")

    const handleChange = e => {
        if (e.target.name === "input") {
            setInput(e.target.value)
        }
    }

    const submitHandler = e => {
        e.preventDefault()
        
        API.getProfileByName(input)
            .then((data) => {
                // CONSOLE LOG //
                // console.log("Get User:", data)
                navigate("/&/" + data.username)
                // const CrntPgData = JSON.stringify(data)
                // window.sessionStorage.setItem("CrntPgDt", CrntPgData)
            })
            .catch((err) => {
                console.log("oh noes");
                console.log(err);
            });
    }

    return (
        <form onSubmit={submitHandler}>
            <input name='input' value={input} onChange={handleChange} placeholder='search'></input>
            <button>Search</button>
        </form>
    )
}
