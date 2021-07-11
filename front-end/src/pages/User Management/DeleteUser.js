import React, { Component } from 'react'
import axios from 'axios'

export default class DeleteUser extends Component {

	constructor() {
		super()

		this.state = {
			user: '',
		}

		this.handleDropdownChange = this.handleDropdownChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleDropdownChange(event) {
		const user = this.props.users.find((value) => value._id === event.target.value)
		this.setState({
			user: user._id,
			selectedOption: 0
		})
	}

	handleSubmit(event) {
		event.preventDefault()

		const token = localStorage.getItem('token')

		axios({
			method: 'DELETE',
			url: `http://localhost:3000/users/${this.state.user}`,
			headers: {
				Authorization: `Bearer ${token}`
			},
		})
		.then((response) => {
			console.log('Response: ', response)
			this.props.reloadData()
		})
	}

	render() {
		return (
			<div className="returnItem">
				<div className="title">Delete User</div>
				<div className="content">
					<form action="#">
					<div className="user-details">


						<div className="input-box">
						<label htmlFor="_id"><span className="details"> Name:</span></label>

						<select 
						className="input-box" 
						name="_id"
						id="Item"
						onChange={this.handleDropdownChange}
						defaultValue={'-'}
						required
						>
							<option value="-" disabled selected={this.state.selectedOption} >-</option>
							{this.props.users.map((user, index) => (
								<option key={index} value={user._id}>{user.name}</option>
							))}
						</select>
						</div>




					</div>
					<div className="button">
						<input type="submit" value="Delete" onClick={this.handleSubmit} disabled={this.state.user.length === 0} />
					</div>
					</form>
				</div>
			</div>
		)
	}
}
