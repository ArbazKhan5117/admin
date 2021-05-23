import React, { Component } from 'react';
import axios from 'axios';
import ConfirmDelete from './confirmDelete';
import './css/allAdmins.css';
class AllAdmins extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allAdmins: [],
            admin_id: this.props.admin_id,
            confirm: 'no',
            deleteAccount: '',
            delete_id: null
        };
        this.findAllAdmins = this.findAllAdmins.bind(this);
        this.goToDelete = this.goToDelete.bind(this);
        this.noDelete = this.noDelete.bind(this);
        this.deleteAccount = this.deleteAccount.bind(this);
        this.findAllAdmins();
    }
    findAllAdmins() {
        const fdup = new FormData();
        var headers = {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*"
        }
        axios.post('http://localhost/fyp-backend/signup/allAdmins.php', fdup, headers
        ).then(res => {
            //console.log(res.data);
            this.setState({ allAdmins: res.data });
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
        axios.post('http://localhost/fyp-backend/signup/deleteAdmin.php', fd, headers
        ).then(res => {
            this.setState({ delete_id: null, confirm: 'no' });
            this.findAllAdmins();
        }
        );
    }
    render() {
        return (
            <div className="allAdmins-super">
                <div className="allAdmins-class">
                    <table className="customers-allAdmins">

                        {this.state.allAdmins.map(i => {
                            return (
                                <tr>
                                    <td className="prof-img"><img src={'/profiles/' + i.profile} /></td>
                                    <td>{i.name}</td>
                                    <td>{i.id}</td>
                                    <td>{i.contact}</td>
                                    {this.state.admin_id === i.admin_id ? <td></td> : <td className="delete-btn" onClick={() => this.goToDelete(i.name, i.admin_id)}>Delete</td>}
                                </tr>
                            );
                        })}

                    </table>
                   
                </div>
                {this.state.confirm === 'yes' ? <ConfirmDelete delete={this.deleteAccount} item={this.state.deleteAccount} noDelete={this.noDelete} compName='allAdmins' info='remove' /> : ''}
            </div>
        );
    }
}
export default AllAdmins;