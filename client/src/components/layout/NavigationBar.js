import React, { Component } from "react";
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import logo from "../../assets/images/logo.png";
import "./NavigationBar.css";



class NavigationBar extends Component {

    constructor(props) {
        super(props)
        this.state = {
            category: []
        }

    }

    componentDidMount() {
        fetch("/api/story").then(res =>
            res.json()).then(data => {
                data.forEach(ele => {
                    if (this.state.category.indexOf(ele.category) === -1 && ele.category !== "Other") {
                        return this.setState({ category: [...this.state.category, ele.category] })
                    }
                })
            }
                // res.text()
            )
        // .then(text => console.log(text))
        // console.log(this.state.category)
    }



    render() {
        return (
            <div>
                <Navbar>
                    <Navbar.Brand href="/">
                        <img
                            alt=""
                            src={logo}
                            width="70"
                            height="70"
                            className="d-inline-block align-top"
                        />
                        {' RIDONK STORIES'}

                    </Navbar.Brand>
                </Navbar>

                <Navbar bg="light text-dark" expand="md">

                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <div className="menuFlex">
                            <div>
                                <Nav className="mr-auto z-index">
                                    <Nav.Link href="/">Home</Nav.Link>
                                    <Nav.Link href="/ShareStories">Share Stories</Nav.Link>
                                    <Nav.Link href="/ViewStories">View Stories</Nav.Link>
                                    <NavDropdown title="Categories" id="basic-nav-dropdown">
                                        {this.state.category.map(ele => {

                                            var link = "/ViewStories/" + ele;

                                            return <NavDropdown.Item href={link} key={ele}>{ele}</NavDropdown.Item>
                                        })}

                                        <NavDropdown.Divider />
                                        <NavDropdown.Item href="/ViewStories/Other">Other</NavDropdown.Item>
                                    </NavDropdown>
                                </Nav>

                            </div>
                            <div className="text-center">
                                <Nav className="fullWidth">
                                    <Nav.Item>
                                        <Nav.Link href="/login">Log In</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link href="/register">Sign up</Nav.Link>
                                    </Nav.Item>

                                </Nav>


                            </div>
                        </div>

                    </Navbar.Collapse>




                </Navbar>


            </div >
        );
    }
}

export default NavigationBar;
