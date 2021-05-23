import React, { Component } from 'react';
import axios from 'axios';
import Graph from './graph.js';
import './css/vtmFamily.css';
class VtmFamily extends Component {
    constructor(props) {
        super(props);
        this.state = {
            total_family: 0,
            total_tutors: 0,
            total_students: 0,
            total_admin: 0,
            stu_per: parseInt(0),
            tut_per: parseInt(0)
        };
        this.fetchFamily = this.fetchFamily.bind(this);
        this.fetchFamily();
    }
    fetchFamily() {
        const fd = new FormData();
        var headers = {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*"
        }
        axios.post('http://localhost/fyp-backend/signup/vtmFamily.php', fd, headers
        ).then(res => {
            this.setState({ total_admin: res.data.total_admin, total_students: res.data.total_students, total_tutors: res.data.total_tutors, total_family: res.data.total_users });
            let total_custom=parseInt(res.data.total_tutors)+parseInt(res.data.total_students);
            this.setState({tut_per: (parseInt(res.data.total_tutors)/parseInt(total_custom))*100});
            this.setState({stu_per: (parseInt(res.data.total_students)/parseInt(total_custom))*100});
        }
        );
    }
    render() {
        return (
            <div className='vtmFamily-class'>
                <h3>VTM Family has {this.state.total_family} members</h3>
                <div className="explaining-class">
                    <div className="member-count">
                        <table className="customers-vtmFamily">

                            <tr>
                                <td>Total Tutors</td>
                                <td>{this.state.total_tutors}</td>
                            </tr>
                            <tr>
                                <td>Total Students</td>
                                <td>{this.state.total_students}</td>
                            </tr>
                            <tr>
                                <td>Total Admins</td>
                                <td>{this.state.total_admin}</td>
                            </tr>

                        </table>

                    </div>
                    <div className="graph-class">
                        <Graph total_tutors={this.state.total_tutors} total_students={this.state.total_students} total_users={this.state.total_family} total_admin={this.state.total_admin}/>
                    </div>
                    
                </div>
                <div className="family-infoClass">
                    <h2>Alert</h2>
                    <p>We have <spam className="per-class">{parseInt(this.state.tut_per)}%</spam> users as Tutors, While <spam className="per-class">{parseInt(this.state.stu_per)}%</spam> users as Students.</p>
                    {this.state.tut_per > 30 ? <p><spam className="per-class">Note:</spam> So we have to work to increase <spam className="disig-class">Students</spam> on VTM </p> : <p><spam className="per-class">Note:</spam> So we have to work to increase <spam className="disig-class">Tutors</spam> on VTM</p>}
                    
                </div>
            </div>
        );
    }
}
export default VtmFamily;