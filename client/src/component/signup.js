import React, { useState } from 'react'

function Signup() {
    const [signup, setSignup] = useState({
        fname:'',
        email:'',
        password:'',
    });

    const setData = (e)=>{
        const {name,value} = e.target;
        setSignup((newData)=>{
            return{
                ...newData, [name]:value
            }
        })
    }

    const signData = async(e)=>{
        e.preventDefault();
        const {fname,email,password} = signup;
        const res = await fetch("http://localhost:8080/signup", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({fname,email,password})
        });
        const addData = await res.json();

        if (res.status === 422 || !addData) {
          window.alert("Plz fill the require field.");
      } else {
          window.alert("Registered successfully.");
      }
    }

  return (
    <div>
        <h2>SignUP Form</h2>
        Name:
        <input value={signup.fname} onChange={setData} type='text' name='fname' placeholder='Name'/>
        Email:
        <input value={signup.email} onChange={setData} type='text' name='email' placeholder='Email'/>
        Password:
        <input value={signup.password} onChange={setData} type='text' name='password' placeholder='Password'/>
        <button onClick={signData}>Submit</button>
    </div>
  )
}

export default Signup;