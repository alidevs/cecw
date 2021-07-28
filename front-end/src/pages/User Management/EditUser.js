import React, { Component } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

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
			toast.success(`تم تعديل مستخدم بإسم '${response.data.name}'`)
			this.props.reloadData()
		})
		.catch((error) => {
			toast.error('فشل تعديل المستخدم')
			console.error(error)
		})
	}

	areFieldsFilled() {
		const { name, email, role } = this.state
		return name.length > 0 && email.length > 0 && role.length > 0
	}

	render() {
		return (
			<div className="returnItem">
				<div className="title">تعديل مستخدم</div>
				<div className="content">
					<form onSubmit={this.handleSubmit}>
						<div className="user-details">
							<div className="input-box">
								<label htmlFor="sort"><span className="details">المستخدم</span></label>

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
								<span className="details">الاسم</span>
								<input 
								type="name"
								name="name"
								value={this.state.name}
								onChange={this.handleFieldsChange}
								placeholder="ادخل الاسم الجديد"
								required
								/>
							</div>
							<div className="input-box">
								<span className="details">البريد الالكتروني</span>
								<input 
								type="email"
								name="email"
								value={this.state.email}
								onChange={this.handleFieldsChange}
								placeholder="ادخل البريد الالكتروني الجديد"
								required
								/>
							</div>
							<div className="input-box">
								<label htmlFor="sort"><span className="details">الوظيفة</span></label>

								<select 
								className="input-box" 
								name="role" 
								value={this.state.role}
								onChange={this.handleFieldsChange} 
								id="Position"
								required
								>
									<option value="Manager">مدير</option>
									<option value="Vice Manager">نائب مدير</option>
									<option value="Employee">موظف</option>
								</select>
							</div>
							<div className="input-box">
								<span className="details">كلمة السر</span>
								<input 
								type="password" 
								name="password"
								onChange={this.handleFieldsChange}
								placeholder="ادخل كلمة السر الجديدة" 
								/>
							</div>

						</div>
						<div className="button">
							<input
							type="submit"
							value="تحديث"
							disabled={!this.areFieldsFilled()}
							/>
						</div>
					</form>
				</div>
			</div>
		)
	}
}
