import React, { Component } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

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
		.then((response) => toast.success(`تم اضافة مستخدم بإسم '${response.data.user.name}'`))
		.catch((error) => {
			toast.error('فشل اضافة مستخدم جديد')
			console.error(error)
		})
	}

	render() {
		return (
			<div className="returnItem">
				<div className="title">اضافة مستخدم جديد</div>
					<div className="content">
						<form onSubmit={this.handleSubmit} >
							<div className="user-details">
								<div className="input-box">
									<span className="details">الاسم</span>
									<input
										type="text"
										placeholder="ادخل اسم المستخدم"
										name="name"
										value={this.state.name}
										onChange={this.handleChange}
										required />
								</div>

								<div className="input-box">
									<span className="details">البريد الالكتروني</span>
									<input 
										type="email" 
										placeholder="ادخل البريد الالكتروني"
										name="email"
										value={this.state.email}
										onChange={this.handleChange}
										required />
								</div>

								<div className="input-box">
									<span className="details">كلمة السر</span>
									<input 
										type="password"
										placeholder="ادخل كلمة السر"
										name="password"
										value={this.state.password}
										onChange={this.handleChange}
										required />
								</div>

								<div className="input-box">
									<label htmlFor="sort"><span className="details">الوظيفة:</span></label>

									<select className="input-box" name="role" id="Position" value={this.state.role} onChange={this.handleChange}>
										<option value="Employee">موظف</option>
										<option value="Vice Manager">نائب مدير</option>
										<option value="Manager">مدير</option>
									</select>
								</div>
							</div>
							<div className="button">
								<input type="submit" value="اضافة" disabled={this.state.password.length === 0} />
							</div>
						</form>
				</div>
			</div>
		)
	}
}
