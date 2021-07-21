import React, { Component } from 'react'
import axios from 'axios'


import Request from './Request'

export default class NewRequests extends Component {
	constructor() {
		super()

		this.state = {
			items: [],
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
			url: 'http://localhost:3000/item/list',
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
		.then((response) => {
			this.setState({
				items: response.data
			})
		})
	}

	render() {
		return (
			<div className="body">
				<link rel="stylesheet" href={`${process.env.PUBLIC_URL}/stylesheets/userManagement.css`} />
				

				<div className="rightSide">
					<Request items={this.state.items} reloadData={this.downloadData} />
				</div>
			</div>
		)
	}
}
