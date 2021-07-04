import React, { Component } from 'react'
// eslint-disable-next-line
import { BrowserRouter, Link, Redirect, Route, Switch, withRouter } from 'react-router-dom'

import Login from './pages/Login/Login'
import Requests from './pages/Requests/Requests'
import Employees from './pages/Employee/Employees'
import Home from './components/Home'
import Hello from './components/Hello'
import ProtectedRoute from './components/ProtectedRoute'

class App extends Component {
	constructor() {
		super()

		this.state = {
			isLoggedIn: '',
			user: '',
			token: ''
		}

		this.handleLogin = this.handleLogin.bind(this)
	}
	
	handleLogin(data) {
		console.log(`[App] Got back to login with data:`, data)
		this.setState({
			isLoggedIn: 'LOGGED_IN',
			user: data.user,
			token: data.token
		})

		console.log('User: ', data.user)
		localStorage.setItem('user', JSON.stringify(data.user))
		localStorage.setItem('token', data.token)
	}

	render() {
		return (
			<div>
				<BrowserRouter>
				<div className="links">
					<Link to="/hello">
						Hello
					</Link>
					<Link to="/login">
						Login
					</Link>
					<Link to="/admin/requests">
						Requests
					</Link>
					<Link to="/admin/emplyees">
						Employees
					</Link>
				</div>
					<Switch>
						<ProtectedRoute
							exact path="/"
							loggedIn={this.state.isLoggedIn}
							component={Home}
						/>

						<Route path='/login'>
							<Login
								handleLogin={this.handleLogin}
								isLoggedIn={this.state.isLoggedIn}
							/>
						</Route>

						<ProtectedRoute
							path="/hello"
							loggedIn={this.state.isLoggedIn}
							component={Hello}
						/>

						<ProtectedRoute
							path="/admin/requests"
							loggedIn={this.state.isLoggedIn}
							component={Requests}
						/>
						<ProtectedRoute
							path="/admin/emplyees"
							loggedIn={this.state.isLoggedIn}
							component={Employees}
						/>
					</Switch>
				</BrowserRouter>
			</div>
		)
	}
}

export default withRouter(App)