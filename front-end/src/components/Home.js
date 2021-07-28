import React, { Component } from 'react'
import Admin from './Admin'
import Employee from './Employee'
import Vice from './ViceManager'

import PuffLoader from 'react-spinners/PuffLoader'

export default class Home extends Component {
	constructor() {
		super()

		this.state = {
			user: '',
			token: '',
			loading: false
		}
	}

	componentDidMount() {
		setTimeout(() => {
			const user = localStorage.getItem('user')
			const token = localStorage.getItem('token')

			if (localStorage.length !== 0) {
				this.setState({
					isLoggedIn: 'LOGGED_IN',
					user: JSON.parse(user),
					token: token
				})
			}
		},50);
	}
	
	render() {
		if (this.state.user.role === 'Employee') {	
			return (<Employee />)
		} else if (this.state.user.role === 'Vice Manager') {
			return (<Vice />)
		} else if (this.state.user.role === 'Manager') {
			return (<Admin />)
		} else {
			return ( <PuffLoader color={"#2e3e5f"} loading={this.state.loading} size={150} /> )
		}
	}
}