import React from 'react';
import { Pie } from 'react-chartjs-2';
export default function Graph(props) {
const data = {
    labels: [
        'Tutors',
        'Students',
        'Admin'
    ],
    datasets: [{
        data: [props.total_tutors,props.total_students,props.total_admin],
        backgroundColor: [
            'green',
            'blue',
            'red'
        ],
        hoverBackgroundColor: [
            'lightgreen',
            '#36A2EB',
            'rgb(247, 91, 91)'
        ],
        radius: 100
    }]
};
   
    return (
        <div className="chart">
            <h3 style={{textAlign:'center'}}>Graphically VTM Community</h3>
            <Pie data={data} className="Chart-class"/>
        </div>
    );
}