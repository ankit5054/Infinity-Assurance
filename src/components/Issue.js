import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { Button } from 'react-bootstrap';
import { IsSignedIn } from '../utils/signedIn';
import { getSecificIssue } from '../utils/apiCalls';

export default function Issue(props) {
    let navigate = useNavigate()
    const params = useParams()

    const [res, setData] = useState({ id: null, productType: null, productErrors: null, issueDesc: null, assignedTo: null, status: null, uploadedFiles: [] })


    let id = params.id
    let count = 0

    useEffect(() => {
        (async () => { await getSecificIssue(id, setData) })()
    }, [id, setData])

    async function updateStatus(e) {
        await updateStatus(e.target.value)
        setData({...res, status:e.target.value})
        // setStatus(e.target.value)
    }



    let d =
        <>
            {/* {await getSecificIssue(id, setData)} */}
            {/* {call()} */}
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
                    Status : {res.status}
                </div>

                {IsSignedIn('employee') ?
                    <div className='select-div-1'>
                        Change Status *
                        <select className="custom-select" style={{ margin: "0 0 0 20px" }} onChange={(e) => {
                            if (e.target.value !== "N/A") { updateStatus(e) }
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
            {true ? d : <><p style={{ margin: "50px 0 0 0" }}>You are not signedIn as Admin or Employee</p></>}
        </>
    )
}
