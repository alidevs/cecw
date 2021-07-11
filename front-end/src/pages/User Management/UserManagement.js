import React, { Component } from 'react'
import axios from 'axios'

import AddUser from './AddUser'
import EditUser from './EditUser'
import DeleteUser from './DeleteUser'

export default class UserManagement extends Component {
	constructor() {
		super()

		this.state = {
			users: [],
		}

		this.downloadData = this.downloadData.bind(this)
	}

	componentDidMount() {
		this.downloadData()
	}

	downloadData() {
		const token = localStorage.getItem('token')

		axios({
			method: 'GET',
			url: 'http://localhost:3000/users/list',
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
		.then((response) => {
			this.setState({
				users: response.data
			})
		})
	}

	render() {
		return (
			<div className="body">
				<link rel="stylesheet" href={`${process.env.PUBLIC_URL}/stylesheets/userManagement.css`} />
				<div className="leftSide">
					<AddUser />
				</div>

				<div className="rightSide">
					<EditUser users={this.state.users} reloadData={this.downloadData} />
					<DeleteUser users={this.state.users} reloadData={this.downloadData} />
				</div>
			</div>
		)
	}
}
