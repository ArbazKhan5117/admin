import React,{Component} from 'react';
import './css/confirmDelete.css';
class ConfirmDelete extends Component{
    constructor(props){
        super(props);
        this.state={

        };
        this.handleYes=this.handleYes.bind(this);
        this.handleNo=this.handleNo.bind(this);
    }
    handleYes(event){
        event.preventDefault();
        this.props.delete();
    }
    handleNo(event){
        event.preventDefault();
        this.props.noDelete();
    }

    render(){
        return(
            <div className={this.props.compName === 'editSubjects' ? "confirmDelete-class" : "confirmDelete-admin"}>
                <h4>Are you sure you want to {this.props.info} "{this.props.item}"?</h4>
                <button className="login-btn-yes" onClick={this.handleYes}>Yes</button>
                <button className="login-btn-no" onClick={this.handleNo}>No</button>
            </div>
        );
    }
}
export default ConfirmDelete;
