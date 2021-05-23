import React, { Component } from 'react';
import axios from 'axios';
import Header from './header.js';
import Footer from './footer.js';
import AdminYourAccount from './adminYourAccount.js';
import EditSubject from './editSubject.js';
import EditLevel from './editLevel.js';
import AddAdmin from './addAdmin.js';
import VtmFamily from './vtmFamily.js';
import AllAdmins from './allAdmins.js';
import AccountsUnderReview from './accountsUnderReview.js';
import './css/adminHome.css';
import UnblockAccounts from './unblockAccounts.js';
class AdminHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            admin_id: parseInt(this.props.location.state.admin_id, 10),
            yourAccount:'no',
            editSubject: 'no',
            editLevel: 'no',
            addAdmin: 'no',
            allAdmins: 'no',
            accountsUnderReview: 'no',
            vtmFamily: 'yes',
            blockedAccounts: 'no',
            profile: '',
            username: ''
        }
        this.handleYourAccount=this.handleYourAccount.bind(this);
        this.handleEditSubject=this.handleEditSubject.bind(this);
        this.handleEditLevel=this.handleEditLevel.bind(this);
        this.handleAddAdmin=this.handleAddAdmin.bind(this);
        this.handleVtmFamily=this.handleVtmFamily.bind(this);
        this.handleBlockedAccounts=this.handleBlockedAccounts.bind(this);
        this.handleAllAdmins=this.handleAllAdmins.bind(this);
        this.handleAccountsUnderReview=this.handleAccountsUnderReview.bind(this);
        this.fetchInfor=this.fetchInfor.bind(this);
        this.fetchInfor();
    }
    handleYourAccount = (event) => {
        event.preventDefault();
        this.setState({ yourAccount: 'yes', editSubject: 'no', editLevel: 'no', addAdmin: 'no', allAdmins: 'no', accountsUnderReview: 'no', vtmFamily: 'no', blockedAccounts: 'no' });
    }
    handleEditSubject = (event) => {
        event.preventDefault();
        this.setState({ editSubject: 'yes', yourAccount: 'no', editLevel: 'no', addAdmin: 'no', allAdmins: 'no', accountsUnderReview: 'no', vtmFamily: 'no', blockedAccounts: 'no'});
    }
    handleEditLevel = (event) => {
        event.preventDefault();
        this.setState({ editLevel: 'yes', yourAccount: 'no',editSubject: 'no', addAdmin: 'no', allAdmins: 'no', accountsUnderReview: 'no', vtmFamily: 'no', blockedAccounts: 'no'});
    }
    handleAddAdmin = (event) => {
        event.preventDefault();
        this.setState({ editLevel: 'no', yourAccount: 'no',editSubject: 'no', addAdmin: 'yes', allAdmins: 'no', accountsUnderReview: 'no', vtmFamily: 'no', blockedAccounts: 'no'});
    }
    handleAllAdmins = (event) => {
        event.preventDefault();
        this.setState({ editLevel: 'no', yourAccount: 'no',editSubject: 'no', addAdmin: 'no', allAdmins: 'yes', accountsUnderReview: 'no', vtmFamily: 'no', blockedAccounts: 'no'});
    }
    handleAccountsUnderReview = (event) => {
        event.preventDefault();
        this.setState({ editLevel: 'no', yourAccount: 'no',editSubject: 'no', addAdmin: 'no', allAdmins: 'no', accountsUnderReview: 'yes', vtmFamily: 'no', blockedAccounts: 'no'});
    }
    handleVtmFamily = (event) => {
        event.preventDefault();
        this.setState({ editLevel: 'no', yourAccount: 'no',editSubject: 'no', addAdmin: 'no', allAdmins: 'no', accountsUnderReview: 'no', vtmFamily: 'yes', blockedAccounts: 'no'});
    }
    handleBlockedAccounts = (event) => {
        event.preventDefault();
        this.setState({ editLevel: 'no', yourAccount: 'no',editSubject: 'no', addAdmin: 'no', allAdmins: 'no', accountsUnderReview: 'no', vtmFamily: 'no', blockedAccounts: 'yes'});
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
                this.setState({ profile: res.data.profile });
                this.setState({ username: res.data.username });

            }

        }
        );
    }
    render() {
        const username = this.props.location.state.username;
        const admin_id = this.props.location.state.admin_id;
        const profile = this.props.location.state.profile;
        return (
            <div>
                {console.log(profile)}
                <Header username={this.state.username} desig="Admin" profile={this.state.profile} />
                <div className="adminHome-class">
                    <div className="side-bar">
                        <table className="customers">

                            <tr>
                                <th className="customers-heading-left">Sr.No</th>
                                <th className="customers-heading-right">Options</th>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td onClick={this.handleVtmFamily}>VTM Family</td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td onClick={this.handleEditSubject}>Edit Subjects</td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td onClick={this.handleEditLevel}>Edit Levels</td>
                            </tr>
                            <tr>
                                <td>4</td>
                                <td onClick={this.handleAccountsUnderReview}>Lectures under review</td>
                            </tr>
                            <tr>
                                <td>5</td>
                                <td onClick={this.handleBlockedAccounts}>Blocked Accounts</td>
                            </tr>
                            <tr>
                                <td>6</td>
                                <td onClick={this.handleAllAdmins}>All Admins</td>
                            </tr>
                            <tr>
                                <td>7</td>
                                <td onClick={this.handleAddAdmin}>Add New Admin</td>
                            </tr>
                            <tr>
                                <td>8</td>
                                <td onClick={this.handleYourAccount}>Your Account</td>
                            </tr>
                            

                        </table>
                    </div>
                    <div className="explaination">
                    {this.state.yourAccount === 'yes' ? <AdminYourAccount admin_id={admin_id} fetchInfor={this.fetchInfor}/> : ''}
                    {this.state.editSubject === 'yes' ? <EditSubject admin_id={admin_id}/> : ''}
                    {this.state.editLevel === 'yes' ? <EditLevel admin_id={admin_id}/> : ''}
                    {this.state.addAdmin === 'yes' ? <AddAdmin admin_id={admin_id}/> : ''}
                    {this.state.allAdmins === 'yes' ? <AllAdmins admin_id={admin_id}/> : ''}
                    {this.state.accountsUnderReview === 'yes' ? <AccountsUnderReview admin_id={admin_id}/> : ''}
                    {this.state.vtmFamily === 'yes' ? <VtmFamily admin_id={admin_id}/> : ''}
                    {this.state.blockedAccounts === 'yes' ? <UnblockAccounts admin_id={admin_id}/> : ''}
                    </div>
                </div>
                
                <Footer />
            </div>
        );
    }
}
export default AdminHome;