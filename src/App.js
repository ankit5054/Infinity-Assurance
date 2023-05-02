// import logo from './logo.svg';
import './App.css';
import { Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/Home';
import Singin from './components/Singin';
import Employee from './components/Employee';
import Admin from './components/Admin';
import Customer from './components/Customer';
import Nav1 from './components/Nav';
import { useState } from 'react';
import Issue from './components/Issue';


function App() {
  const [signedIn, setSignedIn]= useState(false)

  return (
    <div className="App">
      <Nav1 signedIn={signedIn} setSignedIn={setSignedIn} />
      <header className="App-header">
        
          <Routes>
            <Route path="./" element={<Home signedIn={signedIn} setSignedIn={setSignedIn}/>} />
            <Route path="./signin" element={<Singin signedIn={signedIn} setSignedIn={setSignedIn}/>} />
            <Route path="./customer" element={<Customer signedIn={signedIn} setSignedIn={setSignedIn}/>} />
            <Route path="./admin" element={<Admin signedIn={signedIn} setSignedIn={setSignedIn}/>} />
            <Route path="./employee" element={<Employee signedIn={signedIn} setSignedIn={setSignedIn}/>} />
            <Route path="./issue/:id" element={<Issue/>} />
          </Routes>
        

      </header>
    </div>
  );
}

export default App;
