'use strict'
import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
//import './Login-Form-Dark.css';

var user = "";
function SetUser(u){
    user = u;
}

function reload() {
    window.location.reload();
}

class Login extends React.Component{
    constructor(props){ 
        super(props);

        this.state = {
            email: '',
            password: '',
            isLogged: false,
            errorMessage: ''
        }

        this.OnEmailChange = this.OnEmailChange.bind(this);
        this.OnPasswordChange = this.OnPasswordChange.bind(this);
        this.OnFormSubmit = this.OnFormSubmit.bind(this);
    }

    componentDidMount(){
       // axios('/web/works/userdata')
      //  .then((user) => {
            if(user != 'GUEST'){
                this.setState({ isLogged: true }); 
            } else {
                this.setState({ isLogged: false }); 
            }
    //  })
      //  .catch(err => {console.log(err)});
    }

    OnEmailChange(e){
        this.setState({email: e.target.value});
    }

    OnPasswordChange(e) {
        this.setState({password: e.target.value});
    }

    OnFormSubmit(e){
        e.preventDefault();
        if(this.state.email == ''){
            return;
        }


        var data = {
            email: this.state.email,
            password: this.state.password
        }

        console.log(JSON.stringify(data));
        axios.post('/api/login', data).then((res) => { 
            console.log(res.data);
            if(res.data.message == '' || res.data.message == undefined) {
                this.setState({isLogged: res.data.isAuth});
            } else {
                this.setState({errorMessage: res.data.message});
            }
        }).catch(err => console.log(err));

    }

    render() {
        if(this.state.isLogged){
            return(<button onClick={reload}>CLICK THIS</button>);
        } else {
        return (
            <div className="login-dark">
                <form onSubmit={this.OnFormSubmit}>
                    <h2 className="sr-only">Login Form</h2>
                    <div className="illustration">
                        <i className="icon ion-ios-locked-outline"></i>
                    </div>
                    <div className="form-group">
                        <input className="form-control" type="email" name="email" placeholder="Email" value={this.state.email} onChange={this.OnEmailChange}/>
                    </div>
                    <div className="form-group">
                        <input className="form-control" type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.OnPasswordChange}/>
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary btn-block" type="submit">Log In</button>
                    </div>
                    <a href="#" className="forgot">Forgot your email or password?</a>
                    <p className="forgot">{this.state.errorMessage}</p>
                </form>
            </div>
            );
        }
    }
}

export { Login, SetUser};