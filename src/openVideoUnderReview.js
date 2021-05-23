import React, { Component } from 'react';
import axios from 'axios';
import ReactPlayer from 'react-player';
import GiveWarning from './giveWarning.js';
import './css/openVideoUnderReview.css';
import ConfirmDelete from './confirmDelete.js';
class OpenVideoUnderReview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            warning: 'no',
            confirm: 'no',
            confirmBlock: 'no',
            topic: 'this lecture'
        };
        this.warning=this.warning.bind(this);
        this.removeVideo=this.removeVideo.bind(this);
        this.blockAccount=this.blockAccount.bind(this);
        this.goToDelete=this.goToDelete.bind(this);
        this.goToBlock=this.goToBlock.bind(this);
        this.noDelete=this.noDelete.bind(this);
    }
    warning=(event) => {
        event.preventDefault();
        this.setState({warning: 'yes'});
    }
    backFromWarning=() => {
        this.setState({warning: 'no'});
    }
    goToDelete(){
        this.setState({confirm: 'yes'});
    }
    goToBlock(){
        this.setState({confirmBlock: 'yes'});
    }
    noDelete(){
        this.setState({confirm: 'no', confirmBlock: 'no'});
    }
    removeVideo(){
        const fd = new FormData();
        this.setState({confirm: 'no'});
        let note='NOTICE'
        let notice=`Your lecture on topic "${this.props.topic}" is removed from VTM by Admin because you have not obeyed VTM rules in this lecture`;
        fd.append('video_id', this.props.video_id);
        fd.append('tutor_id', this.props.tutor_id);
        fd.append('notice', notice);
        fd.append('note', note);
        var headers = {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*"
        }
        axios.post('http://localhost/fyp-backend/signup/removeVideo.php', fd, headers
        ).then(res => {
            alert(res.data.data);
            this.props.closeData();
        }
        );
    }
    blockAccount(){
        const fd = new FormData();
        this.setState({confirmBlock: 'no'});
        fd.append('tutor_id', this.props.tutor_id);
        fd.append('video_id', this.props.video_id);
        var headers = {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*"
        }
        axios.post('http://localhost/fyp-backend/signup/blockTutorAccount.php', fd, headers
        ).then(res => {
            alert(`Account of '${this.props.tutor_name}' is successfully Blocked`);
        }
        );
    }
    render() {
        return (
            <div className="OpenVideoUnderReview-class">
                <h2>Video Under Review</h2>
                <div className="divs">
                    <div className="left-div">
                        <h3>Topic:    <spam className="topic-name">{this.props.topic}</spam></h3>
                        <h3>Rating:    <spam className="topic-name">{this.props.rating}</spam></h3>
                    </div>
                    <div className="right-div">
                        <div className="tutor_profile"><img src={require('./../../fyp/public/uploads/' + this.props.tutor_profile)} /></div>
                        <h4 className="tutor_name">Tutor: {this.props.tutor_name}</h4>
                    </div>
                </div>
                <div className="videos-divs">
                    <div className="contentVideo-div">
                        <ReactPlayer
                            url={[{ src: require('./../../fyp/public/ContentVideo/' + this.props.contentVideoName), type: this.props.contentVideoType }]} // video location
                            controls  // gives the front end video controls 
                            width='170px'
                            height='100px'
                            config={{
                                file: {
                                    attributes: {
                                        controlsList: 'nodownload'  //<- this is the important bit
                                    }
                                }
                            }}
                            onMouseDown={this.handleMouseDown}

                            onEnded={() => this.onEnded()}
                        />
                        <h4>Content Video</h4>
                    </div>
                    <div className="des-div">
                        <h4>Lecture Description</h4>
                        <p>"{this.props.description}"</p>
                    </div>
                    <div className="lecVideo-div">
                    <ReactPlayer
                            url={[{ src: require('./../../fyp/public/VideoLectures/' + this.props.videoName), type: this.props.videoType }]} // video location
                            controls  // gives the front end video controls 
                            width='170px'
                            height='100px'
                            config={{
                                file: {
                                    attributes: {
                                        controlsList: 'nodownload'  //<- this is the important bit
                                    }
                                }
                            }}
                            onMouseDown={this.handleMouseDown}

                            onEnded={() => this.onEnded()}
                        />
                        <h4>Lecture Video</h4>
                    </div>
                </div>
                <div className="options-div">
                    <button className="warn-btn" onClick={this.warning}>Give Warning</button>
                    <button className="warn-btn remove-videoBtn" onClick={this.goToDelete}>Remove Video</button>
                    <button className="warn-btn remove-videoBtn" onClick={this.goToBlock}>Block Account</button>
                    <button className="backBtn" onClick={this.props.closeData}>Back</button>
                </div>
                {this.state.warning === 'yes' ? <GiveWarning video_id={this.props.video_id} tutor_id={this.props.tutor_id} back={this.backFromWarning}/>: ''}
                {this.state.confirm === 'yes' ? <ConfirmDelete delete={this.removeVideo} item={this.state.topic} noDelete={this.noDelete} compName='editSubjects' info='remove'/>: ''}
                {this.state.confirmBlock === 'yes' ? <ConfirmDelete delete={this.blockAccount} item={this.props.tutor_name} noDelete={this.noDelete} compName='editSubjects' info='block'/>: ''}
            </div>
        );
    }
}
export default OpenVideoUnderReview;