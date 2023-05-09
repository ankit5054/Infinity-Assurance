import React, { useEffect, useState } from 'react'
import { IsSignedIn } from '../utils/signedIn'
import { useNavigate } from 'react-router';
import { Button } from 'react-bootstrap';
import { getAllallocated } from '../utils/apiCalls';


export default function Employee() {
    let navigate = useNavigate();
    const [allocated, setallocated] = useState([])


    useEffect(()=>{
        (async()=>{ await getAllallocated(setallocated)})()
    })

    return (
        <>
            <div>
                Your Task List
            </div>
            <div>
                <table border={"1px"} style={{padding: "10px"}}>
                    {IsSignedIn("employee") ? <>
                        <tr >
                            <th>Username</th>
                            <th>Product Type</th>
                            <th>Issue Type</th>
                            <th>Date Of Submission</th>
                            <th>Assigned To</th>
                            <th>Status</th>
                            <th></th>
                        </tr>
                        {allocated.map((val, key) => {
                            return (
                                <tr key={val.id}>
                                    <td>{val.username}</td>
                                    <td>{val.productType}</td>
                                    <td>{val.productErrors}</td>
                                    <td>{val.DateOfSubmission}</td>
                                    <td>{val.assignedTo}</td>
                                    <td>{val.status}</td>
                                    <td><Button onClick={() => {
                                        navigate(`/issue/${val.id}`)
                                    }}>More Details</Button></td>
                                </tr>
                            )
                        })}
                    </> : <div>You are not signed in as Employee</div>}
                </table>
            </div>
        </>
    )
}
