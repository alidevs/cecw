import React, { Component } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

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

		if (window.confirm('Are you sure you wish to delete this user?')) {
			const token = localStorage.getItem('token')

			axios({
				method: 'DELETE',
				url: `http://localhost:3000/users/${this.state.user}`,
				headers: {
					Authorization: `Bearer ${token}`
				},
			})
			.then((response) => {
				toast.success(`تم حذف مستخدم بإسم '${response.data.name}'`)
				this.props.reloadData()
			})
			.catch((error) => {
				toast.error('فشل حذف المستخدم')
				console.error(error)
			})
		}
	}

	render() {
		return (
			<div className="returnItem">
				<div className="title">حذف مستخدم</div>
				<div className="content">
					<form action="#">
					<div className="user-details">


						<div className="input-box">
						<label htmlFor="_id"><span className="details">الاسم:</span></label>

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
						<input type="submit" value="حذف" onClick={this.handleSubmit} disabled={this.state.user.length === 0} />
					</div>
					</form>
				</div>
			</div>
		)
	}
}
