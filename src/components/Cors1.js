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
                alert(res.response.data)
            })
            .catch((error) => {
                console.log(error);
                alert(error)
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
