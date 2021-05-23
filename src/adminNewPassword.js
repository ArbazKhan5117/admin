import React,{Component} from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import './css/login.css';
class AdminNewPassword extends Component{
    constructor(props){
        super(props);
        this.state={
            name: '',
            id: '',
            contact: '',
            password: '',
            confirm: '',
            valid: '',
            message: ''
        }
        this.passwordHandler = this.passwordHandler.bind(this);
        this.confirmHandler = this.confirmHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
    }
    passwordHandler = (event) => {
        event.preventDefault();
        this.setState({ password: event.target.value });
    }
    
    confirmHandler = (event) => {
        event.preventDefault();
        this.setState({ confirm: event.target.value });

    }
    submitHandler=(event) => {
        event.preventDefault();
        let paswd=  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
        if(this.state.confirm !== this.state.password){
            alert('Please confirm your Password carefully');
        }
        else if(this.state.password.match(paswd)){
        const fd = new FormData();
        fd.append('name', this.props.name);
        fd.append('id', this.props.id);
        fd.append('contact', this.props.contact);
        fd.append('password', this.state.password);
        var headers = {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*"
        }
        axios.post('http://localhost/fyp-backend/signup/adminnewpassword.php', fd, headers
        ).then(res => {
            console.log(res.data.data);
            console.log(res.data.valid);
            if(res.data.valid=='no'){
                alert(res.data.data);
            }else{
                this.setState({ valid: res.data.valid });
                this.setState({ message: res.data.data });
                console.log(res.data.data);
            }
            
        }
        );
    }else{
        alert('Please set a password between 7 to 15 characters which contain at least one numeric digit and a special character');
    }
    }
    render(){
        return(
            <div className="newPassword-class">
                <h3>Please Enter New Password</h3>
                <form onSubmit={this.submitHandler}>
                <input type="password" required value={this.state.password} onChange={this.passwordHandler} placeholder="Enter New Password" className="login-input"/><br/>
                <input type="password" required value={this.state.confirm} onChange={this.confirmHandler} placeholder="Confirm your Password" className="login-input"/><br/>
                <button type="submit" className="forget-btn">Update</button>
                {this.state.valid==='yes' ? <h4 className="newpass-msg">{this.state.message}</h4> : ''}
                </form>
                <h5>Go back to Login Page ?<Link to="/"><spam className="login-signup-btn">Click here</spam></Link></h5>
            </div>
        );
    }
}
export default AdminNewPassword;