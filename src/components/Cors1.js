import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import axios from 'axios';

export default function Cors1() {

    const [data, setdata] = useState("Nothing")

    async function axiosCall() {
        await axios.get("https://infinity-z1xv.onrender.com/api/unallocated", {
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((res) => {
                console.log(res);
                setdata(JSON.stringify(res))
                alert("RES: " + JSON.stringify(res))
            })
            .catch((error) => {
                console.log(error);
                setdata(JSON.stringify(error))
                alert("ERROR: " + error)
            })
    }
    return (
        <>
            <div>Cors1</div>
            <div>

                <Button style={{ alignItems: "center" }} onClick={axiosCall}>Click Me</Button>

            </div>
            <din>
                <h6>{data}</h6>
            </din>

        </>

    )
}
