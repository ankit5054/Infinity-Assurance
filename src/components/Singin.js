import React from 'react'
import { useState } from "react";
import { Button } from 'react-bootstrap'
import Users from '../data/user';
import Role from '../data/UserRole'
import { useNavigate } from 'react-router';
import { signIn } from '../utils/signedIn';

export default function Singin(props) {
    let navigate = useNavigate()
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")

    function nameHandler(e) {
        setName(e.target.value)
    }
    function passwordHandler(e) {
        setPassword(e.target.value)
    }

    function signinHanlder() {
        if (window.usertype !== "N/A") {
            if (!window.signedIn) {
                if (name in Users) {
                    console.log(Role[name], window.usertype);
                    if (Role[name] === window.usertype) {
                        if (Users[name] === password) {
                            alert('You are signed in')
                            signIn(props.setSignedIn, name)
                            props.setSignedIn(true)
                            if (window.usertype === "customer") {
                                navigate('/customer')
                            }
                            else if (name === "employee1") {
                                navigate('/admin')
                            }
                            else {
                                navigate('/employee')
                            }
                        }
                        else {
                            alert("Wrong Password!")
                        }
                    }
                    else {
                        alert("User type does not match with username user type.")
                    }
                }
                else {
                    alert("Unkown user!")
                }
            }
            else {
                alert(`Already Signed in as ${window.signedInAs} !`)
                if (window.signedInAs === "customer") {
                    navigate('/customer')
                }
                else if (window.signedInAs === "employee1") {
                    navigate('/admin')
                }
                else {
                    navigate('/employee')
                }
            }
        }
        else {
            alert("User Type not selected redirecting to Home page.")
            navigate("/")
        }

    }

    return (
        <div>
            <h1>Singin Page</h1>
            <p>You have selected {window.usertype}</p>
            <div>
                <div>
                    Username <input placeholder='Username' onChange={nameHandler}></input>
                </div>
                <div style={{margin:"20px 0 0 20px" }}>
                    Password <input type="password" placeholder='Password' onChange={passwordHandler}></input>
                </div>
            </div>
            <Button onClick={signinHanlder} style={{margin:"20px 0 0 20px" }}>Submit</Button>
        </div>

    )
}
