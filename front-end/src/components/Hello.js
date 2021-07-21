import React, { Component } from 'react'
import Admin from './Admin'
import Employee from './Employee'
import Vice from './ViceManager'

export default class Home extends Component {
	constructor() {
		super()

		const user = localStorage.getItem('user')
		const token = localStorage.getItem('token')

		this.state = {
			isLoggedIn: 'LOGGED_IN',
			user: JSON.parse(user),
			token: token

		}
	}
	
	componentDidMount() {
		this.props.history.replace('/hello')
	}
	
	render() {
		if (this.state.user.role === 'Employee') {	
			return (<Employee />)
		} else if (this.state.user.role === 'Vice Manager') {
			return (<Vice />)
		} else if (this.state.user.role === 'Manager') {
			return (<Admin />)
		}
	}
}