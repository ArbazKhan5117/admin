import React, { Component } from 'react';
import axios from 'axios';
import './css/adminYourAccount.css';
class AddAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            valid: 'yes',
            admin_id: this.props.admin_id,
            basePassword: '',
            baseConfirmPass: '',
            baseID: '',
            baseProfile: 'addImage.png',
            baseName: '',
            upload: 'yes',
            name: '',
            newname: '',
            profile: null,
            profileName: ''

        };
        this.profileHandler = this.profileHandler.bind(this);
        this.uploadProfile = this.uploadProfile.bind(this);
        this.generateProfileName = this.generateProfileName.bind(this);
        this.submitEditHandler = this.submitEditHandler.bind(this);
        this.nameEditHandler = this.nameEditHandler.bind(this);
        this.idEditHandler = this.idEditHandler.bind(this);
        this.passwordEditHandler = this.passwordEditHandler.bind(this);
        this.confirmPassEditHandler = this.confirmPassEditHandler.bind(this);
        this.renameHandler = this.renameHandler.bind(this);
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
    idEditHandler = (event) => {
        event.preventDefault();
        this.setState({ baseID: event.target.value });
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
                console.log(this.state.baseID,this.state.baseName,this.state.baseProfile,this.state.basePassword);
                fd.append('adminId', this.state.baseID);
                fd.append('name', this.state.baseName);
                fd.append('password', this.state.basePassword);
                fd.append('profile', this.state.baseProfile);
                var headers = {
                    'Content-Type': 'application/json;charset=UTF-8',
                    "Access-Control-Allow-Origin": "*"
                }
                axios.post('http://localhost/fyp-backend/signup/addNewAdmin.php', fd, headers
                ).then(res => {
                    if (res.data.edited === 'yes') {
                        alert(res.data.data);
                        this.setState({baseName: '',basePassword: '',baseID: '',baseProfile: 'addImage.png'});

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
                        <h2>Add New Admin</h2>
                        {this.state.valid === 'yes' ?
                            <div className="present-info">
                                <div className="profile">
                                    <img src={'/profiles/' + this.state.baseProfile}></img>
                                </div>
                                <form className="edit-form" onSubmit={this.submitEditHandler}>
                                    <div className="edit-profile-img">
                                        <label className="level-label" >Add Profile:</label>
                                        <input type="file" name="profile" className="profile-input" onChange={this.profileHandler} multiple accept='image/*' />
                                        {this.state.upload === 'yes' ? '' : <button className="profile-label" onClick={this.uploadProfile}>Upload</button>}<br /></div>
                                    <table className="customers-edit-adminAccount">
                                        
                                        <tr>
                                            <td>Name:</td>
                                            <td><input type="text" value={this.state.baseName} onChange={this.nameEditHandler} placeholder="Full Name" className="login-input chng" /></td>

                                            <td>Admin-ID</td>
                                            <td><input type="text" value={this.state.baseID} onChange={this.idEditHandler} placeholder="Enter Admin-ID." className="login-input chng" /></td>
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
        export default AddAdmin;