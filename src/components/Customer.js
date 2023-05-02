import React, { useState } from 'react'
import products from '../data/productType';
import { Button } from 'react-bootstrap';
// import { useNavigate } from 'react-router';
import { storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 } from "uuid"
import ReactLoading from "react-loading";
import { IsSignedIn } from '../utils/signedIn';


export default function Customer(props) {
    const [productType, setProductType] = useState("N/A");
    const [productErrors, setproductError] = useState([]);
    const [errors, setError] = useState("N/A");
    const [issueDesc, setissueDesc] = useState("");
    const [uploadedFiles, setUploadedFiles] = useState([])
    const [fileLimit, setFileLimit] = useState(true);
    const [isSubmit, setisSubmit] = useState(false);

    function handleProductChange(e) {
        setProductType(e.target.value)

        if (e.target.value !== "N/A")
            setproductError(products[e.target.value])
        else
            setproductError([])

    }
    function handleProductErrorChange(e) {
        setError(e.target.value)
    }
    function handletextareaChange(e) {
        setissueDesc(e.target.value)
    }
    const handleUploadFiles = files => {
        const fileSizelimit = 2 * 1024 * 1024;
        let fileSize = 0;
        const uploaded = [];
        // let limitExceeded = false;
        files.some((file) => {
            if (uploaded.findIndex((f) => f.name === file.name) === -1) {
                uploaded.push(file);
                fileSize = fileSize + file.size
            }
            return null
        })
        // console.log(fileSize);
        if (fileSize >= fileSizelimit) {
            alert(`Max size of all file should be at max 2MB`);
            setFileLimit(true);
        }
        else if (uploaded.length === 0) {
            alert(`No attchments found, need at least one attachment!`);
            setFileLimit(true);
        }
        else {
            setFileLimit(false);
            setUploadedFiles(uploaded)
        }
    }
    const handleFileEvent = (e) => {
        const chosenFiles = Array.prototype.slice.call(e.target.files)
        handleUploadFiles(chosenFiles);
    }
    function myFunc(pt) {
        let res = []
        productErrors.forEach((i) => {
            res.push(<option value={i} className="custom-select">{i}</option>)
        })
        return res
    }
    async function fileupload() {
        let filePath = []
        // setisSubmit(true)
        let fileUrl = []
        uploadedFiles.forEach(f => {
            filePath.push(`data/${f.name + v4()}`)
        })


        // k=0

        for (let i = 0; i < filePath.length; i++) {
            const fileRef = await ref(storage, filePath[i])
            await uploadBytes(fileRef, uploadedFiles[0])
                .then((res) => {
                    // console.log(res)
                    // console.log("Uploaded Successfully")
                })
                .catch(() => {
                    alert(`Unable to upload, please recreate the issue.`)
                })
            await getDownloadURL(fileRef, filePath[i]).then(url=>{
                fileUrl.push(url)  
            })
        }
        // console.log(fileUrl)
        return fileUrl
    }
    async function handleSubmit() {
        var dateObj = new Date();
        var month = dateObj.getUTCMonth() + 1; //months from 1-12
        var day = dateObj.getUTCDate();
        var year = dateObj.getUTCFullYear();

        // if(productType==="N/A" || errors==="N/A" ){

        // }

        let newdate = day + "/" + month + "/" + year;
        let supportRequest

        await Promise.all([
            await fileupload()
        ]).then(async (res) => {
            supportRequest = {
                "id": v4(),
                "productType": productType,
                "productErrors": errors,
                "issueDesc": issueDesc,
                "uploadedFiles": res[0],
                "assignedTo": 'Unallocated',
                'DateOfSubmission': newdate,
                'username': "Customer",
                "status": "New"
            }
            // console.log(supportRequest)
            let p = JSON.parse(localStorage.getItem("unallocated"))
            if (p === undefined || p === null) {
                localStorage.setItem("unallocated", JSON.stringify([supportRequest]))
            }
            else {
                p.push(supportRequest)
                localStorage.setItem("unallocated", JSON.stringify(p))
                // console.log(localStorage.getItem("unallocated"))
            }
            alert("Your support request is succesfully submitted. A customer care executive will be in touch with you soon. Thanks!")
            setProductType("N/A")
            setError("N/A")
            setproductError([])
            setissueDesc('')
            setFileLimit(true)
        })
        // .catch(() => {
        //     alert("Upload interrepted ! Please retry. ")
        // })
    }

    let request = <>
        <header>
            <h3 style={{ margin: "100px 0 20px 0" }}>New Support Request</h3>
        </header>
        <div>
            <div className='select-div-1'>
                Product Type *
                <select className="custom-select-1" style={{ margin: "0 0 0 20px" }} onChange={handleProductChange}>
                    <option value="N/A" defaultChecked className="custom-select">N/A</option>
                    <option value="Mobile Phone" className="custom-select">Mobile Phone</option>
                    <option value="TV" className="custom-select">TV</option>
                    <option value="Refrigerator" className="custom-select">Refrigerator</option>
                    <option value="Washing Machine" className="custom-select">Washing Machine</option>
                </select>
            </div>
            <div className='select-div-1'>
                Issue Type *
                <select className="custom-select" style={{ margin: "0 0 0 20px" }} onChange={handleProductErrorChange}>
                    <option value="N/A" className="custom-select">N/A</option>
                    {myFunc(productType)}
                </select>
            </div>
            <div className='text-area'>
                <div className='text-area-1'>
                    Issue Description
                </div>
                <div className='text-area-1'>
                    <textarea id="issueDesc" placeholder='Please describe your issue here.' onChange={handletextareaChange} style={{ height: "20vh", width: "60vw" }} />
                </div>
            </div>
            <input id='fileUpload' type='file' multiple
                accept='application/pdf, image/png, application/docx, application/doc, image/jpg' onChange={handleFileEvent}
            />
            <p style={{fontSize:"small"}}>Only application/pdf, image/png, application/docx, application/doc, image/jpg are alowed, max size upto 2MB.</p>
            <div>
                {!(fileLimit || productType === "N/A" || errors === "N/A") ? <Button style={{ margin: "20px 0 0 0" }} onClick={async (e) => {
                    setisSubmit(true)
                    await handleSubmit(e)
                    setisSubmit(false)
                    // document.getElementById('issueDesc').value = ""

                }}>Submit</Button> : null}
            </div>
        </div>
    </>

    return (
        <>
            {IsSignedIn("customer") ? (!isSubmit ? request : <><ReactLoading type={'spinningBubbles'} className='loading' color={'#03fc4e'} height={100} width={100} /></>) : <div>You are not signed in as Customer.</div>}
        </>
    )
}
