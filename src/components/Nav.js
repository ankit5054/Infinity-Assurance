import React from 'react'
import { Button, Form, Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { logout1 } from '../utils/signedIn';
// import { useNavigate } from 'react-router'


export default function Nav1(props) {

    function logoutHandler() {
        alert("You will be logged out!")
        logout1(props.setSignedIn)
    }

    let logout3 = <Button onClick={logoutHandler} as={Link} to='/' variant="primary">Logout</Button>
    return (
        <>
            <div id="nav">
                <Navbar bg="dark" variant="dark">
                    <Navbar.Brand style={{ margin: "0 0 0 20px" }} as={Link} to="/">Infinity Assurance</Navbar.Brand>
                    <Nav style={{ margin: "0 0 0 20px" }} className="me-auto">
                        <Nav.Link as={Link} to='/'>Home</Nav.Link>
                        {/* {props.signedIn ? logout : null} */}
                    </Nav>
                    <Form className="d-flex">
                        {props.signedIn ? logout3 : null}
                    </Form>
                </Navbar>
            </div>
        </>
    )
}
