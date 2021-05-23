import React,{Component} from 'react';
import { Link, withRouter } from "react-router-dom";
import axios from 'axios';
import Header from './header.js';
import './css/login.css';
class AdminLogin extends Component{
    constructor(props){
        super(props);
        this.state={
            id: '',
            password: '',
            username: '',
            profile: '',
            admin_id: '',
            valid: ''
        };
        this.idHandler = this.idHandler.bind(this);
        this.passwordHandler = this.passwordHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
    }
    idHandler = (event) => {
        event.preventDefault();
        this.setState({ id: event.target.value });
    }
    passwordHandler = (event) => {
        event.preventDefault();
        this.setState({ password: event.target.value });
    }
    submitHandler(event) {
        event.preventDefault();
        const fd = new FormData();
        console.log('in submit')
        fd.append('id', this.state.id);
        fd.append('password', this.state.password);
        var headers = {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*"
        }
        axios.post('http://localhost/fyp-backend/signup/adminLogin.php', fd, headers
        ).then(res => {
            console.log(res.data);
            console.log(res.data.valid);
            if (res.data.valid == 'no') {
                alert(res.data.data);
            } else {
                this.setState({ username: res.data.username });
                this.setState({ profile: res.data.profile });
                this.setState({ admin_id: res.data.admin_id });
                this.setState({ valid: res.data.valid });
            }

        }
        );
    }
    
    render(){
        return(
            <div>
                <Header username="admin-header" />
                <div className="adminlogin-class">
                    <h2>Login to your account</h2>
                    <form onSubmit={this.submitHandler}>
                        <input type="text" required value={this.state.id} onChange={this.idHandler} placeholder="Enter your ID" className="login-input"/><br />
                        <input type="password" required value={this.state.password} onChange={this.passwordHandler} placeholder="Enter your Password" className="login-input"/><br />


                        <button type="submit" className="login-btn">Login</button>
                    </form>
                    <h6 className="adminForgetState">If you forget your password<Link to="/adminforgetpass"><spam className="login-signup-btn"> Click Here</spam></Link> </h6>
                    {

                        this.state.valid === 'yes' ?
                            this.props.history.push({
                                pathname: '/adminhome',
                                state: {
                                    username: this.state.username,
                                    admin_id: this.state.admin_id,
                                    profile: this.state.profile,
                                }
                            })
                            :
                            ''

                    }
                </div>
            
            </div>
        );
    }
}
export default AdminLogin;