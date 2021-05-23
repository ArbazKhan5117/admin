import React, { Component } from 'react';
import axios from 'axios';
import './css/adminYourAccount.css';
class AdminYourAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            password: '',
            valid: 'no',
            admin_id: this.props.admin_id,
            basePassword: '',
            baseConfirmPass: '',
            baseContact: '',
            baseProfile: '',
            baseName: '',
            upload: 'yes',
            name: '',
            newname: '',
            profile: null,
            profileName: ''

        };
        this.idHandler = this.idHandler.bind(this);
        this.passwordHandler = this.passwordHandler.bind(this);
        this.profileHandler = this.profileHandler.bind(this);
        this.uploadProfile = this.uploadProfile.bind(this);
        this.generateProfileName = this.generateProfileName.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
        this.submitEditHandler = this.submitEditHandler.bind(this);
        this.nameEditHandler = this.nameEditHandler.bind(this);
        this.contactEditHandler = this.contactEditHandler.bind(this);
        this.passwordEditHandler = this.passwordEditHandler.bind(this);
        this.confirmPassEditHandler = this.confirmPassEditHandler.bind(this);
        this.renameHandler = this.renameHandler.bind(this);
        this.fetchInfor = this.fetchInfor.bind(this);
        this.fetchInfor();
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
                this.setState({ valid: res.data.valid, id: '',password: '' });
                this.fetchInfor();
            }

        }
        );
    }
    renameHandler() {
        const fd = new FormData();
        this.setState({newname: (parseInt(this.state.newname)+1)});
        fd.append('name', this.state.profileName);
        fd.append('newname', this.state.newname);
        var headers = {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*"
        }
        axios.post('http://localhost/fyp-backend/signup/renameAdminProfile.php', fd, headers
        ).then(res => {
            let extension = this.state.profileName.split('.').pop();
            let upgradedName = `${this.state.newname}.${extension}`;
            this.setState({ baseProfile: upgradedName });
        }
        );
    }
    fetchInfor() {
        const fd = new FormData();
        fd.append('admin_id', this.state.admin_id);
        var headers = {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*"
        }
        axios.post('http://localhost/fyp-backend/signup/adminEditProfile.php', fd, headers
        ).then(res => {
            console.log(res.data);
            console.log(res.data.valid);
            if (res.data.valid == 'no') {
                alert(res.data.data);
            } else {
                this.setState({ basePassword: res.data.password });
                this.setState({ baseConfirmPass: res.data.password });
                this.setState({ baseContact: res.data.contact });
                this.setState({ baseProfile: res.data.profile });
                this.setState({ baseName: res.data.username });

            }

        }
        );
    }
    profileHandler = (event) => {
        event.preventDefault();
        this.setState({
            profile: event.target.files[0], profileName: event.target.files[0].name
        });
        const fd = new FormData();
        fd.append('profilename', event.target.files[0].name);
        var headers = {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*"
        }
        axios.post('http://localhost/fyp-backend/signup/checkUploadedAdminProfiles.php', fd, headers
        ).then(res => {
            if (res.data.upload === 'yes') {
                this.setState({ upload: res.data.upload });
                console.log(res.data.upload);
            }
            else {
                this.setState({ upload: res.data.upload });
                console.log(res.data.upload);
            }

        }
        );
    }

    uploadProfile = (event) => {
        event.preventDefault();
        const fd = new FormData();

        fd.append('myFile', this.state.profile, this.state.profileName);
        var headers = {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*"
        }
        axios.post('http://localhost/fyp-backend/signup/uploadAdminProfiles.php', fd, headers
        ).then(res => {
            //handle success
            if (res.data === 'The image has been uploaded') {
                alert(res.data);
                this.setState({ upload: 'yes' });
                this.generateProfileName();

            } else {
                alert('This image has large pixels, please upload normal image');
                this.setState({ upload: 'yes' });
            }

            console.log(res.data);
            //console.log(response.data.valid);

            console.log("success")
        });



    }
    generateProfileName = () => {
        const fd = new FormData();
        fd.append('name', this.state.profileName);
        var headers = {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*"
        }
        axios.post('http://localhost/fyp-backend/signup/giveNewNameToAdminProfile.php', fd, headers
        ).then(res => {

            this.setState({ newname: res.data.num });
            this.renameHandler();

        }
        );
    }
    nameEditHandler = (event) => {
        event.preventDefault();
        this.setState({ baseName: event.target.value });
    }
    contactEditHandler = (event) => {
        event.preventDefault();
        this.setState({ baseContact: event.target.value });
    }
    passwordEditHandler = (event) => {
        event.preventDefault();
        this.setState({ basePassword: event.target.value });
    }
    confirmPassEditHandler = (event) => {
        event.preventDefault();
        this.setState({ baseConfirmPass: event.target.value });
    }

    submitEditHandler(event) {
        event.preventDefault();
            let paswd = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
            if (this.state.baseConfirmPass !== this.state.basePassword) {
                alert('Please confirm your Password carefully');
            }
            else if (this.state.basePassword.match(paswd)) {
                const fd = new FormData();
                fd.append('contact', this.state.baseContact);
                fd.append('name', this.state.baseName);
                fd.append('password', this.state.basePassword);
                fd.append('profile', this.state.baseProfile);
                fd.append('admin_id', this.state.admin_id);
                var headers = {
                    'Content-Type': 'application/json;charset=UTF-8',
                    "Access-Control-Allow-Origin": "*"
                }
                axios.post('http://localhost/fyp-backend/signup/editAdminProfile.php', fd, headers
                ).then(res => {
                    if (res.data.edited === 'yes') {
                        alert(res.data.data);
                        this.setState({valid: res.data.valid});
                        this.props.fetchInfor();

                    } else {
                        alert(res.data.data);
                    }

                }
                );

            }else {
                alert('Please set a password between 7 to 15 characters which contain at least one numeric digit and a special character');
            }
        }
            render() {
                return (
                    <div className="adminYourAccount">
                        <h2>Your Personal Information</h2>
                        {this.state.valid === 'no' ?
                            <form onSubmit={this.submitHandler} className="login-form">
                                <input type="text" required value={this.state.id} onChange={this.idHandler} placeholder="Enter your ID" className="login-input" /><br />
                                <input type="password" required value={this.state.password} onChange={this.passwordHandler} placeholder="Enter your Password" className="login-input" /><br />
                                <button type="submit" className="login-btn">Submit</button>
                            </form> : ''}

                        {this.state.valid === 'yes' ?
                            <div className="present-info">
                                <div className="profile">
                                    <img src={'/profiles/' + this.state.baseProfile}></img>
                                </div>
                                <form className="edit-form" onSubmit={this.submitEditHandler}>
                                    <div className="edit-profile-img">
                                        <label className="level-label" >Edit Profile:</label>
                                        <input type="file" name="profile" className="profile-input" onChange={this.profileHandler} multiple accept='image/*' />
                                        {this.state.upload === 'yes' ? '' : <button className="profile-label" onClick={this.uploadProfile}>Upload</button>}<br /></div>
                                    <table className="customers-edit-adminAccount">

                                        <tr>
                                            <td>Name:</td>
                                            <td><input type="text" value={this.state.baseName} onChange={this.nameEditHandler} placeholder="Full Name" className="login-input chng" /></td>

                                            <td>Contact</td>
                                            <td><input type="number" value={this.state.baseContact} onChange={this.contactEditHandler} placeholder="Enter your contact No." className="login-input chng" /></td>
                                        </tr>

                                        <tr>
                                            <td>Password</td>
                                            <td><input type="password" value={this.state.basePassword} onChange={this.passwordEditHandler} placeholder="Set your Password" className="login-input chng" /></td>

                                            <td>Confirm</td>
                                            <td><input type="password" value={this.state.baseConfirmPass} onChange={this.confirmPassEditHandler} placeholder="Confirm your Password" className="login-input chng" /></td>
                                        </tr>
                                    </table>
                                    <input type="submit" value="Submit" className="submit-btn submit-edit" />
                                </form>


                            </div>
                            : ''
                        }

                    </div>
                );
            }

        }
        export default AdminYourAccount;