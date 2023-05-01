import React from 'react'
import { useState } from "react";
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
export default function Home() {
  window.usertype = "N/A"
  let navigate = useNavigate();
  const [selectValue, setSelectValue] = useState("N/A")
  function handleChange(e) {
    window.usertype = e.target.value;
    setSelectValue(e.target.value);
  }
  function ClickHandle(){
    navigate("/signin")
  }
  let temp = <div>
    <p>You have selected {selectValue} !</p>
    <Button variant="success" onClick={ClickHandle}>Continue</Button>
  </div>
  return (
    <div>
      <div><h1>Please select the User Type</h1></div>
      <div className='select-div'>
        <select className="custom-select" onChange={handleChange}>
          <option value="N/A" className="custom-select">N/A</option>
          <option value="employee" className="custom-select">Employee</option>
          <option value="customer" className="custom-select">Customer</option>
        </select>
      </div>

      {selectValue === "N/A" ? <p>You haven't selected from dropdown, please select a role!</p> : temp}

    </div>
  )
}
