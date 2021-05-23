import React, { Component } from 'react';
import Header from './header';
import { Link } from "react-router-dom";
import axios from 'axios';
import AdminNewPassword from './adminNewPassword.js';
import './css/login.css';
class AdminForgetPass extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            contact: '',
            valid: ''
        }
        this.idHandler = this.idHandler.bind(this);
        this.nameHandler = this.nameHandler.bind(this);
        this.contactHandler = this.contactHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
    }

    idHandler = (event) => {
        event.preventDefault();
        this.setState({ id: event.target.value });
    }
    nameHandler = (event) => {
        event.preventDefault();
        this.setState({ name: event.target.value });
    }
    contactHandler = (event) => {
        event.preventDefault();
        this.setState({ contact: event.target.value });
    }
    submitHandler(event) {
        event.preventDefault();
        const fd = new FormData();
        fd.append('id', this.state.id);
        fd.append('name', this.state.name);
        fd.append('contact', this.state.contact);
        var headers = {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*"
        }
        axios.post('http://localhost/fyp-backend/signup/adminforgetpassword.php', fd, headers
        ).then(res => {
            console.log(res.data.data);
            console.log(res.data.valid);
            if (res.data.valid == 'no') {
                alert(res.data.data);
            } else {
                this.setState({ valid: res.data.valid });
                console.log(res.data.data);
            }

        }
        );
    }

    render() {
        return (
            <div>
                <Header username="admin-header" />
                <div className="forget-class">
                    <h3>Please Enter Personal Information</h3>
                    <form onSubmit={this.submitHandler}>
                        <input type="text" required value={this.state.id} onChange={this.idHandler} placeholder="Enter your ID" className="login-input" /><br />
                        <input type="text" required value={this.state.name} onChange={this.nameHandler} placeholder="Enter your username" className="login-input" /><br />
                        <input type="text" required value={this.state.contact} onChange={this.contactHandler} placeholder="Enter your contact No" className="login-input" /><br />
                        <button type="submit" className="forget-btn">Submit</button>
                    </form>
                    {this.state.valid === 'yes' ? <AdminNewPassword name={this.state.name} id={this.state.id} contact={this.state.contact} /> : ''}
                    <h5>Go back to Login Page ?<Link to="/"><spam className="login-signup-btn">Click here</spam></Link></h5>

                </div>
            </div>
        );
    }
}
export default AdminForgetPass;