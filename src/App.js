// import logo from './logo.svg';
import './App.css';
import { Routes, Route, BrowserRouter } from "react-router-dom";

import Home from './components/Home';
import Singin from './components/Singin';


function App() {

  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/signin" element={<Singin/>}/>
          </Routes>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
