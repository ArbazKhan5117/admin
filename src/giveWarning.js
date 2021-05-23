import React,{Component} from 'react';
import axios from 'axios';
import './css/openVideoUnderReview.css';
class GiveWarning extends Component{
    constructor(props){
        super(props);
        this.state={
            warnDescrip: ''
        };
        this.sendWarning=this.sendWarning.bind(this);
        this.handleWarning=this.handleWarning.bind(this);
    }
    handleWarning = (event) => {
        event.preventDefault();
        this.setState({ warnDescrip: event.target.value });
    }
    sendWarning = (event) => {
        event.preventDefault();
        const fd = new FormData();
        let note= 'WARNING';
        fd.append('video_id', this.props.video_id);
        fd.append('tutor_id', this.props.tutor_id);
        fd.append('notice', this.state.warnDescrip);
        fd.append('note', note);
        var headers = {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*"
        }
        axios.post('http://localhost/fyp-backend/signup/giveWarning.php', fd, headers
        ).then(res => {
            alert(res.data.data);
            this.props.back();
        }
        );
    }
    render(){
        return(
            <div className="giveWarnig-class">
                <form onSubmit={this.sendWarning}>
                    <textarea onChange={this.handleWarning} value={this.state.warnDescrip} className="warning-class" placeholder="Write description of warning..."></textarea><br />
                    <input type='submit' value="Send" className="submit-btn"/>
                </form>
            </div>
        );
    }
}
export default GiveWarning;