import React, { useState } from 'react'
import { IsSignedIn } from '../utils/signedIn'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router'

// import { Link } from 'react-router-dom'

export default function Admin() {
    let navigate = useNavigate();
    let [adminSelected, setadminSelected] = useState("N/A")
    let [data, setdata] = useState([])

    let unallocated = JSON.parse(localStorage.getItem("unallocated"))
    let allocated = JSON.parse(localStorage.getItem("allocated"))

    function HandleAssignmentChange(e, id) {
        // console.log(`handleAssignmentChange`);
        for (let i = 0; i < data.length; i++) {
            if (data[i].id === id) {
                // console.log(id)
                let data1= data
                let temp = data[i]
                temp.assignedTo = e.target.value
                temp.status = "Open"

                data1.splice(i, 1)
                unallocated = data1
                if (allocated === null) {
                    localStorage.setItem("allocated", JSON.stringify([temp]))
                }
                else {
                    allocated.push(temp)
                    localStorage.setItem("allocated", JSON.stringify(allocated))
                }
                localStorage.setItem("unallocated", JSON.stringify(data))
                setdata(unallocated)
            }
        }
    }

    function handleChange(e) {
        setadminSelected(e.target.value)
        if (e.target.value === "unallocated") {
            // console.log(unallocated)
            setdata(unallocated)
        }
        else if (e.target.value === "allocated") {

            if (allocated === null)
                setdata([])
            else
                setdata(allocated)
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
                                <th>Assigned To</th>
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
                                        <td>{val.assignedTo}</td>
                                        <td><Button onClick={()=>{
                                            navigate(`/issue/${val.id}`)
                                        }}>More Details</Button></td>
                                        <td>
                                            <select className="custom-select" style={{ margin: "0 0 0 20px" }} onChange={(e) => { HandleAssignmentChange(e, val.id); setdata(unallocated) }}>
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
                                        <td><Button onClick={()=>{
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
