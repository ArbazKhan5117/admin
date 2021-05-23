import React,{Component} from 'react';
import './css/footer.css';
import {Link} from "react-router-dom";
class Footer extends Component{
    render(){
        return(
            <div className='footer-class'>
                <p>copyright @ 2021 vtm Pakistan. All rights reserved</p>
                <Link to="/"><button>Logout</button></Link>
            </div>
        );
    }
}
export default Footer;