import React, { Component } from 'react'
import axios from 'axios'

export default class Form extends Component {
	constructor(props) {
		super(props)

		this.state = {
			email: '',
			password: '',
			loginErrors: ''
		}

		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleChange = this.handleChange.bind(this)
	}

	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	handleSubmit(event) {
		const { email, password } = this.state

		console.log(`Email: ${email}\t\tPassword: ${password}`)
		
		axios.post('http://localhost:3000/users/login', { email, password })
		.then(response => {
			console.log(`Got a response! ${response.status}`)
			if (response.status === 200) {
				this.props.handleSuccessfulAuth(response.data)
				console.log('Logged in successfully!')
			} else {
				console.error(`Response status ${response.status}`)
			}
		})
		.catch(error => {
			console.error(error)
		})
		event.preventDefault()
	}

	render() {
		return (
			<form className="myform-signIn" onSubmit={this.handleSubmit}>
				<div className="e signIn">
					<input type="email"
					className="email-signIn"
					placeholder="Email Address"
	
					name="email"
					value={this.state.email}
					onChange={this.handleChange}
					/>
				</div>
	
				<div className="p signIn">
					<input  type="password" 
					className="password-signIn" 
					placeholder="Password" 
	
					name="password"
					value={this.state.password}
					onChange={this.handleChange} 
					/>
				</div>
	
				<div className="s">
					<button type="submit" 
					className="signInBtn" 
					>Sign In</button>
				</div>
			</form>
		)
	}
}