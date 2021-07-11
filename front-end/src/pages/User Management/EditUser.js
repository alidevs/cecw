import React, { Component } from 'react'
import axios from 'axios'

export default class EditUser extends Component {

	constructor() {
		super()

		this.state = {
			name: '',
			email: '',
			role: '',
			password: '',
			user: {}
		}

		this.handleDropdownChange = this.handleDropdownChange.bind(this)
		this.handleFieldsChange = this.handleFieldsChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleDropdownChange(event) {
		const user = this.props.users.find((value) => value._id === event.target.value)
		this.setState({
			name: user.name,
			email: user.email,
			role: user.role,
			user
		})
	}

	handleFieldsChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	handleSubmit(event) {
		event.preventDefault()

		let user = { ...this.state }
		delete user.user

		let cleanedObject = Object.fromEntries(Object.entries(user).filter(([_, v]) => v !== ''))

		const token = localStorage.getItem('token')

		axios({
			method: 'PATCH',
			url: `http://localhost:3000/users/${this.state.user._id}`,
			headers: {
				Authorization: `Bearer ${token}`
			},
			data: cleanedObject
		})
		.then((response) => {
			console.log('Response: ', response)
			this.props.reloadData()
		})
	}

	areFieldsFilled() {
		const { name, email, role } = this.state
		return name.length > 0 && email.length > 0 && role.length > 0
	}

	render() {
		return (
			<div className="returnItem">
				<div className="title">Edit User</div>
				<div className="content">
					<form onSubmit={this.handleSubmit}>
						<div className="user-details">
							<div className="input-box">
								<label htmlFor="sort"><span className="details">User:</span></label>

								<select 
								className="input-box" 
								name="_id" 
								id="Item" 
								onChange={this.handleDropdownChange} 
								defaultValue={'-'}
								required
								>
									<option value="-" disabled>-</option>
									{this.props.users.map((user, index) => (
										<option key={index} value={user._id}>{user.name}</option>
									))}
								</select>
							</div>
							<div className="input-box">
								<span className="details">Name</span>
								<input 
								type="name"
								name="name"
								value={this.state.name}
								onChange={this.handleFieldsChange}
								placeholder="Enter the name"
								required
								/>
							</div>
							<div className="input-box">
								<span className="details">Email</span>
								<input 
								type="email"
								name="email"
								value={this.state.email}
								onChange={this.handleFieldsChange}
								placeholder="Enter the Email"
								required
								/>
							</div>
							<div className="input-box">
								<label htmlFor="sort"><span className="details"> Position:</span></label>

								<select 
								className="input-box" 
								name="role" 
								value={this.state.role}
								onChange={this.handleFieldsChange} 
								id="Position"
								required
								>
									<option value="Manager">Manager</option>
									<option value="Vice Manager">Vice Manager</option>
									<option value="Employee">Employee</option>
								</select>
							</div>
							<div className="input-box">
								<span className="details">Password</span>
								<input 
								type="password" 
								name="password"
								onChange={this.handleFieldsChange}
								placeholder="Enter the new password" 
								/>
							</div>

						</div>
						<div className="button">
							<input
							type="submit"
							value="Update"
							disabled={!this.areFieldsFilled()}
							/>
						</div>
					</form>
				</div>
			</div>
		)
	}
}
