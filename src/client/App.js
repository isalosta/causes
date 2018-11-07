import React, {Component, lazy, Suspense} from 'react';
import axios from 'axios';
import {Switch, Route, Redirect} from 'react-router-dom';
import './css/bootstrap.min.css';
import './component/Login-Form-Dark.css';
import {Home, SetName} from './component/react_body_home.js';
import {Login, SetUser} from './component/react_body_login.js';

const Header = lazy(() => import('./component/react_header.js'));
const Race = lazy(() => import('./component/react_body_race.js'));

export default class App extends Component {
  state = { username: null,
            userId: null,
            sessionId: null
          };

  componentDidMount() {
    axios('/web/works/userdata')
      .then(user => {
        this.setState({ username: user.data.username }); 
      })
        .catch(err => {console.log(err)});
  }

  render() {
    const user = this.state.username;
    SetName(user);
    SetUser(user);
    return (
      <div>
        <Suspense fallback= {<div>...IMPORTING...</div>}>
              {user ? <Header user_data={this.state.username}/> : <p>Loading.. please wait!</p>}
        <Switch>
            <Route exact={true} path="/" component={Home} />
            <Route path="/race" component={Race}/>
            <Route path="/login" component={Login}/>
            <Redirect to="/"/>
        </Switch>
        </Suspense>
        </div>
    );
  }
}
