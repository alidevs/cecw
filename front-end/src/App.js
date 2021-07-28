import React, { Component } from 'react'
// eslint-disable-next-line
import { BrowserRouter, Link, Redirect, Route, Switch, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
// eslint-disable-next-line no-unused-vars
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Login from './pages/Login/Login'
import Requests from './pages/Requests/Requests'
import Employees from './pages/Employee/Employees'
import History from './pages/History/History'
import UserManagement from './pages/User Management/UserManagement'
import MyCustody from './pages/myCustody/MyCustody'
import NewReq from './pages/NewRequests/NewRequests'
import Inventory from './pages/Inventory Management/Inventory'

import Home from './components/Home'
import ProtectedRoute from './components/ProtectedRoute'
import NavBar from './components/NavBar'

class App extends Component {
	static propTypes = {
		match: PropTypes.object.isRequired,
		location: PropTypes.object.isRequired,
		history: PropTypes.object.isRequired
	}

	constructor() {
		super()

		this.state = {
			isLoggedIn: '',
			user: '',
			token: '',
		}

		this.handleLogin = this.handleLogin.bind(this)
		this.resetState = this.resetState.bind(this)
	}
	
	componentDidMount() {
		const user = localStorage.getItem('user')
		const token = localStorage.getItem('token')

		if (localStorage.length !== 0) {
			this.setState({
				isLoggedIn: 'LOGGED_IN',
				user: JSON.parse(user),
				token: token
			})
		}
	}

	handleLogin(data) {
		this.setState({
			isLoggedIn: 'LOGGED_IN',
			user: data.user,
			token: data.token
		})

		localStorage.setItem('user', JSON.stringify(data.user))
		localStorage.setItem('token', data.token)
	}

	resetState() {
		localStorage.clear()

		this.setState({
			isLoggedIn: '',
			user: '',
			token: '',
		})
	}



	render() {
		const { history } = this.props
		
		return (
			<div>
				<ToastContainer
					position="top-right"
					autoClose={3000}
					hideProgressBar={false}
					newestOnTop
					closeOnClick
					rtl
					pauseOnFocusLoss={false}
					draggable
					pauseOnHover={false}
				/>
				<BrowserRouter>
				<div className="links">
					<Link to="/login">
						Login
					</Link>&nbsp;
					<Link to="/">
						Home
					</Link>&nbsp;
					<Link to="/admin/requests">
						Requests
					</Link>&nbsp;
					<Link to="/admin/emplyees">
						Employees
					</Link>&nbsp;
					<Link to="/history">
						History
					</Link>&nbsp;
					<Link to="/admin/employees/manage">
						User Management
					</Link>&nbsp;
					<Link to="/mycustody">
						myCustody
					</Link>&nbsp;
					<Link to="/newrequest">
						new request
					</Link>
					&nbsp;
					<Link to="/inventory">
						Inventory
					</Link>
				</div>
					{this.state.isLoggedIn === 'LOGGED_IN' && <NavBar
						username={this.state.user.name}
						resetState={this.resetState}
						history={history}
					/>}
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
								history={history}
							/>
						</Route>

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
						<ProtectedRoute
							path="/History"
							loggedIn={this.state.isLoggedIn}
							component={History}
						/>
						<ProtectedRoute
							path="/admin/employees/manage"
							loggedIn={this.state.isLoggedIn}
							component={UserManagement}
						/>

						<ProtectedRoute
							path="/mycustody"
							loggedIn={this.state.isLoggedIn}
							component={MyCustody}
						/>
						<ProtectedRoute
							path="/newrequest"
							loggedIn={this.state.isLoggedIn}
							component={NewReq}
						/>
						<ProtectedRoute
							path="/inventory"
							loggedIn={this.state.isLoggedIn}
							history={history}
							component={Inventory}
						/>
					</Switch>
				</BrowserRouter>
			</div>
		)
	}
}

export default withRouter(App)