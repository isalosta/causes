import React, {Component, lazy, Suspense} from 'react';
import axios from 'axios';
import {Switch, Route, Redirect} from 'react-router-dom';
import './css/bootstrap.min.css';
import './component/Login-Form-Dark.css';
import './component/style.css';
import {Login, SetUser} from './component/react_body_login.js';

const Home = lazy(() => import('./component/react_body_home.js'));
const Header = lazy(() => import('./component/react_header.js'));
const Race = lazy(() => import('./component/react_body_race.js'));

var visible = 'none';

export default class Loader extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
      number: 0,
      LoadingClass: 'App'
		}
	}
	componentDidMount() {
		
		let interval = setInterval(() => {
			const { number } = this.state
			if (number < 100) {
				this.setState({ number: number + 1});
			} else {
        this.setState({LoadingClass: 'loaded'});
      }
		}, 50)
  }
  
	render() {
		return (
			<div className={this.state.LoadingClass}>
				<Load number={this.state.number} />
        <App />
			</div>
		)
	}
}

const Load = ({ number }) => {
  let numberString = number;
  var classname = "Loader";
  visible = 'none';
  var isVisible = 'block';

	if(number < 10) {
		numberString = '0' + number
  }
  
  if(number == 100){
    visible = 'block';
    isVisible = 'none';
  }

	return (
		<div className="Loader" style={{display: isVisible}} data-size={number}>{numberString}<sup>%</sup></div>
	)
}

class App extends Component {
  state = { username: null,
            userId: null,
            sessionId: null,
            stateLoad: false
          };
  
  componentDidMount() {
    axios('/web/works/userdata')
      .then(user => {
        console.log(user.data);
        this.setState({ username: user.data.username }); 
      })
        .catch(err => {console.log(err)});
  }

  LoadedState(s){
    this.setState({stateLoad: s});
  }

  render() {
    const user = this.state.username;
    SetUser(user);
    return (
    <div style={{display: visible}}>
        <Suspense fallback= {null}>
              {this.state.username != null ? <Header user_data={this.state.username}/> : <p>LOADING</p>}
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
