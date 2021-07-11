import React, { Component } from 'react'
import axios from 'axios'
import Admin from './Admin'
import Employee from './Employee'

export default class Home extends Component {
	constructor() {
		super()

		this.state = {
			requests: [],
			errors: ''
		}

	}

	componentDidMount() {
		const token = localStorage.getItem('token')
		axios.get('http://localhost:3000/users/me', {
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
		.then((response) => {
			switch (response.status) {
				case 200:
					this.setState({
						requests: response.data
					})
					break
				
				case 401:
					this.setState({
						errors: 'You are unauthorized to make this action'
					})
					break
			
				default:
					console.log(`Response status`, response.status)
					break
			}
		})
		.catch((error) => {
			console.error(`Error: A problem has occured while fetching requests list`, error)
		})
	}
	render() {
		if (this.state.errors !== '') {
			return <div>{this.state.errors}</div>
		}
		if(this.state.requests.role === 'Employee'){
			
		return (
			<Employee />
		)
		}
		else {
			return(
				<Admin />
			)
		}
	}
}