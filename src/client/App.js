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
const Foot = lazy(() => import('./component/react_footer.js'));

var visible = 'none';

export default class Loader extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
      number: 0,
      LoadingClass: 'App',
      username: ''
		}
	}
	componentDidMount() {
		let interval = setInterval(() => {
			const { number } = this.state
			if (number < 100) {
        if(number == 20){
          var ctr = number;
          if(ctr == number){
            ctr += 1;
            axios('/web/works/userdata')
            .then(user => {
            this.setState({ username: user.data.username });
            this.setState({ number: number + 1});
            }).catch(err => {console.log(err); this.setState({number: -100})});
          }
        } else {
          this.setState({ number: number + 1});
        }
			} else {
        this.setState({LoadingClass: 'loaded'});
      }
		}, 50)
  }
  
	render() {
		return (
			<div className={this.state.LoadingClass}>
				<Load number={this.state.number} />
        <App username={this.state.username}/>
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
  render() {
    SetUser(this.props.username);
    return (
    <div style={{display: visible}}>
        <Suspense fallback= {null}>
              {this.props.username != undefined ? <Header user_data={this.props.username}/> : null}
        <Switch>
            <Route exact={true} path="/" component={Home} />
            <Route path="/race" component={Race}/>
            <Route path="/login" component={Login}/>
            <Redirect to="/"/>
        </Switch>
            <Foot />
        </Suspense>
      </div>
    );
  }
}
