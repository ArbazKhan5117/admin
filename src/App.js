import React, { Component } from "react";
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AdminLogin from './adminLogin.js';
import AdminHome from './adminHome';
import AdminForgetPass from './adminForgetPass.js';
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path="/adminforgetpass" component={AdminForgetPass} />
            <Route exact path="/" component={AdminLogin} />
            <Route exact path="/adminhome" component={AdminHome} />
          </Switch>
        </BrowserRouter>

      </div>
    );
  }
}

export default App;
