import React, { Component } from 'react';
import axios from 'axios';
import ConfirmDelete from './confirmDelete';
import './css/allAdmins.css';
class UnblockAccounts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allBlockeds: [],
            admin_id: this.props.admin_id,
            confirm: 'no',
            deleteAccount: '',
            delete_id: null
        };
        this.findBlockedAccounts = this.findBlockedAccounts.bind(this);
        this.goToDelete = this.goToDelete.bind(this);
        this.noDelete = this.noDelete.bind(this);
        this.deleteAccount = this.deleteAccount.bind(this);
        this.findBlockedAccounts();
    }
    findBlockedAccounts() {
        const fdup = new FormData();
        var headers = {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*"
        }
        axios.post('http://localhost/fyp-backend/signup/UnBlockAccounts.php', fdup, headers
        ).then(res => {
            //console.log(res.data);
            this.setState({ allBlockeds: res.data });
        }
        );
    }
    goToDelete(name, admin_id) {
        this.setState({ delete_id: admin_id, confirm: 'yes', deleteAccount: name });
    }
    noDelete() {
        this.setState({ delete_id: null, confirm: 'no', deleteAccount: '' });
    }
    deleteAccount() {
        const fd = new FormData();
        this.setState({ confirm: 'no', deleteAccount: '' });
        fd.append('id', this.state.delete_id);
        var headers = {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*"
        }
        axios.post('http://localhost/fyp-backend/signup/UnblockTutorAccount.php', fd, headers
        ).then(res => {
            this.setState({ delete_id: null, confirm: 'no' });
            this.findBlockedAccounts();
        }
        );
    }
    render() {
        return (
            <div className="allAdmins-super">

            
            <div className="allAdmins-class">
                <table className="customers-allAdmins">

                    {this.state.allBlockeds.map(i => {
                        return (
                            <tr>
                                <td className="prof-img"><img src={require('./../../fyp/public/uploads/' + i.profile)} /></td>
                                <td>{i.name}</td>
                                <td>{i.email}</td>
                                <td className="delete-btn" onClick={() => this.goToDelete(i.name, i.tutor_id)}>UnBlock</td>
                            </tr>
                        );
                    })}

                </table>
                
            </div>
            {this.state.confirm === 'yes' ? <ConfirmDelete delete={this.deleteAccount} item={this.state.deleteAccount} noDelete={this.noDelete} compName='allAdmins' info='unblock' /> : ''}
            </div>
        );
    }
}
export default UnblockAccounts;