import React from 'react'
import { Button } from 'react-bootstrap'
import axios from 'axios';

export default function Cors1() {
    async function axiosCall() {
        await axios.get("http://infinity-z1xv.onrender.com/api/unallocated", {
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((res) => {
                console.log(res);
                alert("RES: "+JSON.stringify(res))
            })
            .catch((error) => {
                console.log(error);
                alert("ERROR: " +error)
            })
    }
    return (
        <>
            <div>Cors1</div>
            <div>

                <Button style={{ alignItems: "center" }} onClick={axiosCall}>Click Me</Button>
            </div>

        </>

    )
}
