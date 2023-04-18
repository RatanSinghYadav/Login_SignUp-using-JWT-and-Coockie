import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function Loign() {
    const [login, setLogin] = useState({
        email:'',
        password:'',
    });
   
    const setData = (e)=>{
        const {name,value} = e.target;
        setLogin((newData)=>{
            return{
                ...newData, [name]:value
            }
        })
    }
    
    const navigate = useNavigate();
    console.log(login);

    const signData = async(e)=>{
        e.preventDefault();
        const {email,password} = login;
        const res = await fetch("http://localhost:8080/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email,password})
        });
        const addData = await res.json();
        console.log(addData)

        if (res.status === 422 || !addData) {
          window.alert("Plz fill the require field.");
      } else {
          window.alert("Login successfully.");
          navigate('/signup');
      }
    }

  return (
    <div>
        <h2>Loign Form</h2>
        Email:
        <input value={login.email} onChange={setData} type='text' name='email' placeholder='Email'/>
        Password:
        <input value={login.password} onChange={setData} type='text' name='password' placeholder='Password'/>
        <button onClick={signData}>Submit</button>
    </div>
  )
}

export default Loign;