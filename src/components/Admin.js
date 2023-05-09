import React, { useState } from 'react'
import { IsSignedIn } from '../utils/signedIn'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router'
import { assign, getAllUnallocated, getAllallocated } from '../utils/apiCalls';

// import { Link } from 'react-router-dom'

export default function Admin() {
    let navigate = useNavigate();
    let [adminSelected, setadminSelected] = useState("N/A")
    let [data, setdata] = useState([])

    function HandleAssignmentChange(e, id) {
        let data1 = data
        // let allocated
        let unallocated
        for (let i = 0; i < data1.length; i++) {
            if (data1[i].id === id) {
                let temp = data1[i]
                temp.assignedTo = e.target.value
                temp.status = "Open"

                assign(id, e.target.value)

                data1.splice(i, 1)
                unallocated = data1
            }
        }
        setdata([...unallocated])
    }

    function handleChange(e) {
        setadminSelected(e.target.value)
        if (e.target.value === "unallocated") {
            getAllUnallocated(setdata)
        }
        else if (e.target.value === "allocated") {
            getAllallocated(setdata)
        }
        else
            setdata([])
    }


    let select =
        <>
            <div className='select-div-1'>
                Task Assignment Type *
                <select className="custom-select" style={{ margin: "0 0 0 20px" }} onChange={handleChange}>
                    <option value="N/A" defaultChecked className="custom-select">N/A</option>
                    <option value="unallocated" className="custom-select">Unallocated</option>
                    <option value="allocated" className="custom-select">Allocated</option>
                </select>
            </div>

            <div>
                <table border={"1px"}>
                    {adminSelected === "unallocated" ?
                        <>
                            <tr >
                                {/* <th>Task Id</th> */}
                                <th>Username</th>
                                <th>Product Type</th>
                                <th>Issue Type</th>
                                <th>Date Of Submission</th>
                                {/* <th>Assigned To</th> */}
                                <th></th>
                                <th>Assign To</th>
                            </tr>
                            {data.map((val, key) => {
                                return (
                                    <tr key={val.id}>
                                        {/* <td>{val.id}</td> */}
                                        <td>{val.username}</td>
                                        <td>{val.productType}</td>
                                        <td>{val.productErrors}</td>
                                        <td>{val.DateOfSubmission}</td>
                                        {/* <td>{val.assignedTo}</td> */}
                                        <td><Button onClick={() => {
                                            navigate(`/issue/${val.id}`)
                                        }}>More Details</Button></td>
                                        <td>
                                            <select className="custom-select" style={{ margin: "0 0 0 20px" }} onChange={(e) => {
                                                if (e.target.value !== "N/A") { HandleAssignmentChange(e, val.id) }
                                            }}>
                                                <option value="N/A" defaultChecked className="custom-select">N/A</option>
                                                <option value="Employee" className="custom-select">Employee</option>
                                            </select>
                                        </td>
                                    </tr>
                                )
                            })}
                        </>
                        :
                        <>
                            <tr >
                                <th>Username</th>
                                <th>Product Type</th>
                                <th>Issue Type</th>
                                <th>Date Of Submission</th>
                                <th>Assigned To</th>
                                <th>Status</th>
                                <th></th>
                            </tr>
                            {data.map((val, key) => {
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
                        </>
                    }
                </table>
            </div>

        </>
    return (
        <>
            {IsSignedIn("admin") ? select : <div>You are not signed in as Admin</div>}
        </>
    )
}
