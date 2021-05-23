import React, { Component } from 'react';
import axios from 'axios';
import './css/editSubject.css';
import ConfirmDelete from './confirmDelete';
class EditSubject extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subjectArr: [],
            admin_id: this.props.admin_id,
            newSubject: '',
            delete_id: null,
            confirm: 'no',
            deleteSubject: ''
        };
        this.fetchSubjects = this.fetchSubjects.bind(this);
        this.subjectHandler = this.subjectHandler.bind(this);
        this.submitNewSubject = this.submitNewSubject.bind(this);
        this.deleteSubject = this.deleteSubject.bind(this);
        this.noDelete = this.noDelete.bind(this);
        this.fetchSubjects();
    }
    subjectHandler = (event) => {
        event.preventDefault();
        this.setState({ newSubject: event.target.value });
    }
    fetchSubjects() {
        const fd = new FormData();
        fd.append('admin_id', this.state.admin_id);
        var headers = {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*"
        }
        axios.post('http://localhost/fyp-backend/signup/editSubjects.php', fd, headers
        ).then(res => {
            this.setState({ subjectArr: res.data });


        }
        );
    }
    submitNewSubject(event) {
        event.preventDefault();
        const fd = new FormData();
        console.log(this.state.newSubject);
        fd.append('newSubject', this.state.newSubject);
        var headers = {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*"
        }
        axios.post('http://localhost/fyp-backend/signup/addNewSubject.php', fd, headers
        ).then(res => {
            if(res.data.valid==='yes'){
                alert(`${this.state.newSubject} is successfully added in Subject Choice`);
                this.setState({newSubject: ''});
                this.fetchSubjects();
            }else{
                console.log(res.data);
                alert('System problem...!, Try again')
            }


        }
        );
    }
    goToDelete(id,subject){
        this.setState({delete_id: id,confirm: 'yes',deleteSubject: subject});
    }
    noDelete(){
        this.setState({delete_id: null,confirm: 'no',deleteSubject: ''});
    }
    deleteSubject(){
        const fd = new FormData();
        this.setState({confirm: 'no',deleteSubject: ''});
        fd.append('id', this.state.delete_id);
        var headers = {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*"
        }
        axios.post('http://localhost/fyp-backend/signup/deleteExistingSubject.php', fd, headers
        ).then(res => {
            this.setState({delete_id: null, confirm: 'no'});
            this.fetchSubjects();
        }
        );
    }
    render() {
        return (
            <div className="editSubject-class">
                <h2>Edit Subject Choice</h2>
                <div className="table-class">
                    <table className="customers-subject">
                        {this.state.subjectArr.map((i, key) => {
                            return(
                                <tr>
                                <td>{key+1}</td>
                                <td>{i.subject}</td>
                                <td className="delete-btn" onClick={()=>this.goToDelete(i.subject_id,i.subject)}>Delete</td>
                            </tr>

                            );

                        })}


                    </table>
                </div>
                <form onSubmit={this.submitNewSubject}>
                    <input type="text" required value={this.state.newSubject} onChange={this.subjectHandler} placeholder="Enter New Subject" className="login-input" />
                    <button type="submit" className="add-btn">Add</button>
                </form>
                {this.state.confirm==='yes' ? <ConfirmDelete delete={this.deleteSubject} item={this.state.deleteSubject} noDelete={this.noDelete} compName='editSubjects' info='remove'/> : ''}
            </div>
        );
    }
}
export default EditSubject;