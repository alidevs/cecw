import React, { Component } from 'react'
import axios from 'axios'

export default class AddUser extends Component {

	constructor() {
		super()

		this.state = {
			name: '',
			email: '',
			password: '',
			role: 'Employee',
		}

		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	handleSubmit(event) {
		event.preventDefault()
		
		const token = localStorage.getItem('token')

		axios({
			method: 'POST',
			url: 'http://localhost:3000/users',
			headers: {
				Authorization: `Bearer ${token}`
			},
			data: this.state
		})
		.then((response) => {
			console.table(response)
		})
	}

	render() {
		return (
			<div className="returnItem">
				<div className="title">Add User</div>
					<div className="content">
						<form onSubmit={this.handleSubmit} >
							<div className="user-details">
								<div className="input-box">
									<span className="details">Name</span>
									<input
										type="text"
										placeholder="Enter the name"
										name="name"
										value={this.state.name}
										onChange={this.handleChange}
										required />
								</div>

								<div className="input-box">
									<span className="details">Email</span>
									<input 
										type="email" 
										placeholder="Enter the Email"
										name="email"
										value={this.state.email}
										onChange={this.handleChange}
										required />
								</div>

								<div className="input-box">
									<span className="details">Password</span>
									<input 
										type="password"
										placeholder="Enter the Password"
										name="password"
										value={this.state.password}
										onChange={this.handleChange}
										required />
								</div>

								<div className="input-box">
									<label htmlFor="sort"><span className="details"> Role:</span></label>

									<select className="input-box" name="role" id="Position" value={this.state.role} onChange={this.handleChange}>
										<option value="Employee">Employee</option>
										<option value="Vice Manager">Vice Manager</option>
										<option value="Manager">Manager</option>
									</select>
								</div>
							</div>
							<div className="button">
								<input type="submit" value="Send" />
							</div>
						</form>
				</div>
			</div>
		)
	}
}
