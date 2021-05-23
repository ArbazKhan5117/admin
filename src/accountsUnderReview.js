import React, { Component } from 'react';
import axios from 'axios';
import OpenVideoUnderReview from './openVideoUnderReview.js';
import './css/accountsUnderReview.css';
class AccountsUnderReview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            video_info: [],
            index: null,
            openVideo: 'no'
        };
        this.fetchVideoInfo = this.fetchVideoInfo.bind(this);
        this.openData = this.openData.bind(this);
        this.closeData = this.closeData.bind(this);
        this.fetchVideoInfo();
    }
    openData = (key) => {
        this.setState({ index: key, openVideo: 'yes'});
    }
    closeData = () => {
        this.setState({index: null, openVideo: 'no'});
        this.fetchVideoInfo();
    }
    fetchVideoInfo() {
        const fd = new FormData();
        var headers = {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*"
        }
        axios.post('http://localhost/fyp-backend/signup/fetchUnderReviewVideo.php', fd, headers
        ).then(res => {
            this.setState({ video_info: res.data });
            console.log(res.data);
        }
        );
    }
    render() {
        return (
            <div className="accountsUnderReview-class">
                {this.state.openVideo === 'yes' ? <OpenVideoUnderReview 
                tutor_profile={this.state.video_info[this.state.index].tutor_profile}
                 topic={this.state.video_info[this.state.index].topic} 
                 description={this.state.video_info[this.state.index].description} 
                 tutor_id={this.state.video_info[this.state.index].tutor_id} 
                 tutor_name={this.state.video_info[this.state.index].tutor_name} 
                 rating={this.state.video_info[this.state.index].rating} 
                 video_id={this.state.video_info[this.state.index].video_id} 
                 videoName={this.state.video_info[this.state.index].videoName} 
                 contentVideoName={this.state.video_info[this.state.index].contentVideoName} 
                 contentVideoType={this.state.video_info[this.state.index].contentVideoType} 
                 videoType={this.state.video_info[this.state.index].videoType}
                 closeData={this.closeData}/> : ''}
                <table className="customers-AccountsUnderReview">
                    <tr>
                        <th className="sr-th">Sr. No</th>
                        <th className="tut-th">Tutor</th>
                        <th className="topic-th">Topic</th>
                        <th className="rate-th">Rating</th>
                        <th className="open-th">Open</th>
                    </tr>
                </table>
                <div className="accountsUnderReviewInfo-class">
                    {this.state.video_info.length ? 
                    <table className="customers-AccountsUnderReview">

                        {this.state.video_info.map((i, key) => {
                            return (
                                <tr>
                                    <td className="sr-td">{key+1}</td>
                                    <td className="tut-td">{i.tutor_name}</td>
                                    <td className="topic-td">{i.topic}</td>
                                    <td className="rate-td">{i.rating}</td>
                                    <td className="open-td"><button className="play-btn" onClick={() => this.openData(key)}>Open</button></td>
                                </tr>
                            );
                        })}
                    </table> : 
                    <h3>There is No Video Lecture under Review</h3>
                    }
                </div>
            </div>
        );
    }
}
export default AccountsUnderReview;