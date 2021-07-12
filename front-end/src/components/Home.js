import React, { Component } from 'react'
import axios from 'axios'
import Admin from './Admin'
import Employee from './Employee'
import Vice from './ViceManager'
import { Redirect } from 'react-router'

export default class Home extends Component {
	constructor() {
		super()

		this.state = {
			requests: [],
			errors: '',
			user: '',
			token: '',

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
		if (this.state.errors !== '') {
			return <div>{this.state.errors}</div>
		}
		
		
		if(this.state.user.role === 'Employee'){	
		return (
			<Employee />
		)
		}
		else if(this.state.user.role === 'Vice Manager') {
			return(
				<Vice />
			)
		}else if(this.state.user.role === 'Manager'){
			return(
				<Admin />
			)
		}
		else{
			return(
				<h1>You are unauthorized to make this action</h1>

			)
		}
	}
}