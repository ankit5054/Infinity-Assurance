import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { Button } from 'react-bootstrap';
import { IsSignedIn } from '../utils/signedIn';

export default function Issue(props) {
    let navigate = useNavigate()
    const params = useParams()

    const [Status, setStatus] = useState("")
    // const [idData, setidData] = useState()

    let id = params.id
    let count = 0


    let unallocated = JSON.parse(localStorage.getItem("unallocated"))
    let allocated = JSON.parse(localStorage.getItem("allocated"))
    let data = [...unallocated, ...allocated]
    let res
    let i
    for (i = 0; i < data.length; i++) {
        if (data[i].id === id) {
            res = data[i]
            break
        }
    }

    useEffect(() => {
        setStatus(res.status)
    }, [setStatus, res])


    function updateStatus(e) {
        if (data[i].assignedTo === "Unallocated") {
            unallocated.forEach((d) => {
                if (data[i].id === d.id) {
                    d.status = e.target.value
                }
            })
            localStorage.setItem("unallocated", JSON.stringify(unallocated))
            window.location.reload();
        }
        else {
            allocated.forEach((d) => {
                if (data[i].id === d.id) {
                    d.status = e.target.value
                }
            })
            localStorage.setItem("allocated", JSON.stringify(allocated))
            // window.location.reload();
        }
        setStatus(e.target.value)
    }



    let d =
        <>
            <div className='issueDetail'>
                <div>
                    Task ID : {res.id}
                </div>
                <div>
                    Product Type : {res.productType}
                </div>
                <div>
                    Issue Related to Product : {res.productErrors}
                </div>
                <div>
                    Issue Description : {res.issueDesc}
                </div>
                <div>
                    Assigned To : {res.assignedTo}
                </div>
                <div>
                    Status : {Status}
                </div>

                {IsSignedIn('employee') ?
                    <div className='select-div-1'>
                        Change Status *
                        <select className="custom-select" style={{ margin: "0 0 0 20px" }} onChange={(e) => {
                             if (e.target.value !== "N/A") {updateStatus(e)}
                        }} >
                            <option value="N/A" defaultChecked className="custom-select">N/A</option>
                            <option value="In Progress" className="custom-select">In Progress</option>
                            <option value="On Hold" className="custom-select">On Hold</option>
                            <option value="Completed" className="custom-select">Completed</option>
                        </select>
                    </div>
                    : null}
                <div>
                    Date Of Submission : {res.DateOfSubmission}
                </div>
                <div>
                    Username : {res.username}
                </div>
                <div>
                    {res.uploadedFiles.map((val, key) => {
                        count = count + 1
                        return <div><a href={val} target="_blank" rel="noreferrer" >{`Attachment${count}`}</a></div>
                    })}
                </div>
            </div>
            <Button style={{ margin: "0 0 0 20px" }} onClick={() => {
                if (IsSignedIn('admin')) {
                    navigate(`/admin`)
                }
                else if (IsSignedIn('employee')) {
                    navigate(`/employee`)
                }
            }}>Back</Button>
        </>

    return (
        <>
            {d}
        </>
    )
}
